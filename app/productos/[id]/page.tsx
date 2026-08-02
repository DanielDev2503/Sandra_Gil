import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ProductDetailShell from './ProductDetailShell';
import { redirect } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const product = await prisma.producto.findUnique({
    where: { id: id },
  });

  if (!product || !product.activo) {
    return {
      title: 'Producto no encontrado | Sandra Gil Velas Artesanales',
      description: 'El producto solicitado no está disponible.',
    };
  }

  const title = `${product.nombre} | Sandra Gil Velas Artesanales`;
  const rawDesc = product.descripcion || 'Vela artesanal vertida a mano con cera de soya natural y esencias exclusivas en Bogotá.';
  const description = rawDesc.length > 155 ? `${rawDesc.substring(0, 152)}...` : rawDesc;
  const imageUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : (product.url_imagen || '/logo-sandra.png');

  return {
    title,
    description,
    alternates: {
      canonical: `https://sgvelas.com/productos/${product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sgvelas.com/productos/${product.id}`,
      siteName: 'Sandra Gil Velas Artesanales',
      locale: 'es_CO',
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: product.nombre,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Query database for product with reviews
  const product = await prisma.producto.findUnique({
    where: { id: id },
    include: {
      resenas: {
        orderBy: { creado_en: 'desc' },
      },
    },
  });

  if (!product || !product.activo) {
    redirect('/');
  }

  // Fetch all active aromas from DB
  const activeProducts = await prisma.producto.findMany({
    where: { activo: true },
    select: { aroma: true },
  });
  
  const availableAromas = Array.from(
    new Set(activeProducts.map((p) => p.aroma).filter((a): a is string => Boolean(a)))
  ).sort();

  const { resenas, ...productData } = product;

  return (
    <ProductDetailShell
      product={productData}
      resenas={resenas}
      availableAromas={availableAromas}
    />
  );
}
