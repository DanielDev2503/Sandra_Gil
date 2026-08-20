'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Sparkles, Flame, ShieldCheck, HeartHandshake, Wind } from 'lucide-react';
import CandleGlowPulse from './CandleGlowPulse';

const PILLARS = [
  {
    id: 'soya',
    badge: 'Pureza Botánica',
    title: '100% Cera de Soya Natural',
    description:
      'Nuestras velas están elaboradas con cera vegetal biodegradable extraída de soya sostenible. No emiten toxinas, producen hasta un 90% menos de hollín que la parafina convencional y ofrecen una combustión limpia y duradera.',
    icon: Leaf,
    colSpan: 'lg:col-span-8',
    highlight: 'Combustión limpia & quemado prolongado',
    tag: 'Eco-Friendly',
  },
  {
    id: 'flores',
    badge: 'Arte Botánico',
    title: 'Flores Preservadas Reales',
    description:
      'Incorporamos hortensias, eucalipto, lavanda y siemprevivas naturales que mantienen su color y textura intactos, convirtiendo cada vela en una pieza decorativa de lujo.',
    icon: Sparkles,
    colSpan: 'lg:col-span-4',
    highlight: 'Naturaleza inmortalizada',
    tag: 'Diseño Único',
  },
  {
    id: 'artesanal',
    badge: 'Taller Local',
    title: 'Vertido a Mano en Bogotá',
    description:
      'Cada lote se vierte manualmente a temperatura controlada en nuestro taller en Bogotá. Respetamos los tiempos de curado para asegurar aromas equilibrados y superficies aterciopeladas.',
    icon: HeartHandshake,
    colSpan: 'lg:col-span-4',
    highlight: 'Elaboración consciente en pequeños lotes',
    tag: 'Hecho a Mano',
  },
  {
    id: 'aromas',
    badge: 'Bienestar Holístico',
    title: 'Esencias Aromaterapéuticas',
    description:
      'Formuladas con aceites de alta concentración libres de ftalatos. Diseñadas para armonizar espacios, calmar la mente y crear rituales de calma en tu día a día.',
    icon: Wind,
    colSpan: 'lg:col-span-8',
    highlight: 'Notas olfativas francesas & botánicas',
    tag: 'Libre de Tóxicos',
  },
];

export default function BrandPillarsBento() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-brand-gold/15 relative overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-50 rounded-full border border-brand-gold/25 mb-3">
            <CandleGlowPulse size="sm">
              <Sparkles className="w-3 h-3 text-brand-gold" />
            </CandleGlowPulse>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
              Nuestra Filosofía
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 tracking-tight">
            Pilares de Excelencia Artesanal
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4 mb-4" />
          <p className="text-stone-500 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Cada vela es el resultado de un proceso consciente que fusiona la pureza de la cera vegetal, 
            el arte de las flores preservadas y la sutileza de la perfumería fina.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`${pillar.colSpan} group relative bg-[#FAF8F5] rounded-xl p-6 sm:p-8 border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Bar with Badge & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white shadow-xs border border-brand-gold/25 text-brand-gold group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-brand-brown uppercase tracking-wider font-sans">
                        {pillar.badge}
                      </span>
                    </div>

                    <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white border border-brand-gold/20 text-stone-600 font-medium">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 mb-2.5 group-hover:text-brand-brown transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer Highlight */}
                <div className="mt-6 pt-4 border-t border-brand-gold/15 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="text-[11px] font-medium text-brand-brown italic">
                    {pillar.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
