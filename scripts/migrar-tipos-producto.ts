import { prisma } from '../lib/db';

async function main() {
  const result = await prisma.producto.updateMany({
    where: { tipo: 'VELA' },
    data: { tipo: 'VELA_ESCULPIDA' },
  });
  console.log(`✓ Migración exitosa: ${result.count} productos actualizados a VELA_ESCULPIDA.`);
}

main()
  .catch((e) => {
    console.error('Error en la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
