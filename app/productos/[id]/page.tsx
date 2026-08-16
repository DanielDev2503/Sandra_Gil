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

  let product = null;
  let resenas: any[] = [];

  try {
    // Query database for product with reviews
    product = await prisma.producto.findUnique({
      where: { id: id },
      include: {
        resenas: {
          orderBy: { creado_en: 'desc' },
        },
        variaciones: {
          where: { activo: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (product) {
      resenas = product.resenas;
    }
  } catch (error) {
    console.error('Error querying product with reviews:', error);
    // Fallback: Query product without reviews
    try {
      product = await prisma.producto.findUnique({
        where: { id: id },
      });
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError);
    }
  }

  if (!product || !product.activo) {
    redirect('/');
  }

  // Fetch all active aromas from DB
  let availableAromas: string[] = [];
  try {
    const aromasDb = await prisma.aroma.findMany({
      where: { activo: true },
      select: { nombre: true },
    });
    availableAromas = aromasDb.map((a) => a.nombre);
  } catch (err) {
    console.error('Error fetching from Aroma model:', err);
  }

  try {
    const activeProducts = await prisma.producto.findMany({
      where: { activo: true },
      select: { aroma: true },
    });
    const productAromas = activeProducts.map((p) => p.aroma).filter((a): a is string => !!a);
    availableAromas = Array.from(new Set([...availableAromas, ...productAromas]));
  } catch (err) {
    console.error('Error fetching aromas from active products:', err);
  }

  if (product.aroma && !availableAromas.includes(product.aroma)) {
    availableAromas.push(product.aroma);
  }
  availableAromas = availableAromas.sort();

  // Fetch up to 4 other active products for the "Productos que te pueden interesar" section
  let relatedProducts: any[] = [];
  try {
    relatedProducts = await prisma.producto.findMany({
      where: {
        activo: true,
        id: { not: id },
      },
      take: 4,
    });
  } catch (relatedError) {
    console.error('Error fetching related products:', relatedError);
  }

  // Exclude resenas from product object to match expected type of ProductDetailShell
  const { resenas: _, ...productData } = product as any;

  // Extract variaciones (already included in productData via query)
  const variaciones = productData.variaciones || [];

  return (
    <ProductDetailShell
      product={productData}
      resenas={resenas}
      availableAromas={availableAromas}
      relatedProducts={relatedProducts}
      variaciones={variaciones}
    />
  );
}
