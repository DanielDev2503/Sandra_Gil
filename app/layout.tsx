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
  metadataBase: new URL('https://sgvelas.com'),
  title: {
    default: "Sandra Gil | Velas Decorativas y Aromáticas Artesanales",
    template: "%s | Sandra Gil Velas",
  },
  description: "Velas artesanales premium hechas a mano con cera de soya natural, flores preservadas y aromas exclusivos en Bogotá, Colombia. Envío local rápido.",
  keywords: ["velas artesanales", "velas decorativas", "velas aromáticas", "cera de soya", "flores preservadas", "Bogotá", "Sandra Gil", "diseño de la luz"],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: "Sandra Gil | Velas Decorativas y Aromáticas Artesanales",
    description: "Velas artesanales premium hechas a mano con cera de soya natural, flores preservadas y aromas exclusivos en Bogotá, Colombia.",
    url: 'https://sgvelas.com',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/logo-sandra.png',
        width: 800,
        height: 800,
        alt: 'Sandra Gil Velas Artesanales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sandra Gil | Velas Decorativas y Aromáticas Artesanales",
    description: "Velas artesanales premium hechas a mano con cera de soya natural, flores preservadas y aromas exclusivos en Bogotá, Colombia.",
    images: ['/logo-sandra.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Sandra Gil Velas Artesanales',
  image: 'https://sgvelas.com/logo-sandra.png',
  description: 'Velas decorativas y aromáticas vertidas a mano en Bogotá con 100% cera de soya natural y flores botánicas preservadas.',
  url: 'https://sgvelas.com',
  telephone: '+573175752029',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressRegion: 'Cundinamarca',
    addressCountry: 'CO',
  },
  priceRange: '$$',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

