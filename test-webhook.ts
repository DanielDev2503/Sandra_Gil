import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Instantiate Prisma for Supabase PostgreSQL
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL! }) });



async function runTest() {
  console.log('🧪 Iniciando prueba de verificación de webhook de Wompi...');

  // 1. Find a seed product
  const product = await prisma.producto.findFirst({
    where: { nombre: { contains: 'Lavanda' } },
  });

  if (!product) {
    console.error('❌ No se encontró ningún producto semilla de Lavanda.');
    process.exit(1);
  }

  const initialStock = product.stock;
  const quantityToBuy = 2;
  console.log(`📦 Producto seleccionado: "${product.nombre}" | Stock inicial: ${initialStock}`);

  const productPrice = product.precio ?? 45000;

  // 2. Create a pending Pedido
  const pedido = await prisma.pedido.create({
    data: {
      cliente_nombre: 'Test Webhook User',
      cliente_email: 'test_webhook@example.com',
      cliente_telefono: '3009999999',
      ciudad: 'Bogotá (Bogotá)',
      direccion_envio: 'Calle Ficticia 123',
      notas_entrega: 'Test notes',
      total_productos: productPrice * quantityToBuy,
      costo_envio: 8000,
      total_pagado: productPrice * quantityToBuy + 8000,
      estado_pago: 'pendiente',
      items: {
        create: [
          {
            producto_id: product.id,
            cantidad: quantityToBuy,
            precio_unitario: productPrice,
          },
        ],
      },
    },
  });

  console.log(`📝 Creado Pedido de Prueba: ${pedido.id} | Estado inicial: ${pedido.estado_pago}`);

  // 3. Send mock webhook request to localhost
  const webhookPayload = {
    event: 'transaction.updated',
    data: {
      transaction: {
        id: `test-tx-${Date.now()}`,
        amount_in_cents: Math.round(pedido.total_pagado * 100),
        reference: pedido.id,
        status: 'APPROVED',
      },
    },
    timestamp: Math.floor(Date.now() / 1000),
    signature: {
      properties: ['transaction.id', 'transaction.status', 'transaction.amount_in_cents'],
      checksum: 'mock-checksum',
    },
  };

  try {
    console.log('🚀 Enviando petición POST a /api/webhooks/wompi...');
    const response = await fetch('http://localhost:3000/api/webhooks/wompi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      throw new Error(`Servidor respondió con código ${response.status}: ${await response.text()}`);
    }

    console.log('✅ Servidor de Next.js procesó la petición de Webhook correctamente.');

    // Wait a brief moment for database transaction to complete
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 4. Verify Database Changes
    const updatedPedido = await prisma.pedido.findUnique({
      where: { id: pedido.id },
    });

    const updatedProduct = await prisma.producto.findUnique({
      where: { id: product.id },
    });

    if (!updatedPedido || !updatedProduct) {
      throw new Error('No se pudo volver a consultar el pedido o producto de la base de datos.');
    }

    console.log('\n🔍 --- RESULTADOS DE LA PRUEBA ---');
    console.log(`Estado del Pedido (Esperado: "pagado"): "${updatedPedido.estado_pago}"`);
    console.log(`Transacción Wompi Guardada: "${updatedPedido.id_transaccion_wompi}"`);
    console.log(`Stock del Producto (Esperado: ${initialStock - quantityToBuy}): ${updatedProduct.stock}`);

    const isOrderOk = updatedPedido.estado_pago === 'pagado';
    const isStockOk = updatedProduct.stock === initialStock - quantityToBuy;

    if (isOrderOk && isStockOk) {
      console.log('🎉 ¡PRUEBA EXITOSA! El webhook actualizó el pedido y redujo el stock de forma correcta.\n');
    } else {
      console.error('❌ ¡PRUEBA FALLIDA! Los valores de la base de datos no coinciden con los esperados.\n');
    }

    // 5. Cleanup
    await prisma.pedido.delete({ where: { id: pedido.id } });
    console.log('🧹 Limpieza completada: Pedido de prueba eliminado.');

  } catch (error) {
    console.error('❌ Error durante la ejecución del test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
