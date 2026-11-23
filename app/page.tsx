import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import StoreShell from '@/components/StoreShell';
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
    'Velas aromáticas y botánicas artesanales vertidas a mano en Bogotá con 100% cera de soya natural, flores artesanales y pabilo de algodón. Envíos express locales y despachos a toda Colombia.',
  alternates: {
    canonical: 'https://sandragilvelas.com',
  },
  openGraph: {
    title: 'Sandra Gil Velas Artesanales | Cera de Soya en Bogotá',
    description:
      'Velas botánicas artesanales con flores hechas a mano y esencias puras. Hechas a mano en Bogotá con cera 100% de soya.',
    url: 'https://sandragilvelas.com',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
};

export default async function Home() {
  // Consulta optimizada a Prisma: únicamente productos activos y campos estrictamente necesarios
  const [rawProducts, resenas, rawColecciones] = await Promise.all([
    prisma.producto.findMany({
      where: { activo: true },
      select: {
        id: true,
        nombre: true,
        slug: true,
        precio: true,
        url_imagen: true,
        tipo: true,
        esBajoPedido: true,
        aroma: true,
        stock: true,
      },
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
    prisma.coleccion.findMany({
      where: { activa: true },
      orderBy: [
        { orden: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        nombre: true,
        orden: true,
        productos: {
          orderBy: { orden: 'asc' },
          where: {
            producto: { activo: true },
          },
          select: {
            producto: {
              select: {
                id: true,
                nombre: true,
                slug: true,
                precio: true,
                url_imagen: true,
                tipo: true,
                esBajoPedido: true,
                aroma: true,
                stock: true,
              },
            },
          },
        },
      },
    }),
  ]);

  const fisherYatesShuffle = <T,>(array: T[]): T[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const coleccionesCuradas = rawColecciones
    .map((c) => ({
      id: c.id,
      nombre: c.nombre,
      productos: c.productos.map((cp) => cp.producto).slice(0, 6),
    }))
    .filter((c) => c.productos.length > 0);

  // Clasificación estricta: aislar productos bajo pedido para evitar duplicidades
  const isBajoPedido = (p: { esBajoPedido?: boolean | null }) => Boolean(p.esBajoPedido);

  const productosBajoPedido = fisherYatesShuffle(rawProducts.filter(isBajoPedido)).slice(0, 6);
  const productosVelasEnvase = fisherYatesShuffle(
    rawProducts.filter((p) => !isBajoPedido(p) && p.tipo === 'VELA_ENVASE')
  ).slice(0, 6);
  const productosJabones = fisherYatesShuffle(
    rawProducts.filter(
      (p) => !isBajoPedido(p) && (p.tipo === 'JABON' || (p.nombre && p.nombre.toLowerCase().includes('jabon')))
    )
  ).slice(0, 6);
  const productosPebeteros = fisherYatesShuffle(
    rawProducts.filter((p) => !isBajoPedido(p) && p.tipo?.toLowerCase() === 'pebetero')
  ).slice(0, 6);
  const productosWaxMelts = fisherYatesShuffle(
    rawProducts.filter((p) => !isBajoPedido(p) && p.tipo?.toLowerCase() === 'waxmell')
  ).slice(0, 6);
  const productosVelasEsculpidas = fisherYatesShuffle(
    rawProducts.filter(
      (p) =>
        !isBajoPedido(p) &&
        p.tipo?.toLowerCase() !== 'pebetero' &&
        p.tipo?.toLowerCase() !== 'waxmell' &&
        (p.tipo === 'VELA_ESCULPIDA' ||
          p.tipo === 'VELA' ||
          (!p.tipo && !p.nombre.toLowerCase().includes('jabon')))
    )
  ).slice(0, 6);

  // Agrupación estricta de productos por tipo para los carruseles del Home (cap a 6 por carrusel)
  const groupedProducts = {
    VELA_ENVASE: productosVelasEnvase,
    VELA_ESCULPIDA: productosVelasEsculpidas,
    JABON: productosJabones,
    pebetero: productosPebeteros,
    waxmell: productosWaxMelts,
    BAJO_PEDIDO: productosBajoPedido,
  };

  const categoryOrder = fisherYatesShuffle([
    'VELA_ESCULPIDA',
    'VELA_ENVASE',
    'JABON',
    'pebetero',
    'waxmell',
    'BAJO_PEDIDO',
  ] as const);

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
          'Taller artesanal en Bogotá especializado en velas decorativas y aromáticas vertidas a mano con 100% cera de soya natural y flores artesanales.',
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
        itemListElement: rawProducts
          .filter((p) => p.precio)
          .slice(0, 10)
          .map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: p.nombre,
              description: `Vela artesanal ${p.nombre} vertida a mano en Bogotá con cera 100% de soya natural.`,
              image: p.url_imagen || `${siteUrl}/logo-sandra.png`,
              url: `${siteUrl}/productos/${p.slug}`,
              brand: {
                '@type': 'Brand',
                name: 'Sandra Gil Velas Artesanales',
              },
              offers: {
                '@type': 'Offer',
                price: p.precio,
                priceCurrency: 'COP',
                availability: 'https://schema.org/InStock',
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
      <StoreShell
        groupedProducts={groupedProducts}
        colecciones={coleccionesCuradas}
        categoryOrder={[...categoryOrder]}
        resenas={resenas}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </>
  );
}
