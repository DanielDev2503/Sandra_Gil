'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, Gift, Users, Calendar, ArrowRight, Heart } from 'lucide-react';
import CandleGlowPulse from './CandleGlowPulse';

const WA_NUMBER = '573175752029';

const EXPERIENCES = [
  {
    icon: Gift,
    title: 'Eventos & Recordatorios Exclusivos',
    subtitle: 'Bodas, Bautizos y Ocasiones Especiales',
    description:
      'Personalizamos aromas, etiquetas de diseño, cuarzos y flores preservadas para que tus invitados se lleven un recuerdo inolvidable lleno de luz.',
    ctaText: 'Cotizar para mi Evento',
    waMessage: 'Hola Sandra, quiero cotizar velas personalizadas para un evento especial.',
  },
  {
    icon: Users,
    title: 'Talleres de Creación & Vertido',
    subtitle: 'Experiencia Presencial en Bogotá',
    description:
      'Aprende a formular tus propios aromas, manipular cera de soya botánica y encapsular flores preservadas en un espacio íntimo de relajación y bienestar.',
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
    <section className="bg-[#FAF8F5] py-16 sm:py-24 border-b border-brand-gold/15 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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
          <p className="text-stone-600 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Desde detalles personalizados para fechas inolvidables hasta talleres sensoriales donde descubres el arte de la cera vegetal.
          </p>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EXPERIENCES.map((exp, idx) => {
            const Icon = exp.icon;
            const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(exp.waMessage)}`;

            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-brand-gold/20 hover:border-brand-gold/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold font-sans block mb-1">
                    {exp.subtitle}
                  </span>

                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-3 group-hover:text-brand-brown transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed font-sans">
                    {exp.description}
                  </p>
                </div>

                {/* Direct WhatsApp CTA Button */}
                <div className="mt-8 pt-5 border-t border-stone-100">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 min-h-[44px] bg-[#FAF8F5] hover:bg-[#25D366] text-brand-brown hover:text-white border border-brand-gold/30 hover:border-[#25D366] text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-2xs group/btn"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/btn:text-white transition-colors" />
                    <span>{exp.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
