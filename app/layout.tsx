import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Sandra Gil | Velas Decorativas y Aromáticas Artesanales",
  description: "Velas artesanales premium hechas a mano con cera de soya natural, flores preservadas y aromas exclusivos en Bogotá, Colombia. Envío local rápido.",
  keywords: "velas artesanales, velas decorativas, velas aromáticas, cera de soya, flores preservadas, Bogotá, Sandra Gil, diseño de la luz",
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
      <body className="font-sans min-h-full flex flex-col bg-[#FBF9F6] text-[#2C2A29] overflow-x-hidden">
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

