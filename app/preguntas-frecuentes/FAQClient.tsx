'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ChevronDown,
  Sparkles,
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
    <div className="w-full bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Mobile Header (< lg) */}
        <div className="lg:hidden mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-brand-gold/30 shadow-xs mb-2">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span className="text-[10px] font-bold text-brand-brown uppercase tracking-widest font-sans">
              Centro de Ayuda
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-tight">
            Preguntas <span className="italic font-normal text-brand-gold">Frecuentes</span>
          </h1>
          <p className="mt-1 text-stone-600 text-xs font-sans font-light">
            Respuestas sobre nuestras velas de cera de soya, envíos en Bogotá y pedidos especiales.
          </p>
        </div>

        {/* Responsive 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* ── LEFT COLUMN: PREGUNTAS (lg:col-span-7 xl:col-span-8 order-2 lg:order-1) ── */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 rounded-full border border-brand-gold/30 shadow-xs mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-brand-brown uppercase tracking-widest font-sans">
                  Centro de Ayuda & Guía Artesanal
                </span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-serif font-light text-stone-900 tracking-tight">
                Preguntas <span className="italic font-normal text-brand-gold">Frecuentes</span>
              </h1>
              <p className="mt-2 text-stone-600 text-xs sm:text-sm max-w-xl font-sans font-light leading-relaxed">
                Encuentra respuestas inmediatas sobre nuestras velas de cera de soya, envíos en Bogotá,
                formas de pago seguras y el cuidado ideal para tu vela.
              </p>
            </div>

            {/* Results Counter / Filter Status */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200/60 text-xs text-stone-500">
              <p>
                Mostrando <span className="font-semibold text-stone-800">{filteredFaqs.length}</span>{' '}
                {filteredFaqs.length === 1 ? 'pregunta' : 'preguntas'}
                {selectedCategory !== 'Todas' && (
                  <span>
                    {' '}
                    en <span className="font-semibold text-brand-brown">{selectedCategory}</span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {' '}
                    para <span className="font-semibold text-brand-brown">&quot;{searchQuery}&quot;</span>
                  </span>
                )}
              </p>
              {(searchQuery || selectedCategory !== 'Todas') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-brown font-medium transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
              )}
            </div>

            {/* Accordions */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = !!openIds[faq.id];
                  return (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                        isOpen
                          ? 'border-brand-gold/40 shadow-sm ring-1 ring-brand-gold/15'
                          : 'border-stone-200/80 hover:border-brand-gold/30 shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        className="w-full text-left p-3.5 sm:p-4.5 flex items-start justify-between gap-3 cursor-pointer select-none group"
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div
                            className={`mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              isOpen
                                ? 'bg-brand-gold text-white shadow-xs'
                                : 'bg-stone-100 text-stone-400 group-hover:bg-brand-gold/15 group-hover:text-brand-gold'
                            }`}
                          >
                            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div>
                            <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-brand-gold mb-0.5">
                              {faq.categoria}
                            </span>
                            <h2
                              className={`font-serif text-sm sm:text-base leading-snug transition-colors duration-200 ${
                                isOpen
                                  ? 'text-brand-brown font-medium'
                                  : 'text-stone-800 group-hover:text-brand-brown'
                              }`}
                            >
                              {faq.pregunta}
                            </h2>
                          </div>
                        </div>

                        <div
                          className={`p-1 sm:p-1.5 rounded-full transition-transform duration-300 shrink-0 mt-0.5 ${
                            isOpen
                              ? 'rotate-180 bg-brand-gold/10 text-brand-gold'
                              : 'text-stone-400 group-hover:text-stone-600 group-hover:bg-stone-100'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-answer-${faq.id}`}
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="px-3.5 pb-4 sm:px-4.5 sm:pb-5 pt-1 sm:pl-11 border-t border-stone-100">
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
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 px-4 bg-white rounded-2xl border border-stone-200 shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3 text-brand-gold border border-brand-gold/20">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-stone-800">
                  No encontramos preguntas para tu búsqueda
                </h3>
                <p className="mt-1 text-xs text-stone-500 max-w-md mx-auto font-sans">
                  No hay resultados para <span className="font-semibold text-stone-700">&quot;{searchQuery}&quot;</span> en la categoría seleccionada.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-full transition cursor-pointer"
                  >
                    Ver todas las preguntas
                  </button>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                      `Hola Sandra, estuve buscando sobre "${searchQuery}" en la web y me gustaría hacerte una consulta.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#B8862D] hover:bg-[#A37424] text-white text-xs font-bold rounded-full transition inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    Preguntar por WhatsApp
                  </a>
                </div>
              </motion.div>
            )}

            {/* Mobile WhatsApp Banner (shown under FAQs on mobile) */}
            <div className="lg:hidden mt-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3E2A0F] via-[#5C4018] to-[#2C1C0A] p-4 text-white shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                      Asesoría Directa
                    </span>
                    <h4 className="text-sm font-serif font-light text-white mt-0.5">
                      ¿Dudas o pedidos especiales?
                    </h4>
                    <p className="text-[11px] text-stone-300 font-sans mt-0.5">
                      Escríbenos por WhatsApp y te asesoramos al instante.
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                      'Hola Sandra, estuve viendo las preguntas frecuentes y quisiera asesoría personalizada.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 bg-[#B8862D] hover:bg-[#A37424] text-white text-xs font-bold rounded-full transition inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: STICKY SIDEBAR (lg:col-span-5 xl:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24 space-y-4) ── */}
          <aside className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24 space-y-4">
            {/* Search Box */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-xs">
              <label htmlFor="faq-search" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-2 font-sans">
                Buscar en preguntas
              </label>
              <div className="relative flex items-center bg-stone-50 rounded-xl border border-stone-200 focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/15 focus-within:bg-white transition">
                <div className="pl-3 text-stone-400">
                  <Search className="w-4 h-4 text-brand-gold" />
                </div>
                <input
                  id="faq-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por tema, palabra..."
                  className="w-full py-2.5 pl-2.5 pr-8 text-xs text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition cursor-pointer"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills & Expand/Collapse */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-700 font-sans">
                  Categorías
                </h3>
                {/* Quick Actions (Expand/Collapse all) */}
                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-sans">
                  <button
                    type="button"
                    onClick={() => expandAll(filteredFaqs)}
                    className="hover:text-brand-brown hover:underline cursor-pointer"
                  >
                    Expandir
                  </button>
                  <span className="text-stone-300">·</span>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="hover:text-brand-brown hover:underline cursor-pointer"
                  >
                    Colapsar
                  </button>
                </div>
              </div>

              {/* Mobile view: horizontal scrolling pills */}
              <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {FAQ_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-brown text-white shadow-xs font-semibold'
                          : 'bg-stone-50 text-stone-600 border border-stone-200/70 hover:border-brand-gold/40'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-brand-gold text-white' : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop view: compact list of category buttons */}
              <div className="hidden lg:flex lg:flex-col space-y-1">
                {FAQ_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between cursor-pointer text-left ${
                        isSelected
                          ? 'bg-brand-brown text-white shadow-xs font-semibold'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-brand-brown'
                      }`}
                    >
                      <span className="truncate pr-2">{cat}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
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
            </div>

            {/* WhatsApp Luxury Support Card (Desktop sidebar) */}
            <div className="hidden lg:block relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3E2A0F] via-[#5C4018] to-[#2C1C0A] p-4 text-white shadow-md">
              <div className="absolute top-0 right-0 w-36 h-36 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded-full border border-brand-gold/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">
                    Asesoría Directa
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-light text-[#FAF8F5] leading-snug">
                    ¿Dudas o pedidos especiales?
                  </h3>
                  <p className="mt-1 text-[11px] text-stone-300 font-sans font-light leading-relaxed">
                    Sandra Gil y nuestro equipo te asesoran al instante por WhatsApp en aromas, cotizaciones o envíos.
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-0.5 text-[10px] text-stone-300">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-brand-gold" />
                    Personalizada
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-gold" />
                    Respuesta ágil
                  </span>
                </div>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    'Hola Sandra, estuve viendo la sección de Preguntas Frecuentes y me gustaría hacerte una consulta directa.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B8862D] hover:bg-[#A37424] text-white text-[11px] uppercase tracking-wider font-bold rounded-full transition shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
