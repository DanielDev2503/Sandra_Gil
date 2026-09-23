'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown, Check, Wind, Droplets } from 'lucide-react';
import { getAromaProfile } from '@/lib/aromas';

interface AromaDropdownSelectorProps {
  aromas: string[];
  selectedAroma: string;
  onSelectAroma: (aroma: string) => void;
  productName?: string;
  showNotice?: boolean;
  showOlfactoryCard?: boolean;
  className?: string;
}

export default function AromaDropdownSelector({
  aromas,
  selectedAroma,
  onSelectAroma,
  productName,
  showNotice = true,
  showOlfactoryCard = true,
  className = '',
}: AromaDropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation (Escape to close)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const activeProfile = getAromaProfile(selectedAroma);

  return (
    <div className={`space-y-3 font-sans ${className}`} ref={dropdownRef}>
      {/* ── 1. CLEAR NOTICE: INFORMS THE USER THEY CAN CHOOSE THE SCENT ── */}
      {showNotice && (
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 sm:p-4 shadow-xs transition-all">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-brand-gold flex items-center justify-center shrink-0 mt-0.5 border border-amber-200/50">
              <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-stone-900 text-xs sm:text-sm tracking-tight">
                  ¡Escoge el aroma para tu vela!
                </span>
                <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider bg-brand-gold/15 text-brand-brown px-2 py-0.5 rounded-full">
                  Sin costo adicional
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px] sm:text-xs font-light">
                {productName ? (
                  <>
                    Puedes personalizar tu vela <strong className="font-semibold text-stone-800">{productName}</strong> eligiendo el aroma que prefieras en el menú desplegable. Todas nuestras velas se elaboran a mano con cera 100% de soya y esencias botánicas puras.
                  </>
                ) : (
                  'Puedes escoger libremente el aroma con el que quieres que elaboremos tu vela artesanal. Selecciona tu fragancia botánica favorita en el menú desplegable.'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. DROPDOWN MENU SELECTOR ── */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-4 shadow-xs space-y-2 relative">
        <label 
          id="aroma-dropdown-label"
          className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Selecciona el Aroma de tu Vela:</span>
          </span>
          <span className="text-[11px] font-normal text-stone-400 normal-case hidden sm:inline">
            Menú desplegable
          </span>
        </label>

        {/* Dropdown Trigger Button */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby="aroma-dropdown-label"
            className={`
              w-full min-h-[48px] sm:min-h-[52px] px-3.5 sm:px-4 py-2.5 rounded-xl text-left
              flex items-center justify-between gap-2.5
              border transition-all duration-200 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold
              ${isOpen
                ? 'border-brand-gold bg-amber-50/40 shadow-sm ring-2 ring-brand-gold/20'
                : 'border-stone-300/80 bg-white hover:border-brand-gold/60 hover:bg-stone-50/50 shadow-xs'
              }
            `}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-100/60 text-brand-gold flex items-center justify-center shrink-0 border border-amber-200/40">
                <Droplets className="w-4 h-4 text-brand-gold" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                    {selectedAroma}
                  </span>
                  {activeProfile.tag && (
                    <span className="text-[10px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded text-nowrap">
                      {activeProfile.tag}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 truncate font-light">
                  {activeProfile.mood}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-stone-400 shrink-0 ml-2">
              <span className="text-[11px] text-brand-gold font-medium hidden sm:inline">
                {isOpen ? 'Cerrar' : 'Cambiar aroma'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 text-stone-500 ${
                  isOpen ? 'rotate-180 text-brand-gold' : ''
                }`}
              />
            </div>
          </button>

          {/* Dropdown Menu Popover Options */}
          {isOpen && (
            <div
              role="listbox"
              aria-labelledby="aroma-dropdown-label"
              className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden max-h-[320px] overflow-y-auto divide-y divide-stone-100 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3.5 py-2 bg-[#FAF8F5] border-b border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Fragancias botánicas disponibles ({aromas.length})</span>
                <span className="text-brand-gold font-semibold">Elige 1</span>
              </div>

              {aromas.map((aroma) => {
                const isSelected = selectedAroma === aroma;
                const profile = getAromaProfile(aroma);

                return (
                  <button
                    key={aroma}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectAroma(aroma);
                      setIsOpen(false);
                      buttonRef.current?.focus();
                    }}
                    className={`
                      w-full px-3.5 sm:px-4 py-2.5 text-left flex items-center justify-between gap-3
                      transition-colors duration-150 cursor-pointer text-xs
                      ${isSelected
                        ? 'bg-amber-50/70 text-brand-brown font-semibold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                      }
                    `}
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm ${isSelected ? 'font-bold text-stone-900' : 'font-medium'}`}>
                          {aroma}
                        </span>
                        {profile.tag && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                            isSelected
                              ? 'bg-brand-gold/15 text-brand-brown font-semibold'
                              : 'bg-stone-100 text-stone-500'
                          }`}>
                            {profile.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate font-light">
                        {profile.mood}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-brand-gold text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-stone-300 hover:border-brand-gold" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── 3. SELECTION CONFIRMATION & SENSORY DETAIL CARD ── */}
        {showOlfactoryCard && (
          <div className="bg-[#FAF8F5] border border-brand-gold/20 rounded-lg p-2.5 sm:p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Tu vela será elaborada con aroma a:{' '}
                  <strong className="text-brand-brown font-bold underline decoration-brand-gold/40">
                    {selectedAroma}
                  </strong>
                </span>
              </div>
              <span className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-brand-gold/20 hidden sm:inline">
                100% Cera de Soya
              </span>
            </div>

            {activeProfile.top && (
              <p className="text-[11px] text-stone-500 font-light leading-relaxed pl-5">
                <span className="font-semibold text-stone-700">Notas:</span> {activeProfile.top} · {activeProfile.heart}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
