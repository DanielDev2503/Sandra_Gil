import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sandragilvelas.com'),
  title: {
    default: 'Sandra Gil | Velas Decorativas y Aromáticas de Cera de Soya en Bogotá',
    template: '%s | Sandra Gil Velas',
  },
  description:
    'Tienda artesanal de velas decorativas y aromáticas 100% cera de soya natural vertidas a mano con flores botánicas en Bogotá. Envíos gratis locales y despachos a toda Colombia.',
  keywords: [
    'velas artesanales bogota',
    'velas de cera de soya bogota',
    'velas ecologicas colombia',
    'aromaterapia cera de soya',
    'velas decorativas hechas a mano',
    'velas personalizadas eventos bogota',
    'Sandra Gil',
    'velas artesanales',
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Sandra Gil | Velas Artesanales y Aromáticas en Bogotá',
    description:
      'Velas ecológicas de cera de soya vertidas a mano con flores botánicas y esencias exclusivas. Combustión limpia.',
    url: 'https://sandragilvelas.com',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/logo-sandra.png',
        width: 800,
        height: 800,
        alt: 'Sandra Gil Velas Artesanales Bogotá',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandra Gil | Velas Decorativas y Aromáticas Artesanales Bogotá',
    description:
      'Velas artesanales premium vertidas a mano con cera de soya natural, flores botánicas y aromas exclusivos en Bogotá, Colombia. Envíos locales y nacionales.',
    images: ['/logo-sandra.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://sandragilvelas.com/#organization',
      name: 'Sandra Gil Velas Artesanales',
      url: 'https://sandragilvelas.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://sandragilvelas.com/#logo',
        url: 'https://sandragilvelas.com/logo-sandra.png',
        caption: 'Sandra Gil Velas Artesanales',
      },
      image: 'https://sandragilvelas.com/logo-sandra.png',
      telephone: '+573175752029',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+573175752029',
        contactType: 'customer service',
        areaServed: 'CO',
        availableLanguage: ['Spanish'],
      },
    },
    {
      '@type': ['Store', 'LocalBusiness'],
      '@id': 'https://sandragilvelas.com/#store',
      name: 'Sandra Gil - Velas Artesanales',
      url: 'https://sandragilvelas.com',
      logo: 'https://sandragilvelas.com/logo-sandra.png',
      image: 'https://sandragilvelas.com/logo-sandra.png',
      description:
        'Taller artesanal en Bogotá especializado en velas decorativas y aromáticas vertidas a mano con 100% cera de soya natural y flores botánicas naturales.',
      telephone: '+573175752029',
      priceRange: '$$',
      currenciesAccepted: 'COP',
      paymentAccepted:
        'Wompi, Nequi, Daviplata, PSE, Tarjeta de Crédito, Tarjeta de Débito',
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
        { '@type': 'City', name: 'Zipaquirá' },
        { '@type': 'Country', name: 'Colombia' },
      ],
      parentOrganization: {
        '@id': 'https://sandragilvelas.com/#organization',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sandragilvelas.com/#website',
      url: 'https://sandragilvelas.com',
      name: 'Sandra Gil Velas Artesanales',
      inLanguage: 'es-CO',
      publisher: {
        '@id': 'https://sandragilvelas.com/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-[#FBF9F6] text-[#2C2A29] overflow-x-hidden">
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}

