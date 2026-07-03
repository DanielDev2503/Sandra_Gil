import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('🔄 Wompi Webhook recibido:', JSON.stringify(payload, null, 2));

    const { event, data, timestamp, signature } = payload;

    if (event !== 'transaction.updated' || !data || !data.transaction) {
      return NextResponse.json({ message: 'Evento no procesado.' }, { status: 200 });
    }

    const transaction = data.transaction;
    const orderId = transaction.reference;

    // 1. Verify Wompi Signature
    const webhookSecret = process.env.WOMPI_WEBHOOK_SECRET;
    
    if (webhookSecret) {
      const properties = signature.properties;
      const checksum = signature.checksum;

      // Concatenate the values of the properties in the order specified
      const concatenatedValues = properties
        .map((prop: string) => {
          let resolvedPath = prop;
          // Properties starting with 'transaction.' are inside 'data.transaction.'
          if (prop.startsWith('transaction.')) {
            resolvedPath = 'data.' + prop;
          }
          return getNestedValue(payload, resolvedPath);
        })
        .join('');

      // Checksum format: SHA-255(concatenatedValues + timestamp + webhookSecret)
      const computedChecksumRaw = `${concatenatedValues}${timestamp}${webhookSecret}`;
      const computedChecksum = crypto
        .createHash('sha256')
        .update(computedChecksumRaw)
        .digest('hex');

      if (computedChecksum !== checksum) {
        console.error('❌ Error de firma: La firma recibida no coincide con la calculada.');
        return NextResponse.json({ error: 'Firma de webhook inválida.' }, { status: 401 });
      }
      console.log('✅ Firma de webhook verificada exitosamente.');
    } else {
      console.warn('⚠️ Advertencia: WOMPI_WEBHOOK_SECRET no configurada. Saltando verificación de firma.');
    }

    // 2. Fetch the corresponding order in the DB
    const pedido = await prisma.pedido.findUnique({
      where: { id: orderId },
      include: { items: { include: { producto: true } } },
    });

    if (!pedido) {
      console.error(`❌ Pedido con ID ${orderId} no encontrado.`);
      return NextResponse.json({ error: 'Pedido no encontrado.' }, { status: 404 });
    }

    // 3. Process according to Wompi transaction status
    const wompiStatus = transaction.status; // 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR'
    console.log(`📦 Estado transacción de Wompi: ${wompiStatus} para el Pedido: ${orderId}`);

    if (wompiStatus === 'APPROVED') {
      // Prevent double-processing (idempotency)
      if (pedido.estado_pago === 'pagado') {
        console.log(`ℹ️ El pedido ${orderId} ya estaba marcado como pagado.`);
        return NextResponse.json({ message: 'Pedido ya procesado.' }, { status: 200 });
      }

      // Update order and decrement stock in a transaction
      await prisma.$transaction(async (tx) => {
        // Update order status
        await tx.pedido.update({
          where: { id: orderId },
          data: {
            estado_pago: 'pagado',
            id_transaccion_wompi: transaction.id,
          },
        });

        // Decrement product stock levels
        for (const item of pedido.items) {
          const product = await tx.producto.findUnique({
            where: { id: item.producto_id },
          });

          if (!product) continue;

          const newStock = Math.max(0, product.stock - item.cantidad);
          await tx.producto.update({
            where: { id: item.producto_id },
            data: { stock: newStock },
          });
          
          console.log(`📉 Reducido stock de "${product.nombre}": ${product.stock} -> ${newStock}`);
        }
      });

      console.log(`🎉 Pedido ${orderId} pagado exitosamente. Inventario reducido.`);

      // 4. Trigger outgoing automation webhook (Make.com / Zapier)
      const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
      
      const outboundPayload = {
        evento: 'pedido_pagado',
        pedido: {
          id: pedido.id,
          cliente: {
            nombre: pedido.cliente_nombre,
            email: pedido.cliente_email,
            telefono: pedido.cliente_telefono,
          },
          envio: {
            ciudad: pedido.ciudad,
            direccion: pedido.direccion_envio,
            notas: pedido.notas_entrega,
          },
          valores: {
            productos: pedido.total_productos,
            envio: pedido.costo_envio,
            total: pedido.total_pagado,
          },
          pagos: {
            proveedor: 'wompi',
            transaccion_id: transaction.id,
            fecha_pago: new Date().toISOString(),
          },
          items: pedido.items.map((item) => ({
            id: item.producto.id,
            nombre: item.producto.nombre,
            aroma: item.producto.aroma,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario,
            subtotal: item.precio_unitario * item.cantidad,
          })),
        },
      };

      if (makeWebhookUrl) {
        try {
          console.log('🚀 Enviando payload de automatización a Make/Zapier...');
          const automationResponse = await fetch(makeWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(outboundPayload),
          });
          if (automationResponse.ok) {
            console.log('✅ Notificación a Make/Zapier enviada correctamente.');
          } else {
            console.error('❌ Error al enviar notificación a Make/Zapier:', automationResponse.statusText);
          }
        } catch (autoErr) {
          console.error('❌ Error de red al conectar con Make/Zapier:', autoErr);
        }
      } else {
        console.log('📝 Payload de automatización preparado (sin enviar, MAKE_WEBHOOK_URL no configurado):');
        console.log(JSON.stringify(outboundPayload, null, 2));
      }

    } else if (['DECLINED', 'VOIDED', 'ERROR'].includes(wompiStatus)) {
      // Update order status to failed
      await prisma.pedido.update({
        where: { id: orderId },
        data: {
          estado_pago: 'fallido',
          id_transaccion_wompi: transaction.id,
        },
      });
      console.log(`❌ Pedido ${orderId} marcado como fallido debido a estado: ${wompiStatus}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar el webhook.' },
      { status: 500 }
    );
  }
}
