import type { Metadata } from 'next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import FAQClient from './FAQClient';
import { prisma } from '@/lib/db';
import { INITIAL_FAQS, type FAQItem } from '@/lib/faqs-data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour (ISR)

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Sandra Gil Velas Artesanales Bogotá',
  description:
    'Encuentra respuestas sobre nuestras velas de cera de soya natural, flores botánicas, tiempos y costos de envío en Bogotá, métodos de pago y cuidados esenciales.',
  alternates: {
    canonical: 'https://sandragilvelas.com/preguntas-frecuentes',
  },
  openGraph: {
    title: 'Preguntas Frecuentes | Sandra Gil Velas Artesanales Bogotá',
    description:
      'Respuestas a dudas sobre envíos en Bogotá, métodos de pago en línea, cuidado del pabilo y personalización de velas artesanales.',
    url: 'https://sandragilvelas.com/preguntas-frecuentes',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes | Sandra Gil Velas Artesanales',
    description:
      'Guía y preguntas frecuentes sobre nuestras velas de cera de soya natural, flores botánicas y envíos en Bogotá.',
  },
};

async function getFaqs(): Promise<FAQItem[]> {
  try {
    const dbFaqs = await prisma.fAQ.findMany({
      where: { activo: true },
      orderBy: [{ orden: 'asc' }, { createdAt: 'desc' }],
    });

    if (dbFaqs && dbFaqs.length > 0) {
      return dbFaqs.map((f) => ({
        id: f.id,
        pregunta: f.pregunta,
        respuesta: f.respuesta,
        categoria: f.categoria,
        orden: f.orden,
        activo: f.activo,
      }));
    }
    return INITIAL_FAQS;
  } catch (error) {
    console.error('Error fetching FAQs from database, using fallback dataset:', error);
    return INITIAL_FAQS;
  }
}

export default async function FAQPage() {
  const faqs = await getFaqs();

  // Structured Data (JSON-LD) for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb navigation */}
        <div className="bg-[#F7F3EC] border-b border-stone-200/40 py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-stone-500 font-sans"
            >
              <Link href="/" className="hover:text-brand-brown transition">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-brand-brown font-medium">Preguntas Frecuentes</span>
            </nav>
          </div>
        </div>

        {/* Client Interactive Section */}
        <FAQClient initialFaqs={faqs} />
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
