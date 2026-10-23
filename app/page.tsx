import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import StoreShell from '@/components/StoreShell';
import { OFFICIAL_AROMAS } from '@/lib/aromas';
import { INITIAL_FAQS } from '@/lib/faqs-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // SSR en tiempo real: consulta directa a Supabase en cada petición para reflejar cambios instantáneamente

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://sandragilvelas.com'
  ),
  title: 'Sandra Gil | Velas Decorativas y Aromáticas de Cera de Soya en Bogotá',
  description:
    'Velas aromáticas y botánicas artesanales vertidas a mano en Bogotá con 100% cera de soya natural, flores preservadas y pabilo de algodón. Envíos express locales y despachos a toda Colombia.',
  alternates: {
    canonical: 'https://sandragilvelas.com',
  },
  openGraph: {
    title: 'Sandra Gil Velas Artesanales | Cera de Soya en Bogotá',
    description:
      'Velas botánicas artesanales con flores preservadas y esencias puras. Hechas a mano en Bogotá con cera 100% de soya.',
    url: 'https://sandragilvelas.com',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
};

export default async function Home() {
  // Fetch active products with variations, official active aromas, and verified reviews
  const [products, aromasDb, resenas] = await Promise.all([
    prisma.producto.findMany({
      where: { activo: true },
      select: {
        id: true,
        slug: true,
        nombre: true,
        descripcion: true,
        tipo: true,
        aroma: true,
        material: true,
        dimensiones: true,
        precio: true,
        esBajoPedido: true,
        stock: true,
        url_imagen: true,
        imagenes: true,
        activo: true,
        variaciones: {
          where: { activo: true },
          select: {
            id: true,
            nombre: true,
            imagen: true,
            precio: true,
            activo: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { nombre: 'asc' },
    }),
    prisma.aroma.findMany({
      where: { activo: true },
      select: { nombre: true },
      orderBy: { nombre: 'asc' },
    }),
    prisma.resena.findMany({
      select: {
        id: true,
        autor: true,
        calificacion: true,
        comentario: true,
        creado_en: true,
        producto: {
          select: {
            nombre: true,
            slug: true,
          },
        },
      },
      orderBy: { creado_en: 'desc' },
      take: 6,
    }),
  ]);

  const availableAromas =
    aromasDb.length > 0 ? aromasDb.map((a: { nombre: string }) => a.nombre) : [...OFFICIAL_AROMAS];

  // Hero product: prioritize flagship candle, then in-stock non-custom candles
  const heroProduct =
    products.find((p) => p.slug === 'vela-botanica-lavanda-manzanilla') ??
    products
      .filter((p) => p.stock > 0 && !p.esBajoPedido)
      .sort((a, b) => a.stock - b.stock)[0] ??
    products.find((p) => !p.esBajoPedido) ??
    products[0] ??
    null;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://sandragilvelas.com';

  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#store`,
        name: 'Sandra Gil Velas Artesanales',
        url: siteUrl,
        logo: `${siteUrl}/logo-sandra.png`,
        image: `${siteUrl}/logo-sandra.png`,
        description:
          'Taller artesanal en Bogotá especializado en velas decorativas y aromáticas vertidas a mano con 100% cera de soya natural y flores botánicas preservadas.',
        telephone: '+573175752029',
        priceRange: '$$',
        currenciesAccepted: 'COP',
        paymentAccepted:
          'Wompi, Bancolombia, Nequi, Daviplata, PSE, Tarjetas Débito y Crédito',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogotá D.C.',
          addressRegion: 'Cundinamarca',
          addressCountry: 'CO',
        },
        areaServed: [
          { '@type': 'City', name: 'Bogotá D.C.' },
          { '@type': 'City', name: 'Chía' },
          { '@type': 'City', name: 'Cajicá' },
          { '@type': 'City', name: 'Cota' },
          { '@type': 'Country', name: 'Colombia' },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#catalogo-destacado`,
        name: 'Catálogo de Velas Artesanales Sandra Gil',
        itemListElement: products
          .filter((p) => !p.esBajoPedido && p.precio)
          .slice(0, 10)
          .map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: p.nombre,
              description: p.descripcion.replace(/<[^>]*>?/gm, '').slice(0, 180),
              image: p.imagenes?.[0] || p.url_imagen || `${siteUrl}/logo-sandra.png`,
              url: `${siteUrl}/productos/${p.slug}`,
              brand: {
                '@type': 'Brand',
                name: 'Sandra Gil Velas Artesanales',
              },
              offers: {
                '@type': 'Offer',
                price: p.precio,
                priceCurrency: 'COP',
                availability:
                  p.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
                url: `${siteUrl}/productos/${p.slug}`,
                itemCondition: 'https://schema.org/NewCondition',
                seller: {
                  '@type': 'Organization',
                  name: 'Sandra Gil Velas Artesanales',
                },
              },
            },
          })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faqs`,
        mainEntity: INITIAL_FAQS.slice(0, 8).map((faq) => ({
          '@type': 'Question',
          name: faq.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.respuesta,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <StoreShell
        products={products}
        heroProduct={heroProduct}
        availableAromas={availableAromas}
        resenas={resenas}
      />
    </>
  );
}
