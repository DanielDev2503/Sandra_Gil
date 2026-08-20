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

  // Query database for product with reviews and active variations
  const product = await prisma.producto.findUnique({
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

  if (!product || !product.activo) {
    redirect('/');
  }

  const resenas = product.resenas || [];
  const variaciones = product.variaciones || [];

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
  let relatedProducts: Array<{
    id: string;
    nombre: string;
    descripcion: string;
    precio: number | null;
    esBajoPedido: boolean;
    stock: number;
    url_imagen: string | null;
    imagenes: string[];
    activo: boolean;
    aroma: string | null;
    material: string | null;
    dimensiones: string | null;
  }> = [];
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

  // Schema.org Structured Data
  const avgRating =
    resenas.length > 0
      ? resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length
      : 5;

  const productImages =
    product.imagenes && product.imagenes.length > 0
      ? product.imagenes
      : product.url_imagen
      ? [product.url_imagen]
      : ['https://sgvelas.com/logo-sandra.png'];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcion,
    image: productImages,
    brand: {
      '@type': 'Brand',
      name: 'Sandra Gil Velas Artesanales',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'COP',
      price: product.precio ?? 0,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Sandra Gil Velas',
      },
      url: `https://sgvelas.com/productos/${product.id}`,
    },
    ...(resenas.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating.toFixed(1),
            reviewCount: resenas.length,
          },
          review: resenas.slice(0, 5).map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.autor },
            reviewRating: { '@type': 'Rating', ratingValue: r.calificacion },
            reviewBody: r.comentario,
            datePublished: new Date(r.creado_en).toISOString().split('T')[0],
          })),
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://sgvelas.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catálogo',
        item: 'https://sgvelas.com/catalogo',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.nombre,
        item: `https://sgvelas.com/productos/${product.id}`,
      },
    ],
  };

  const productProps = {
    id: product.id,
    nombre: product.nombre,
    descripcion: product.descripcion,
    aroma: product.aroma,
    material: product.material,
    dimensiones: product.dimensiones,
    precio: product.precio,
    esBajoPedido: product.esBajoPedido,
    stock: product.stock,
    url_imagen: product.url_imagen,
    imagenes: product.imagenes,
    activo: product.activo,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailShell
        product={productProps}
        resenas={resenas}
        availableAromas={availableAromas}
        relatedProducts={relatedProducts}
        variaciones={variaciones}
      />
    </>
  );
}
