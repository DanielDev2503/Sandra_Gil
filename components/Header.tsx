'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';

const WA_NUMBER = '573175752029';

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/personalizadas', label: 'Velas Personalizadas' },
  { href: '/envio-express', label: 'Envío Express' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
];

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Estado para el menú desplegable de Catálogo (desktop)
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [velasFlyoutOpen, setVelasFlyoutOpen] = useState(false);

  // Estado para el acordeón de Catálogo en drawer móvil
  const isCatalogoActive = pathname.startsWith('/catalogo');
  const [mobileCatalogoOpen, setMobileCatalogoOpen] = useState(isCatalogoActive);

  const catalogContainerRef = useRef<HTMLDivElement>(null);

  // Sincronizar estados al cambiar de ruta durante el render (patrón recomendado por React)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setCatalogDropdownOpen(false);
    setVelasFlyoutOpen(false);
    if (pathname.startsWith('/catalogo')) {
      setMobileCatalogoOpen(true);
    }
  }

  // Click outside listener y tecla Escape para cerrar dropdown en desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        catalogContainerRef.current &&
        !catalogContainerRef.current.contains(event.target as Node)
      ) {
        setCatalogDropdownOpen(false);
        setVelasFlyoutOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCatalogDropdownOpen(false);
        setVelasFlyoutOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  // Detección estandarizada de ruta activa
  const isLinkActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top rotating announcement carousel */}
      <AnnouncementBar />

      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

          {/* Left: Logo + Brand (Accesible sin duplicidad de texto) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Sandra Gil Velas Artesanales - Inicio"
            >
              <div className="relative w-10 h-10 md:w-14 md:h-14 shrink-0">
                <Image
                  src="/logo-sandra.png"
                  alt="Sandra Gil Velas Artesanales"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                  sizes="(max-width: 768px) 40px, 56px"
                />
              </div>
              <span
                className="font-serif font-light text-base md:text-xl text-stone-900 tracking-wider hidden xs:inline-block"
                aria-hidden="true"
              >
                SANDRA GIL
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation (md and up) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs uppercase tracking-wider text-stone-700">
            {NAV_LINKS.map((link) => {
              if (link.isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-500 transition-colors duration-200 min-h-[44px] inline-flex items-center font-normal"
                  >
                    {link.label}
                  </a>
                );
              }

              // Elemento especial para Catálogo con Menú Desplegable y Flyout lateral limpio (sin emojis ni badges)
              if (link.href === '/catalogo') {
                return (
                  <div
                    key={link.href}
                    ref={catalogContainerRef}
                    className="relative group min-h-[44px] flex items-center"
                    onMouseEnter={() => setCatalogDropdownOpen(true)}
                    onMouseLeave={() => {
                      setCatalogDropdownOpen(false);
                      setVelasFlyoutOpen(false);
                    }}
                  >
                    <Link
                      href="/catalogo"
                      id="catalog-menu-button"
                      aria-haspopup="true"
                      aria-expanded={catalogDropdownOpen}
                      className={`min-h-[44px] inline-flex items-center gap-1.5 transition-colors duration-200 uppercase tracking-wider ${
                        isCatalogoActive
                          ? 'text-amber-500 font-medium'
                          : 'text-stone-700 hover:text-amber-500 group-hover:text-amber-500 font-normal'
                      }`}
                    >
                      <span className="relative py-1">
                        {link.label}
                        {isCatalogoActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                        )}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${
                          isCatalogoActive
                            ? 'text-amber-500'
                            : 'text-stone-400 group-hover:text-amber-500'
                        }`}
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Menú Desplegable Principal (Dropdown) */}
                    <div
                      role="menu"
                      aria-labelledby="catalog-menu-button"
                      className={`absolute left-0 top-full pt-2 w-60 z-50 transition-all duration-200 ease-out ${
                        catalogDropdownOpen
                          ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                          : 'opacity-0 -translate-y-1 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:visible group-focus-within:pointer-events-auto'
                      }`}
                    >
                      <div className="bg-[#FAF8F5]/98 backdrop-blur-md border border-stone-200/80 rounded-2xl shadow-xl shadow-stone-900/10 p-2 text-stone-700">
                        {/* Opción 1: Ver Todo el Catálogo (Enlace directo superior sin emojis) */}
                        <Link
                          href="/catalogo"
                          role="menuitem"
                          onClick={() => {
                            setCatalogDropdownOpen(false);
                            setVelasFlyoutOpen(false);
                          }}
                          className="block px-3.5 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                        >
                          Ver Todo el Catálogo
                        </Link>

                        {/* Separador elegante */}
                        <div className="my-1 border-t border-stone-200/60" />

                        {/* Opción 2: Velas con Submenú Lateral (Flyout sin emojis) */}
                        <div
                          className="relative group/sub"
                          onMouseEnter={() => setVelasFlyoutOpen(true)}
                          onMouseLeave={() => setVelasFlyoutOpen(false)}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            aria-haspopup="true"
                            aria-expanded={velasFlyoutOpen}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider text-stone-700 hover:bg-amber-50 hover:text-amber-900 cursor-pointer transition-colors group-hover/sub:bg-amber-50 group-hover/sub:text-amber-900"
                          >
                            <span>Velas</span>
                            <ChevronRight className="w-4 h-4 text-stone-400 group-hover/sub:text-amber-700 group-hover/sub:translate-x-0.5 transition-all" />
                          </div>

                          {/* Submenú lateral (Flyout) con puente invisible seguro */}
                          <div
                            role="menu"
                            aria-label="Submenú de Velas"
                            className={`absolute left-full top-0 pl-2 w-64 z-50 transition-all duration-200 ease-out before:absolute before:-left-2 before:top-0 before:w-4 before:h-full before:content-[''] ${
                              velasFlyoutOpen
                                ? 'opacity-100 translate-x-0 visible pointer-events-auto'
                                : 'opacity-0 -translate-x-1 invisible pointer-events-none group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-hover/sub:visible group-hover/sub:pointer-events-auto group-focus-within/sub:opacity-100 group-focus-within/sub:translate-x-0 group-focus-within/sub:visible group-focus-within/sub:pointer-events-auto'
                            }`}
                          >
                            <div className="bg-[#FAF8F5]/98 backdrop-blur-md border border-stone-200/80 rounded-2xl shadow-xl shadow-stone-900/10 p-2 space-y-1">
                              {/* Velas Esculpidas */}
                              <Link
                                href="/catalogo?tipo=VELA_ESCULPIDA"
                                role="menuitem"
                                onClick={() => {
                                  setCatalogDropdownOpen(false);
                                  setVelasFlyoutOpen(false);
                                }}
                                className="block px-3.5 py-2 rounded-xl transition-colors hover:bg-amber-50 group/subitem"
                              >
                                <p className="text-xs font-semibold uppercase tracking-wider text-stone-800 group-hover/subitem:text-amber-800">
                                  Velas Esculpidas
                                </p>
                                <p className="text-[11px] text-stone-500 font-normal tracking-normal lowercase first-letter:uppercase">
                                  Figuras botánicas y artesanales
                                </p>
                              </Link>

                              {/* Velas en Envase */}
                              <Link
                                href="/catalogo?tipo=VELA_ENVASE"
                                role="menuitem"
                                onClick={() => {
                                  setCatalogDropdownOpen(false);
                                  setVelasFlyoutOpen(false);
                                }}
                                className="block px-3.5 py-2 rounded-xl transition-colors hover:bg-amber-50 group/subitem"
                              >
                                <p className="text-xs font-semibold uppercase tracking-wider text-stone-800 group-hover/subitem:text-amber-800">
                                  Velas en Envase
                                </p>
                                <p className="text-[11px] text-stone-500 font-normal tracking-normal lowercase first-letter:uppercase">
                                  Aromaterapia en frascos de vidrio
                                </p>
                              </Link>

                              {/* Velas Bajo Pedido (Sin badge "A MEDIDA") */}
                              <Link
                                href="/personalizadas"
                                role="menuitem"
                                onClick={() => {
                                  setCatalogDropdownOpen(false);
                                  setVelasFlyoutOpen(false);
                                }}
                                className="block px-3.5 py-2 rounded-xl transition-colors hover:bg-amber-50 group/subitem"
                              >
                                <p className="text-xs font-semibold uppercase tracking-wider text-stone-800 group-hover/subitem:text-amber-800">
                                  Velas Bajo Pedido
                                </p>
                                <p className="text-[11px] text-stone-500 font-normal tracking-normal lowercase first-letter:uppercase">
                                  Diseños únicos para eventos
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Opción 3: Jabones Artesanales (Sin emojis ni texto secundario "botánicos") */}
                        <Link
                          href="/catalogo?tipo=JABON"
                          role="menuitem"
                          onClick={() => {
                            setCatalogDropdownOpen(false);
                            setVelasFlyoutOpen(false);
                          }}
                          className="block px-3.5 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider text-stone-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                        >
                          Jabones Artesanales
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 min-h-[44px] inline-flex items-center ${
                    isActive
                      ? 'text-amber-500 font-medium'
                      : 'text-stone-700 hover:text-amber-500 font-normal'
                  }`}
                >
                  <span className="relative py-1">
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Cart + Mobile Hamburger Button */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={openCart}
              className="relative p-2.5 min-w-[44px] min-h-[44px] text-stone-700 hover:text-amber-500 hover:bg-stone-100/80 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-brown text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md font-sans border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger button (visible up to md breakpoint: block md:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="block md:hidden p-2.5 min-w-[44px] min-h-[44px] text-stone-700 hover:text-amber-500 hover:bg-stone-100/80 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer"
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
                  unoptimized
                  className="object-contain"
                />
                <span className="font-serif text-sm font-light tracking-wider text-stone-900" aria-hidden="true">SANDRA GIL</span>
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
                      className="flex items-center justify-between px-4 py-3.5 min-h-[44px] rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-amber-500 transition-all duration-200"
                    >
                      <span>{link.label}</span>
                      <MessageCircle className="w-4 h-4 text-amber-600" />
                    </a>
                  );
                }

                // Acordeón de Catálogo en Drawer Móvil (sin emojis ni badges)
                if (link.href === '/catalogo') {
                  return (
                    <div key={link.href} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setMobileCatalogoOpen((prev) => !prev)}
                        aria-expanded={mobileCatalogoOpen}
                        className={`w-full flex items-center justify-between px-4 py-3.5 min-h-[44px] rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                          isCatalogoActive
                            ? 'bg-amber-50 text-amber-600 font-medium'
                            : 'text-stone-700 hover:bg-stone-100 hover:text-amber-500 font-normal'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 text-stone-500 ${
                            mobileCatalogoOpen ? 'rotate-180 text-amber-600' : ''
                          }`}
                        />
                      </button>

                      {mobileCatalogoOpen && (
                        <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-amber-200/70 ml-4">
                          <Link
                            href="/catalogo"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 rounded-md text-xs font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-900"
                          >
                            Ver Todo el Catálogo
                          </Link>

                          <div className="pt-2 pb-0.5 px-3 text-[10px] uppercase font-bold tracking-wider text-amber-800/80">
                            Velas
                          </div>
                          <Link
                            href="/catalogo?tipo=VELA_ESCULPIDA"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 rounded-md text-xs text-stone-700 hover:bg-amber-50 hover:text-amber-800"
                          >
                            Velas Esculpidas
                          </Link>
                          <Link
                            href="/catalogo?tipo=VELA_ENVASE"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 rounded-md text-xs text-stone-700 hover:bg-amber-50 hover:text-amber-800"
                          >
                            Velas en Envase
                          </Link>
                          <Link
                            href="/personalizadas"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 rounded-md text-xs text-stone-700 hover:bg-amber-50 hover:text-amber-800"
                          >
                            Velas Bajo Pedido
                          </Link>

                          <div className="pt-2 pb-0.5 px-3 text-[10px] uppercase font-bold tracking-wider text-amber-800/80">
                            Cuidado Personal
                          </div>
                          <Link
                            href="/catalogo?tipo=JABON"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 rounded-md text-xs text-stone-700 hover:bg-amber-50 hover:text-amber-800"
                          >
                            Jabones Artesanales
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-3.5 min-h-[44px] rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-50 text-amber-600 font-medium'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-amber-500 font-normal'
                    }`}
                  >
                    <span>{link.label}</span>
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
                className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[44px] bg-[#B8862D] hover:bg-[#A37424] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                Asesoría por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
