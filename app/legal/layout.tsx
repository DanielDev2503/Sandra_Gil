import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Scale } from 'lucide-react';

const LEGAL_LINKS = [
  { href: '/legal/aviso-legal', label: 'Aviso Legal' },
  { href: '/legal/politica-de-privacidad', label: 'Política de Privacidad' },
  { href: '/legal/politica-de-cookies', label: 'Política de Cookies' },
  { href: '/legal/terminos-y-condiciones', label: 'Términos y Condiciones' },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Legal header banner */}
        <div className="bg-brand-brown text-white py-10 border-b border-brand-gold/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center gap-3">
            <Scale className="w-6 h-6 text-brand-gold shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Sandra Gil Velas Artesanales</p>
              <h1 className="text-2xl font-serif font-light mt-0.5">Información Legal</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Legal sub-nav */}
          <nav className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-stone-200">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full bg-stone-100 text-stone-600 hover:bg-brand-gold hover:text-white transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Page content */}
          <div className="prose prose-stone prose-sm max-w-none">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
