import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import { z } from 'zod';

const CheckoutItemSchema = z.object({
  producto_id: z.string().uuid({ message: 'ID de producto inválido' }),
  cantidad: z.number().int().min(1, { message: 'La cantidad debe ser al menos 1' }),
  aroma: z.string().max(100).optional().nullable(),
  variacion_id: z.string().uuid().optional().nullable(),
  variacion_nombre: z.string().max(100).optional().nullable(),
  variacion_imagen: z.string().url().optional().nullable().or(z.string().max(500).optional().nullable()),
});

const CheckoutPayloadSchema = z.object({
  cliente_nombre: z.string().trim().min(2, { message: 'Nombre muy corto' }).max(120),
  cliente_email: z.string().trim().email({ message: 'Correo electrónico inválido' }).max(120),
  cliente_telefono: z.string().trim().regex(/^3\d{9}$/, {
    message: 'El teléfono debe ser un número celular colombiano válido (10 dígitos iniciando por 3)',
  }),
  ciudad: z.string().trim().min(2).max(100),
  departamento: z.string().trim().max(100).optional().nullable(),
  region: z.string().trim().max(100).optional().nullable(),
  direccion_envio: z.string().trim().min(5, { message: 'Dirección muy corta' }).max(250),
  notas_entrega: z.string().trim().max(500).optional().nullable(),
  costo_envio: z.number().min(0, { message: 'Costo de envío inválido' }),
  items: z.array(CheckoutItemSchema).min(1, { message: 'El carrito no puede estar vacío' }),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parseResult = CheckoutPayloadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map((e) => e.message).join(', ');
      return NextResponse.json({ error: `Validación fallida: ${errorMsg}` }, { status: 400 });
    }

    const {
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      ciudad,
      departamento,
      region,
      direccion_envio,
      notas_entrega,
      costo_envio,
      items,
    } = parseResult.data;

    // 1. Fetch products from database to verify real prices and stock
    const productIds = items.map((i) => i.producto_id);
    const dbProducts = await prisma.producto.findMany({
      where: {
        id: { in: productIds },
        activo: true,
      },
      include: {
        variaciones: {
          where: { activo: true },
        },
      },
    });

    let calculatedTotalProductos = 0;
    const orderItemsToCreate: {
      producto_id: string;
      cantidad: number;
      precio_unitario: number;
      aroma?: string;
      variacion_id?: string;
      variacion_nombre?: string;
      variacion_imagen?: string;
    }[] = [];

    for (const item of items) {
      const dbProduct = dbProducts.find((p) => p.id === item.producto_id);
      if (!dbProduct) {
        return NextResponse.json(
          { error: `El producto con ID ${item.producto_id} no está disponible.` },
          { status: 404 }
        );
      }

      if (dbProduct.esBajoPedido || dbProduct.precio === null) {
        return NextResponse.json(
          { error: `El producto "${dbProduct.nombre}" es elaborado bajo pedido y requiere cotización previa por WhatsApp.` },
          { status: 400 }
        );
      }

      if (dbProduct.stock < item.cantidad) {
        return NextResponse.json(
          { error: `Stock insuficiente para "${dbProduct.nombre}". Disponibles: ${dbProduct.stock}` },
          { status: 400 }
        );
      }

      // Resolve variation if specified
      let unitPrice = dbProduct.precio;
      let variacionDb = null;

      if (item.variacion_id) {
        variacionDb = dbProduct.variaciones.find((v) => v.id === item.variacion_id);
        if (!variacionDb) {
          return NextResponse.json(
            { error: `La variación seleccionada para "${dbProduct.nombre}" no está disponible.` },
            { status: 400 }
          );
        }
        unitPrice = variacionDb.precio ?? dbProduct.precio;
      }

      calculatedTotalProductos += unitPrice * item.cantidad;
      orderItemsToCreate.push({
        producto_id: dbProduct.id,
        cantidad: item.cantidad,
        precio_unitario: unitPrice,
        aroma: item.aroma ?? undefined,
        variacion_id: variacionDb?.id,
        variacion_nombre: variacionDb?.nombre,
        variacion_imagen: variacionDb?.imagen,
      });
    }

    const totalToPay = calculatedTotalProductos + costo_envio;
    const amountInCents = Math.round(totalToPay * 100);

    // 2. Database transaction: Create the Pedido and its ItemPedido records
    const pedido = await prisma.$transaction(async (tx) => {
      const newPedido = await tx.pedido.create({
        data: {
          cliente_nombre,
          cliente_email,
          cliente_telefono,
          ciudad: `${ciudad} (${departamento || region || 'Colombia'})`,
          direccion_envio,
          notas_entrega: notas_entrega ?? null,
          total_productos: calculatedTotalProductos,
          costo_envio,
          total_pagado: totalToPay,
          estado_pago: 'pendiente',
          items: {
            create: orderItemsToCreate,
          },
        },
      });
      return newPedido;
    });

    // 3. Generate Wompi Integrity Signature
    // Format: SHA-256(reference + amountInCents + currency + integritySecret)
    const reference = pedido.id;
    const currency = 'COP';

    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;
    const wompiUrl = process.env.WOMPI_CHECKOUT_URL || 'https://checkout.wompi.co/p/';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgvelas.com';

    if (!publicKey || !integritySecret) {
      console.error('❌ Variables de entorno de Wompi no configuradas: NEXT_PUBLIC_WOMPI_PUBLIC_KEY o WOMPI_INTEGRITY_SECRET faltantes.');
      return NextResponse.json(
        { error: 'Error de configuración del servidor de pagos.' },
        { status: 500 }
      );
    }

    const signatureRaw = `${reference}${amountInCents}${currency}${integritySecret}`;
    const signature = crypto
      .createHash('sha256')
      .update(signatureRaw)
      .digest('hex');

    const redirectUrl = `${baseUrl}/checkout/confirmation?orderId=${pedido.id}`;

    return NextResponse.json({
      success: true,
      reference,
      amountInCents,
      publicKey,
      signature,
      wompiUrl,
      redirectUrl,
    });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la orden.' },
      { status: 500 }
    );
  }
}
