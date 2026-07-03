import { prisma } from '@/lib/db';
import ProductDetailShell from './ProductDetailShell';
import { redirect } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Query database for product
  const product = await prisma.producto.findUnique({
    where: { id: id },
  });

  if (!product || !product.activo) {
    redirect('/');
  }

  return <ProductDetailShell product={product} />;
}
