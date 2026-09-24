'use client';

import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import BrandPillarsBento from './BrandPillarsBento';
import InteractiveProductShowcase from './InteractiveProductShowcase';
import ProductCatalog from './ProductCatalog';
import SensoryWorkshopSection from './SensoryWorkshopSection';
import CartDrawer from './CartDrawer';
import Footer from './Footer';

interface Variacion {
  id: string;
  nombre: string;
  imagen: string;
  precio: number | null;
  activo: boolean;
}

interface Product {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  tipo?: 'VELA' | 'JABON';
  aroma?: string | null;
  material?: string | null;
  dimensiones?: string | null;
  precio: number | null;
  esBajoPedido: boolean;
  stock: number;
  url_imagen: string | null;
  imagenes?: string[];
  activo: boolean;
  variaciones?: Variacion[];
}

interface StoreShellProps {
  products: Product[];
  heroProduct: Product | null;
  availableAromas?: string[];
}

export default function StoreShell({ products, heroProduct, availableAromas = [] }: StoreShellProps) {
  // Select featured showcase product (heroProduct or first product with stock)
  const showcaseProduct = heroProduct || products[0] || null;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Navigation Header */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with split balance & animated floating badge */}
        <HeroSection heroProduct={heroProduct} />

        {/* 2. Brand Pillars Bento Grid (100% Cera de Soya, Flores Botánicas Naturales, Hecho a Mano, Aromaterapia) */}
        <BrandPillarsBento />

        {/* 3. Interactive Product Spotlight & Olfactory Pyramid Experience */}
        {showcaseProduct && (
          <InteractiveProductShowcase
            product={showcaseProduct}
            availableAromas={availableAromas}
          />
        )}

        {/* 4. Complete Product Catalog without scent pills */}
        <ProductCatalog products={products} showFilters={false} />

        {/* 5. Sensory Aromas, Workshops & Custom Orders Section with WhatsApp CTAs */}
        <SensoryWorkshopSection />
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
