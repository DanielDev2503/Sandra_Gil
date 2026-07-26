'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const WA_NUMBER = '573175752029';

export default function Header() {
  const { cartCount, openCart } = useCart();

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

          {/* Left Navigation */}
          <nav className="hidden sm:flex items-center space-x-7 text-xs font-medium uppercase tracking-wider text-stone-600">
            <Link href="/" className="hover:text-brand-brown transition duration-200">Inicio</Link>
            <Link href="/catalogo" className="hover:text-brand-brown transition duration-200">Catálogo</Link>
            <Link href="/personalizadas" className="hover:text-brand-brown transition duration-200 text-brand-gold font-semibold">
              Bajo Pedido
            </Link>
          </nav>

          {/* Brand Logo — centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link href="/" className="inline-block group" aria-label="Ir al inicio – Sandra Gil Velas Artesanales">
              <Image
                src="/logo sandra.jpeg"
                alt="Sandra Gil Velas Artesanales"
                width={64}
                height={64}
                priority
                className="rounded-full object-cover ring-2 ring-brand-gold/50 group-hover:ring-brand-gold transition duration-300 shadow-sm"
              />
            </Link>
          </div>

          {/* Right: Cart */}
          <div className="flex items-center space-x-4 ml-auto">
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
          </div>
        </div>
      </header>
    </>
  );
}
