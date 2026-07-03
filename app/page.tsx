import { prisma } from '@/lib/db';
import StoreShell from '@/components/StoreShell';

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export default async function Home() {
  // Fetch active products from database
  const products = await prisma.producto.findMany({
    where: {
      activo: true,
    },
    orderBy: {
      precio: 'asc',
    },
  });

  return <StoreShell products={products} />;
}

