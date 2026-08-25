'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ChevronDown,
  Sparkles,
  Truck,
  Flame,
  Gift,
  MessageCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import type { FAQItem } from '@/lib/faqs-data';
import { FAQ_CATEGORIES } from '@/lib/faqs-data';

interface FAQClientProps {
  initialFaqs: FAQItem[];
}

const WA_NUMBER = '573175752029';

export default function FAQClient({ initialFaqs }: FAQClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    // Open the first question by default for great initial UX
    if (initialFaqs.length > 0) {
      return { [initialFaqs[0].id]: true };
    }
    return {};
  });

  // Toggle single accordion
  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Expand all / Collapse all helper
  const expandAll = (faqsToExpand: FAQItem[]) => {
    const next: Record<string, boolean> = {};
    faqsToExpand.forEach((f) => {
      next[f.id] = true;
    });
    setOpenIds(next);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  // Filter FAQs based on category & search term
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialFaqs.filter((faq) => {
      const matchCategory =
        selectedCategory === 'Todas' || faq.categoria === selectedCategory;
      if (!matchCategory) return false;
      if (!q) return true;

      const matchQuestion = faq.pregunta.toLowerCase().includes(q);
      const matchAnswer = faq.respuesta.toLowerCase().includes(q);
      const matchCatName = faq.categoria.toLowerCase().includes(q);

      return matchQuestion || matchAnswer || matchCatName;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todas: initialFaqs.length };
    initialFaqs.forEach((faq) => {
      counts[faq.categoria] = (counts[faq.categoria] || 0) + 1;
    });
    return counts;
  }, [initialFaqs]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
  };

  // Format answer with bold markdown syntax support (**text**)
  const renderFormattedAnswer = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-stone-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full">
      {/* ── HERO BANNER & SEARCH ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EC] via-[#FAF8F5] to-[#FAF8F5] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-stone-200/40">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-amber-200/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-xs rounded-full border border-brand-gold/30 shadow-xs mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-brand-brown uppercase tracking-widest font-sans">
              Centro de Ayuda & Guía Artesanal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Preguntas <span className="italic font-normal text-brand-gold">Frecuentes</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-stone-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans font-light">
            Encuentra respuestas inmediatas sobre nuestras velas de cera de soya, envíos en Bogotá,
            formas de pago seguras y el cuidado ideal para tu vela.
          </p>

          {/* Search Box */}
          <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-md sm:shadow-lg border border-brand-gold/25 focus-within:border-brand-gold focus-within:ring-4 focus-within:ring-brand-gold/15 transition-all duration-300">
              <div className="pl-4 sm:pl-5 text-stone-400">
                <Search className="w-5 h-5 sm:w-5 sm:h-5 text-brand-gold/80" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca por 'envíos', 'pabilo', 'cera de soya', 'pagos'..."
                className="w-full py-3.5 sm:py-4 pl-3 pr-10 sm:pr-12 text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none font-sans"
                aria-label="Buscar en preguntas frecuentes"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 sm:right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition cursor-pointer"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-stone-500 font-sans text-left pl-2">
                Mostrando resultados para: <span className="font-semibold text-brand-brown">"{searchQuery}"</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── QUICK TOPIC HIGHLIGHT CARDS ─────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Card 1 */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Envíos y Entregas');
              setSearchQuery('');
            }}
            className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 group bg-white shadow-xs hover:shadow-md cursor-pointer ${
              selectedCategory === 'Envíos y Entregas'
                ? 'border-brand-gold ring-2 ring-brand-gold/20 bg-amber-50/20'
                : 'border-stone-200/80 hover:border-brand-gold/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700 group-hover:scale-105 transition shrink-0">
                <Truck className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900">
                  Envíos en Bogotá
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5">
                  1-3 días hábiles & Express
                </p>
              </div>
            </div>
          </button>

          {/* Card 2 */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Cuidados de la Vela');
              setSearchQuery('');
            }}
            className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 group bg-white shadow-xs hover:shadow-md cursor-pointer ${
              selectedCategory === 'Cuidados de la Vela'
                ? 'border-brand-gold ring-2 ring-brand-gold/20 bg-amber-50/20'
                : 'border-stone-200/80 hover:border-brand-gold/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700 group-hover:scale-105 transition shrink-0">
                <Flame className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900">
                  Cuidado & Encendido
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5">
                  Guía de quemado y pabilo
                </p>
              </div>
            </div>
          </button>

          {/* Card 3 */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Personalizadas y Eventos');
              setSearchQuery('');
            }}
            className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 group bg-white shadow-xs hover:shadow-md cursor-pointer ${
              selectedCategory === 'Personalizadas y Eventos'
                ? 'border-brand-gold ring-2 ring-brand-gold/20 bg-amber-50/20'
                : 'border-stone-200/80 hover:border-brand-gold/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700 group-hover:scale-105 transition shrink-0">
                <Gift className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900">
                  Eventos y Regalos
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500 font-sans mt-0.5">
                  Recordatorios bajo pedido
                </p>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* ── MAIN ACCORDION & CATEGORY TABS SECTION ─────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs / Pills */}
          <div className="flex items-center justify-between gap-3 mb-6 pb-2 border-b border-stone-200/60">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 w-full sm:w-auto">
              {FAQ_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-brown text-white shadow-sm font-semibold'
                        : 'bg-white text-stone-600 border border-stone-200/80 hover:border-brand-gold/50 hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-brand-gold text-white'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Desktop (Expand/Collapse all) */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => expandAll(filteredFaqs)}
                className="text-[11px] font-medium text-stone-500 hover:text-brand-brown transition px-2 py-1 hover:bg-stone-100 rounded cursor-pointer"
              >
                Expandir todas
              </button>
              <span className="text-stone-300">·</span>
              <button
                onClick={collapseAll}
                className="text-[11px] font-medium text-stone-500 hover:text-brand-brown transition px-2 py-1 hover:bg-stone-100 rounded cursor-pointer"
              >
                Colapsar todas
              </button>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between mb-4 text-xs text-stone-500">
            <p>
              Mostrando <span className="font-semibold text-stone-800">{filteredFaqs.length}</span>{' '}
              {filteredFaqs.length === 1 ? 'pregunta' : 'preguntas'}
              {selectedCategory !== 'Todas' && (
                <span>
                  {' '}
                  en <span className="font-semibold text-brand-brown">{selectedCategory}</span>
                </span>
              )}
            </p>
            {(searchQuery || selectedCategory !== 'Todas') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-brown font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>

          {/* ── ACCORDION LIST ─────────────────────────────────────────── */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = !!openIds[faq.id];
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                      isOpen
                        ? 'border-brand-gold/40 shadow-md ring-1 ring-brand-gold/15'
                        : 'border-stone-200/80 hover:border-brand-gold/30 shadow-xs hover:shadow-xs'
                    }`}
                  >
                    {/* Header / Question Button */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                            isOpen
                              ? 'bg-brand-gold text-white shadow-xs'
                              : 'bg-stone-100 text-stone-400 group-hover:bg-brand-gold/15 group-hover:text-brand-gold'
                          }`}
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-brand-gold mb-1">
                            {faq.categoria}
                          </span>
                          <h2
                            className={`font-serif text-sm sm:text-base md:text-lg leading-snug transition-colors duration-200 ${
                              isOpen
                                ? 'text-brand-brown font-medium'
                                : 'text-stone-800 group-hover:text-brand-brown'
                            }`}
                          >
                            {faq.pregunta}
                          </h2>
                        </div>
                      </div>

                      {/* Animated Chevron */}
                      <div
                        className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 mt-1 ${
                          isOpen
                            ? 'rotate-180 bg-brand-gold/10 text-brand-gold'
                            : 'text-stone-400 group-hover:text-stone-600 group-hover:bg-stone-100'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Animated Content / Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 sm:pl-13 border-t border-stone-100/80">
                            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light">
                              {renderFormattedAnswer(faq.respuesta)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* ── EMPTY STATE ─────────────────────────────────────────── */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-4 bg-white rounded-2xl border border-stone-200 shadow-xs"
            >
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-brand-gold border border-brand-gold/20">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-800">
                No encontramos preguntas para tu búsqueda
              </h3>
              <p className="mt-1 text-xs text-stone-500 max-w-md mx-auto font-sans">
                No hay resultados para <span className="font-semibold text-stone-700">"{searchQuery}"</span> en la categoría seleccionada.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Ver todas las preguntas
                </button>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    `Hola Sandra, estuve buscando sobre "${searchQuery}" en la web y me gustaría hacerte una consulta.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Preguntar por WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── LUXURY WHATSAPP SUPPORT CTA CARD ──────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-stone-200/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3E2A0F] via-[#5C4018] to-[#2C1C0A] p-6 sm:p-10 text-white shadow-xl">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="text-center md:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs rounded-full border border-brand-gold/30">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                    Asesoría Directa
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#FAF8F5] leading-snug">
                  ¿Tienes una duda específica o{' '}
                  <span className="italic font-normal text-brand-gold">un pedido especial?</span>
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed font-sans font-light">
                  Escríbenos directamente por WhatsApp. Sandra Gil y nuestro equipo de taller te
                  asesorarán en la elección de aromas, cotizaciones de eventos o detalles de envío.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-[11px] text-stone-300 font-sans">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                    Atención personalizada
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    Respuesta en minutos
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    'Hola Sandra, estuve viendo la sección de Preguntas Frecuentes y me gustaría hacerte una consulta directa.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1da851] active:scale-98 text-white text-xs sm:text-sm uppercase tracking-widest font-bold rounded-xl transition-all duration-300 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
