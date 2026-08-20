import { prisma } from '@/lib/db';
import StoreShell from '@/components/StoreShell';

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export default async function Home() {
  // Fetch active products with their active variations
  const products = await prisma.producto.findMany({
    where: { activo: true },
    include: {
      variaciones: {
        where: { activo: true },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { nombre: 'asc' },
  });

  // Hero: product with the least stock (but still in stock), else first non-custom product, else first product
  const heroProduct =
    products
      .filter((p) => p.stock > 0 && !p.esBajoPedido)
      .sort((a, b) => a.stock - b.stock)[0] ??
    products.find((p) => !p.esBajoPedido) ??
    products[0] ??
    null;

  return <StoreShell products={products} heroProduct={heroProduct} />;
}
