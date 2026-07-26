import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart } from 'lucide-react';

const WA_NUMBER = '573175752029';
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20tus%20velas%20artesanales`;

export default function Footer() {
  return (
    <footer className="bg-[#2C2A29] text-[#FAF8F5] border-t border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">

          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo sandra.jpeg"
                alt="Sandra Gil Velas Artesanales"
                width={100}
                height={100}
                className="rounded-full object-cover ring-2 ring-brand-gold/40"
              />
            </Link>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
              Velas decorativas y aromáticas elaboradas a mano con cera de soya natural, flores botánicas preservadas y esencias exclusivas.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Bogotá, Colombia · Envíos locales</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Tienda</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link href="/catalogo" className="hover:text-white transition">Catálogo</Link></li>
              <li><Link href="/personalizadas" className="hover:text-white transition">Velas Bajo Pedido</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition">Checkout / Pago</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Legal</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/legal/aviso-legal" className="hover:text-white transition">Aviso Legal</Link></li>
              <li><Link href="/legal/politica-de-privacidad" className="hover:text-white transition">Política de Privacidad</Link></li>
              <li><Link href="/legal/politica-de-cookies" className="hover:text-white transition">Política de Cookies</Link></li>
              <li><Link href="/legal/terminos-y-condiciones" className="hover:text-white transition">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Contáctanos</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Síguenos en Instagram y escríbenos por WhatsApp para asesoría personalizada y pedidos especiales.
            </p>
            <div className="flex space-x-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-brand-gold transition flex items-center justify-center"
                aria-label="Instagram de Sandra Gil Velas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-[#25D366] transition flex items-center justify-center"
                aria-label="WhatsApp de Sandra Gil Velas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.999 2.001C6.476 2.001 2.001 6.476 2.001 12c0 1.763.463 3.414 1.272 4.848L2 22l5.306-1.243A9.954 9.954 0 0 0 12 22c5.523 0 9.999-4.477 9.999-10S17.523 2.001 12 2.001zm0 1.8A8.197 8.197 0 0 1 20.2 12c0 4.52-3.678 8.2-8.2 8.2a8.163 8.163 0 0 1-4.167-1.137l-.299-.181-3.101.727.766-2.999-.197-.31A8.163 8.163 0 0 1 3.8 12C3.8 7.48 7.478 3.8 12 3.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Sandra Gil Velas Artesanales. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> en Bogotá, Colombia.
          </p>
        </div>
      </div>
    </footer>
  );
}
