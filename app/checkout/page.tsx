'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CITIES = [
  { name: 'Bogotá D.C.', shippingFee: 0, value: 'Bogotá' },
  { name: 'Chía', shippingFee: 0, value: 'Alrededores' },
  { name: 'Cajicá', shippingFee: 0, value: 'Alrededores' },
  { name: 'Cota', shippingFee: 0, value: 'Alrededores' },
  { name: 'La Calera', shippingFee: 0, value: 'Alrededores' },
  { name: 'Sopó', shippingFee: 0, value: 'Alrededores' },
  { name: 'Soacha', shippingFee: 0, value: 'Alrededores' },
  { name: 'Zipaquirá', shippingFee: 0, value: 'Alrededores' },
];

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount } = useCart();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudadIndex: '0', // Defaults to Bogota
    direccion: '',
    notas: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (isClient && cart.length === 0) {
      router.push('/');
    }
  }, [cart, isClient, router]);

  if (!isClient || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#A68F81] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-stone-600 text-sm">Cargando tu pedido...</p>
        </div>
      </div>
    );
  }

  const selectedCity = CITIES[parseInt(formData.ciudadIndex)];
  const shippingCost = selectedCity.shippingFee;
  const grandTotal = cartTotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) tempErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      tempErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'El correo electrónico no es válido';
    }
    
    // Colombian Mobile phone validation (10 digits, starts with 3)
    if (!formData.telefono.trim()) {
      tempErrors.telefono = 'El teléfono celular es obligatorio';
    } else if (!/^3\d{9}$/.test(formData.telefono.replace(/\s+/g, ''))) {
      tempErrors.telefono = 'Debe ser un número celular de 10 dígitos (Ej: 3001234567)';
    }

    if (!formData.direccion.trim()) tempErrors.direccion = 'La dirección de envío es obligatoria';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      // Create order in backend and get Wompi configuration
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_nombre: formData.nombre,
          cliente_email: formData.email,
          cliente_telefono: formData.telefono.replace(/\s+/g, ''),
          ciudad: selectedCity.name,
          region: selectedCity.value, // 'Bogotá' o 'Alrededores'
          direccion_envio: formData.direccion,
          notas_entrega: formData.notas,
          costo_envio: shippingCost,
          items: cart.map((item) => ({
            producto_id: item.id,
            cantidad: item.cantidad,
            precio_unitario: item.precio,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el pedido.');
      }

      const data = await response.json();

      // Submit form programmatically to Wompi hosted checkout
      const wompiForm = document.createElement('form');
      wompiForm.method = 'GET';
      wompiForm.action = data.wompiUrl;

      const params = {
        'public-key': data.publicKey,
        'currency': 'COP',
        'amount-in-cents': data.amountInCents.toString(),
        'reference': data.reference,
        'signature:integrity': data.signature,
        'redirect-url': data.redirectUrl,
        'customer-data:email': formData.email,
        'customer-data:full-name': formData.nombre,
        'customer-data:phone-number': formData.telefono.replace(/\s+/g, ''),
        'shipping-address:address-line-1': formData.direccion,
        'shipping-address:city': selectedCity.name,
        'shipping-address:region': selectedCity.value === 'Bogotá' ? 'Bogotá D.C.' : 'Cundinamarca',
        'shipping-address:country': 'CO',
        'shipping-address:phone-number': formData.telefono.replace(/\s+/g, ''),
      };

      for (const [key, value] of Object.entries(params)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        wompiForm.appendChild(input);
      }

      document.body.appendChild(wompiForm);
      wompiForm.submit();
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al procesar tu pedido. Por favor intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Mini Header */}
      <header className="py-6 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Volver al catálogo
          </Link>
          <span className="font-serif tracking-widest text-lg font-light">SANDRA GIL</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-stone-200/60 shadow-xs">
            <h2 className="text-xl font-serif font-medium text-stone-900 mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#A68F81]" /> Datos de Envío y Contacto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="nombre" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full p-3 text-sm bg-stone-50 border rounded-sm outline-hidden transition focus:bg-white focus:border-[#A68F81] ${
                    errors.nombre ? 'border-red-400' : 'border-stone-300'
                  }`}
                  placeholder="Ej: Carolina Restrepo"
                />
                {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 text-sm bg-stone-50 border rounded-sm outline-hidden transition focus:bg-white focus:border-[#A68F81] ${
                      errors.email ? 'border-red-400' : 'border-stone-300'
                    }`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center justify-between">
                    Teléfono Celular *
                    <span className="text-[10px] lowercase text-stone-400 font-normal">Requerido por Wompi</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`w-full p-3 text-sm bg-stone-50 border rounded-sm outline-hidden transition focus:bg-white focus:border-[#A68F81] ${
                      errors.telefono ? 'border-red-400' : 'border-stone-300'
                    }`}
                    placeholder="Ej: 3123456789"
                  />
                  {errors.telefono && <p className="text-xs text-red-500 mt-1">{errors.telefono}</p>}
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label htmlFor="ciudadIndex" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center justify-between">
                  Ciudad o Municipio *
                  <span className="text-[10px] text-stone-400 font-normal">Cobertura Bogotá y Alrededores</span>
                </label>
                <select
                  id="ciudadIndex"
                  name="ciudadIndex"
                  value={formData.ciudadIndex}
                  onChange={handleChange}
                  className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-sm outline-hidden transition focus:bg-white focus:border-[#A68F81]"
                >
                  {CITIES.map((city, idx) => (
                    <option key={city.name} value={idx}>
                      {city.name} ({city.value === 'Bogotá' ? 'Bogotá' : 'Municipio Aledaño'} - Envío GRATIS)
                    </option>
                  ))}
                </select>
              </div>

              {/* Shipping Address */}
              <div>
                <label htmlFor="direccion" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Dirección Completa (Calle, Cra, Apto, Casa) *
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={`w-full p-3 text-sm bg-stone-50 border rounded-sm outline-hidden transition focus:bg-white focus:border-[#A68F81] ${
                    errors.direccion ? 'border-red-400' : 'border-stone-300'
                  }`}
                  placeholder="Ej: Calle 127 # 45 - 20, Apto 402"
                />
                {errors.direccion && <p className="text-xs text-red-500 mt-1">{errors.direccion}</p>}
              </div>

              {/* Delivery Notes */}
              <div>
                <label htmlFor="notas" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Notas de Entrega (Opcional)
                </label>
                <textarea
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-sm outline-hidden transition focus:bg-white focus:border-[#A68F81] resize-none"
                  placeholder="Ej: Dejar en portería. Timbrar en el apto 402."
                />
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 mt-6 text-sm uppercase tracking-widest font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-[#A68F81] cursor-not-allowed'
                    : 'bg-[#2C2A29] hover:bg-[#A68F81] shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando orden...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" /> Proceder al pago seguro con Wompi
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-stone-100/60 p-6 sm:p-8 rounded-lg border border-stone-200/50 space-y-6">
            <h2 className="text-lg font-serif font-medium text-stone-900 flex items-center gap-2 pb-4 border-b border-stone-200">
              <ShoppingBag className="w-5 h-5 text-stone-700" /> Resumen del Pedido
            </h2>

            {/* Cart Items */}
            <div className="divide-y divide-stone-200/70 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                  <img
                    src={item.url_imagen}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover bg-stone-200 rounded-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-stone-900 truncate">{item.nombre}</h4>
                    <p className="text-[10px] text-[#A68F81] mt-0.5">{item.aroma}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-stone-500">Cant: {item.cantidad}</span>
                      <span className="text-xs font-semibold text-stone-900">
                        ${(item.precio * item.cantidad).toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-stone-200 space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Productos ({cartCount})</span>
                <span>${cartTotal.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">Envío a {selectedCity.name}</span>
                <span className="font-semibold text-emerald-700">GRATIS</span>
              </div>
              
              <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-stone-900 font-medium">
                <span className="text-base font-serif">Total a Pagar</span>
                <span className="text-lg font-serif font-bold text-[#2C2A29]">
                  ${grandTotal.toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>

            {/* Payment security info */}
            <div className="bg-white p-4 rounded-sm border border-stone-200/50 flex gap-3 items-start font-sans">
              <CreditCard className="w-5 h-5 text-[#A68F81] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-stone-850">Transacción 100% Protegida</p>
                <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">
                  Pago seguro procesado por Wompi (Bancolombia) 🔒. Aceptamos Nequi, PSE y Tarjetas. Tus datos están completamente encriptados.
                </p>
              </div>
            </div>

            {/* Delivery Guarantee Info */}
            <div className="bg-[#F5F2EC] p-4 rounded-sm border border-[#A68F81]/40 flex gap-3 items-start font-sans">
              <span className="text-lg shrink-0">📦</span>
              <div>
                <p className="text-xs font-semibold text-stone-850">Garantía de Entrega Perfecta</p>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Despachos protegidos contra impactos en Bogotá y Sabana 📦. Garantía de entrega perfecta.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
