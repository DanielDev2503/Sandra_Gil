import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ProductDetailShell from './ProductDetailShell';
import { notFound, permanentRedirect } from 'next/navigation';
import { DEFAULT_BOTANICAL_AROMAS } from '@/lib/aromas';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  let product = await prisma.producto.findUnique({
    where: { slug },
  });

  // Fallback metadata lookup if requested by legacy id
  if (!product) {
    product = await prisma.producto.findUnique({
      where: { id: slug },
    });
  }

  if (!product || !product.activo) {
    return {
      title: 'Producto no encontrado | Sandra Gil Velas Artesanales',
      description: 'El producto solicitado no está disponible.',
    };
  }

  const title = `${product.nombre} | Vela Artesanal de Cera de Soya`;
  const rawDesc = product.descripcion || 'Vela artesanal vertida a mano con cera de soya natural y esencias exclusivas en Bogotá.';
  const description = rawDesc.length > 155 ? `${rawDesc.substring(0, 152)}...` : rawDesc;
  const imageUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : (product.url_imagen || '/logo-sandra.png');
  const canonicalUrl = `https://sandragilvelas.com/productos/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.nombre} | Sandra Gil Velas`,
      description,
      url: canonicalUrl,
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

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Query database for product with reviews and active variations by slug
  const product = await prisma.producto.findUnique({
    where: { slug },
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

  // Fallback para URLs indexadas previamente con UUID (Redirección 301 SEO)
  if (!product) {
    const productoPorId = await prisma.producto.findUnique({
      where: { id: slug },
    });
    if (productoPorId?.slug) {
      permanentRedirect(`/productos/${productoPorId.slug}`);
    }
    notFound();
  }

  if (!product.activo) {
    notFound();
  }

  const resenas = product.resenas || [];
  const variaciones = product.variaciones || [];

  // Fetch all 28 active aromas from DB (Fuente única de verdad)
  let availableAromas: string[] = [];
  try {
    const aromasDb = await prisma.aroma.findMany({
      where: { activo: true },
      select: { nombre: true },
      orderBy: { nombre: 'asc' },
    });
    availableAromas = aromasDb.map((a) => a.nombre);
  } catch (err) {
    console.error('Error fetching from Aroma model:', err);
  }

  if (availableAromas.length === 0) {
    availableAromas = [...DEFAULT_BOTANICAL_AROMAS];
  }

  // Fetch up to 4 other active products for the "Productos que te pueden interesar" section
  let relatedProducts: Array<{
    id: string;
    slug: string;
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
        id: { not: product.id },
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
      : ['https://sandragilvelas.com/logo-sandra.png'];

  const baseUrl = 'https://sandragilvelas.com';
  const productCanonicalUrl = `${baseUrl}/productos/${product.slug}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcion,
    image: productImages,
    sku: product.id,
    url: productCanonicalUrl,
    brand: {
      '@type': 'Brand',
      name: 'Sandra Gil',
    },
    material: product.material || '100% Cera de Soya Natural',
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/productos/${product.slug}`,
      priceCurrency: 'COP',
      price: product.precio ?? 0,
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Sandra Gil Velas Artesanales',
      },
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
        item: 'https://sandragilvelas.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catálogo',
        item: 'https://sandragilvelas.com/catalogo',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.nombre,
        item: productCanonicalUrl,
      },
    ],
  };

  const productProps = {
    id: product.id,
    slug: product.slug,
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
