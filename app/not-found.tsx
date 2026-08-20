import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, ArrowLeft, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Página no encontrada (404) | Sandra Gil Velas Artesanales",
  description: "Lo sentimos, la página o vela que buscas no existe o ha sido movida.",
};

const WA_NUMBER = "573175752029";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-[#2C2A29]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold mx-auto border border-brand-gold/20 shadow-xs">
            <Sparkles className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold font-sans">
              Error 404
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">
              Luz No Encontrada
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-sans font-light leading-relaxed">
              La página o el producto artesanal que buscas no existe o cambió de dirección. Te invitamos a explorar nuestra colección disponible.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalogo"
              className="px-6 py-3.5 bg-brand-brown hover:bg-brand-gold text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-sm font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              Explorar Catálogo
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20estaba%20buscando%20un%20producto%20y%20no%20lo%20encontré.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white hover:bg-stone-50 border border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-sm font-sans"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Ayuda por WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
