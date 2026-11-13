'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gift, Users, Heart } from 'lucide-react';
import CandleGlowPulse from './CandleGlowPulse';

const WA_NUMBER = '573175752029';

const EXPERIENCES = [
  {
    icon: Gift,
    title: 'Eventos & Recordatorios Exclusivos',
    subtitle: 'Bodas, Bautizos y Ocasiones Especiales',
    description:
      'Personalizamos aromas botánicos, etiquetas de diseño, cuarzos y flores artesanales para que tus invitados se lleven un recuerdo inolvidable lleno de luz.',
    ctaText: 'Cotizar para mi Evento',
    waMessage: 'Hola Sandra, quiero cotizar velas personalizadas para un evento especial.',
  },
  {
    icon: Users,
    title: 'Talleres de Creación & Vertido',
    subtitle: 'Experiencia Presencial en Bogotá',
    description:
      'Aprende a formular tus propios aromas, manipular cera de soya botánica y crear flores artesanales en un espacio íntimo de relajación y bienestar.',
    ctaText: 'Consultar Próximas Fechas',
    waMessage: 'Hola Sandra, me gustaría información sobre los próximos talleres presenciales de velas.',
  },
  {
    icon: Heart,
    title: 'Regalos Corporativos & Marcas',
    subtitle: 'Detalles con Alma para Empresas',
    description:
      'Eleva el gifting de tu empresa con velas ecológicas premium personalizadas con la identidad y aroma insignia de tu marca.',
    ctaText: 'Propuesta Corporativa',
    waMessage: 'Hola Sandra, me interesa una propuesta de velas para regalos corporativos de mi empresa.',
  },
];

export default function SensoryWorkshopSection() {
  return (
    <section className="bg-[#FAF8F5] py-8 sm:py-12 border-b border-brand-gold/15 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white rounded-full border border-brand-gold/30 shadow-xs mb-3">
            <CandleGlowPulse size="sm">
              <Sparkles className="w-3 h-3 text-brand-gold" />
            </CandleGlowPulse>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
              Experiencias & Personalización
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 tracking-tight">
            Creamos Momentos Inolvidables
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 mb-4" />
          <p className="text-stone-600 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto">
            Taller artesanal en Bogotá dedicado a la creación de velas aromáticas en 100% cera de soya natural pura y flores artesanales. Diseñamos recordatorios exclusivos para bodas y eventos, regalos corporativos y talleres presenciales con envíos locales y a toda Colombia.
          </p>
        </div>

        {/* ── ASYMMETRIC EDITORIAL GRID (RITMO ASIMÉTRICO LOOKBOOK) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* COLUMNA IZQUIERDA HERO (7 de 12 cols): Experiencia Destacada 01 */}
          {(() => {
            const exp = EXPERIENCES[0];
            const Icon = exp.icon;
            const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(exp.waMessage)}`;

            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 group flex flex-col justify-between border-t border-[#B8862D]/40 pt-6 sm:pt-8"
              >
                <div>
                  {/* Top Editorial Row: Giant Golden Numeral & Delicate Icon */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-serif text-[#B8862D]/35 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight select-none">
                      01
                    </span>
                    <Icon className="w-5 h-5 text-[#B8862D]/70 stroke-[1.5]" aria-hidden="true" />
                  </div>

                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B8862D] font-semibold font-sans block mb-2">
                    {exp.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-tight tracking-tight mb-3 group-hover:text-[#B8862D] transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-5 font-sans max-w-xl">
                    {exp.description}
                  </p>

                  {/* Editorial Callout */}
                  <div className="border-l-2 border-[#B8862D]/40 pl-3.5 py-1 mb-6 bg-amber-50/30 rounded-r-md">
                    <p className="font-serif italic text-xs sm:text-sm text-stone-700">
                      Personalización de aromas, etiquetas de diseño, cuarzos y flores en cera para momentos irrepetibles.
                    </p>
                  </div>
                </div>

                {/* Editorial CTA */}
                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B8862D] hover:text-[#91651D] transition-colors"
                  >
                    <span>{exp.ctaText}</span>
                    <span className="transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            );
          })()}

          {/* COLUMNA DERECHA ESCALONADA (5 de 12 cols): Experiencias 02 y 03 en Stack Asimétrico */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            {EXPERIENCES.slice(1).map((exp, idx) => {
              const Icon = exp.icon;
              const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(exp.waMessage)}`;
              const editorialNumber = String(idx + 2).padStart(2, '0');
              const isOffset = idx === 1;

              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (idx + 1) * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`group flex flex-col justify-between border-t border-stone-200/80 pt-6 sm:pt-7 ${
                    isOffset ? 'lg:pl-6 xl:pl-8 border-l-0 lg:border-l lg:border-stone-200/40' : ''
                  }`}
                >
                  <div>
                    {/* Editorial Numeral & Icon */}
                    <div className="flex items-baseline justify-between mb-2.5">
                      <span className="font-serif text-[#B8862D]/35 text-3xl sm:text-4xl font-light tracking-tight select-none">
                        {editorialNumber}
                      </span>
                      <Icon className="w-4 h-4 text-[#B8862D]/70 stroke-[1.5]" aria-hidden="true" />
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8862D] font-semibold font-sans block mb-1">
                      {exp.subtitle}
                    </span>

                    <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-normal leading-snug mb-2 group-hover:text-[#B8862D] transition-colors">
                      {exp.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4 font-sans">
                      {exp.description}
                    </p>
                  </div>

                  {/* Editorial CTA */}
                  <div className="pt-1">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B8862D] hover:text-[#91651D] transition-colors"
                    >
                      <span>{exp.ctaText}</span>
                      <span className="transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
