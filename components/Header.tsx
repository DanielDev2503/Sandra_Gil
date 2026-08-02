'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const WA_NUMBER = '573175752029';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Sobre Nosotros' },
  { href: '/personalizadas', label: 'Velas Personalizadas', highlight: true },
  {
    href: `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20contactarme%20contigo`,
    label: 'Contacto',
    isExternal: true,
  },
];

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Top micro-banner */}
      <div className="bg-brand-brown text-[#FAF8F5] text-[10px] sm:text-[11px] text-center py-1.5 px-3 font-sans tracking-wide">
        🕯️ 100% Cera de Soya Natural · Vertido a Mano en Bogotá · Flores Botánicas Preservadas ·{' '}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20velas`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-brand-accent transition inline-flex items-center gap-1 font-semibold"
        >
          Escríbenos
        </a>
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ir al inicio – Sandra Gil Velas Artesanales">
              <div className="relative w-10 h-10 md:w-14 md:h-14 shrink-0">
                <Image
                  src="/logo-sandra.png"
                  alt="Sandra Gil Velas Artesanales"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 40px, 56px"
                />
              </div>
              <span className="font-serif font-light text-base md:text-xl text-stone-900 tracking-wider hidden xs:inline-block">
                SANDRA GIL
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation (md and up) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-medium uppercase tracking-wider text-stone-600">
            {NAV_LINKS.map((link) => {
              if (link.isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-brown transition duration-200 min-h-[44px] inline-flex items-center"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-brand-brown transition duration-200 min-h-[44px] inline-flex items-center ${
                    link.highlight ? 'text-brand-gold font-semibold' : ''
                  } ${pathname === link.href ? 'text-brand-brown font-bold' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Cart + Mobile Hamburger Button */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={openCart}
              className="relative p-2.5 min-w-[44px] min-h-[44px] text-stone-700 hover:text-brand-brown hover:bg-stone-100/80 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs font-sans">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger button (visible up to md breakpoint: block md:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="block md:hidden p-2.5 min-w-[44px] min-h-[44px] text-stone-700 hover:text-brand-brown hover:bg-stone-100/80 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay + Drawer (up to md:hidden) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-[#FAF8F5] shadow-2xl flex flex-col animate-[slideIn_0.25s_ease-out]">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200/60">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-sandra.png"
                  alt="Sandra Gil"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <span className="font-serif text-sm font-light tracking-wider text-stone-900">SANDRA GIL</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 min-w-[44px] min-h-[44px] text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition flex items-center justify-center cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              {NAV_LINKS.map((link) => {
                if (link.isExternal) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between px-4 py-3.5 min-h-[44px] rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-brand-brown transition-all duration-200"
                    >
                      <span>{link.label}</span>
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-3.5 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? 'bg-brand-gold/15 text-brand-brown font-bold'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-brand-brown'
                    } ${link.highlight && pathname !== link.href ? 'text-brand-gold font-semibold' : ''}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="px-5 py-4 border-t border-stone-200/60 bg-stone-50/50">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20velas`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[44px] bg-[#25D366] hover:bg-[#1da851] text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all duration-300 shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                Asesoría por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

