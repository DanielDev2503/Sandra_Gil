import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
    } = body;

    // Basic payload validation
    if (
      !cliente_nombre ||
      !cliente_email ||
      !cliente_telefono ||
      !ciudad ||
      !direccion_envio ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben ser proporcionados.' },
        { status: 400 }
      );
    }

    // 1. Fetch products from database to verify prices and stock
    const productIds = items.map((i: any) => i.producto_id);
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
          { error: `El producto ${dbProduct.nombre} es elaborado bajo pedido y requiere cotización previa por WhatsApp.` },
          { status: 400 }
        );
      }

      if (dbProduct.stock < item.cantidad) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${dbProduct.nombre}. Disponibles: ${dbProduct.stock}` },
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
            { error: `La variación seleccionada para ${dbProduct.nombre} no está disponible.` },
            { status: 400 }
          );
        }
        // Variation price overrides product price when specified
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
          ciudad: `${ciudad} (${departamento || region})`,
          direccion_envio,
          notas_entrega,
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
    // Signature format: SHA-256(reference + amountInCents + currency + integritySecret)
    const reference = pedido.id;
    const currency = 'COP';

    // Read required env vars — fail explicitly if missing (no insecure fallbacks)
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;
    const wompiUrl = process.env.WOMPI_CHECKOUT_URL || 'https://checkout.wompi.co/p/';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la orden.' },
      { status: 500 }
    );
  }
}
