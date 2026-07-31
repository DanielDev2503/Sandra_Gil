'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const WA_NUMBER = '573175752029';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/personalizadas', label: 'Bajo Pedido', highlight: true },
  { href: '/nosotros', label: 'Sobre Nosotros' },
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
      <div className="bg-brand-brown text-[#FAF8F5] text-[10px] sm:text-[11px] text-center py-1.5 font-sans tracking-wide">
        🕯️ 100% Cera de Soya Natural · Vertido a Mano en Bogotá · Flores Botánicas Preservadas ·{' '}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20velas`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-brand-accent transition"
        >
          Escríbenos
        </a>
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="inline-block group" aria-label="Ir al inicio – Sandra Gil Velas Artesanales">
              <Image
                src="/logo-sandra.png"
                alt="Sandra Gil Velas Artesanales"
                width={56}
                height={56}
                priority
                className="rounded-full object-cover ring-2 ring-brand-gold/50 group-hover:ring-brand-gold transition duration-300 shadow-sm"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-7 text-xs font-medium uppercase tracking-wider text-stone-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-brand-brown transition duration-200 ${
                  link.highlight ? 'text-brand-gold font-semibold' : ''
                } ${pathname === link.href ? 'text-brand-brown' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Cart + Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={openCart}
              className="relative p-2 text-stone-700 hover:text-brand-brown hover:bg-stone-100 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm font-sans">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden p-2 text-stone-700 hover:text-brand-brown hover:bg-stone-100 rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay + Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 w-72 max-w-[80vw] h-full bg-[#FAF8F5] shadow-2xl flex flex-col animate-[slideIn_0.25s_ease-out]">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200/60">
              <Image
                src="/logo-sandra.png"
                alt="Sandra Gil"
                width={40}
                height={40}
                className="rounded-full object-cover ring-1 ring-brand-gold/40"
              />
              <button
                onClick={closeMobileMenu}
                className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex-1 px-5 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-brand-gold/10 text-brand-brown font-semibold'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-brand-brown'
                  } ${link.highlight && pathname !== link.href ? 'text-brand-gold' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="px-5 py-4 border-t border-stone-200/60">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20velas`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1da851] text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all duration-300 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.999 2.001C6.476 2.001 2.001 6.476 2.001 12c0 1.763.463 3.414 1.272 4.848L2 22l5.306-1.243A9.954 9.954 0 0 0 12 22c5.523 0 9.999-4.477 9.999-10S17.523 2.001 12 2.001zm0 1.8A8.197 8.197 0 0 1 20.2 12c0 4.52-3.678 8.2-8.2 8.2a8.163 8.163 0 0 1-4.167-1.137l-.299-.181-3.101.727.766-2.999-.197-.31A8.163 8.163 0 0 1 3.8 12C3.8 7.48 7.478 3.8 12 3.8z"/>
                </svg>
                Escríbenos
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
