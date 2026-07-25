import { prisma } from '@/lib/db';
import { CheckCircle2, XCircle, Clock, MessageSquare, ShoppingBag, Truck, User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface ConfirmationPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export const revalidate = 0; // Dynamic rendering for real-time status check

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId;

  if (!orderId) {
    redirect('/');
  }

  // Fetch order details from database
  const pedido = await prisma.pedido.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          producto: true,
        },
      },
    },
  });

  if (!pedido) {
    redirect('/');
  }

  // Format WhatsApp message link
  const whatsappNumber = '573000000000'; // Default placeholder support number
  const whatsappText = encodeURIComponent(
    `Hola Sandra Gil Velas, acabo de realizar un pedido. Mi ID de orden es: ${pedido.id}. Mi nombre es ${pedido.cliente_nombre}.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  // Helper values
  const isPaid = pedido.estado_pago === 'pagado';
  const isFailed = pedido.estado_pago === 'fallido';
  const isPending = pedido.estado_pago === 'pendiente';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Header */}
      <header className="py-6 border-b border-stone-200 bg-white shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="font-serif tracking-widest text-2xl font-light text-stone-900">
            SANDRA GIL
          </Link>
        </div>
      </header>

      {/* Main container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg border border-stone-200/60 shadow-md p-6 sm:p-10 space-y-8">
          
          {/* Status Header Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-stone-200">
            {isPaid && (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-2" />
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-600">Pago Aprobado</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">¡Gracias por tu compra!</h2>
                <p className="text-sm text-stone-500 mt-2 max-w-md">
                  Hemos confirmado tu pago. Ya estamos preparando tus velas aromáticas artesanales con todo el amor y detalle.
                </p>
              </div>
            )}

            {isFailed && (
              <div className="flex flex-col items-center">
                <XCircle className="w-16 h-16 text-red-500 mb-2" />
                <span className="text-xs uppercase tracking-widest font-semibold text-red-600">Pago Rechazado</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">El pago no se pudo procesar</h2>
                <p className="text-sm text-stone-500 mt-2 max-w-md">
                  Wompi no pudo completar la transacción. Tu pedido ha quedado registrado como pendiente. Puedes intentarlo de nuevo o contactarnos.
                </p>
              </div>
            )}

            {isPending && (
              <div className="flex flex-col items-center">
                <Clock className="w-16 h-16 text-amber-500 mb-2" />
                <span className="text-xs uppercase tracking-widest font-semibold text-amber-600">Pago en Verificación</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">Tu pago está pendiente</h2>
                <p className="text-sm text-stone-500 mt-2 max-w-md">
                  La transacción está siendo procesada por Wompi (Nequi/PSE). En cuanto confirmemos la aprobación, iniciaremos el envío.
                </p>
                {/* Refresh button */}
                <Link
                  href={`/checkout/confirmation?orderId=${pedido.id}`}
                  className="mt-4 px-4 py-2 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-stone-50 hover:text-stone-900 transition"
                >
                  Verificar Estado Nuevamente
                </Link>
              </div>
            )}
          </div>

          {/* Customer & Shipping Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-stone-250/70">
            {/* Delivery Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A68F81] flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Detalles de Envío
              </h3>
              <div className="text-sm text-stone-700 space-y-1 bg-stone-50 p-4 rounded-sm border border-stone-200/40">
                <p className="font-semibold text-stone-900">{pedido.cliente_nombre}</p>
                <p>{pedido.direccion_envio}</p>
                <p className="text-stone-600">{pedido.ciudad}</p>
                {pedido.notas_entrega && (
                  <p className="text-xs text-stone-500 italic mt-2 border-t border-stone-200/60 pt-2">
                    Nota: "{pedido.notas_entrega}"
                  </p>
                )}
              </div>
            </div>

            {/* Contact & Payment Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A68F81] flex items-center gap-1.5">
                <User className="w-4 h-4" /> Datos de Contacto
              </h3>
              <div className="text-sm text-stone-700 space-y-2.5 bg-stone-50 p-4 rounded-sm border border-stone-200/40">
                <div>
                  <span className="text-xs text-stone-400 block">Celular del Cliente</span>
                  <span className="font-medium text-stone-850">{pedido.cliente_telefono}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-400 block">Correo Electrónico</span>
                  <span className="font-medium text-stone-850">{pedido.cliente_email}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-400 block">Referencia del Pedido</span>
                  <span className="font-mono text-xs font-semibold text-stone-900">{pedido.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Pricing */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A68F81] flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Resumen de Compra
            </h3>
            
            <div className="border border-stone-200 rounded-sm overflow-hidden">
              <div className="divide-y divide-stone-150 bg-stone-50/50 p-4 space-y-3">
                {pedido.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm pt-3 first:pt-0">
                    <div className="flex gap-3 items-center">
                      <span className="text-stone-750 font-medium">
                        {item.producto.nombre} <span className="text-xs text-stone-400">({item.producto.aroma})</span>
                      </span>
                      <span className="text-xs text-stone-500 bg-stone-200 px-2 py-0.5 rounded-sm">
                        x{item.cantidad}
                      </span>
                    </div>
                    <span className="font-medium text-stone-850">
                      ${(item.precio_unitario * item.cantidad).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-stone-100/60 p-4 border-t border-stone-200 space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Productos</span>
                  <span>${pedido.total_productos.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de Envío</span>
                  <span className={pedido.costo_envio === 0 ? "font-semibold text-emerald-700" : ""}>
                    {pedido.costo_envio === 0 ? 'GRATIS' : `$${pedido.costo_envio.toLocaleString('es-CO')} COP`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200/80">
                  <span>Total Pagado</span>
                  <span className="text-stone-950">${pedido.total_pagado.toLocaleString('es-CO')} COP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons (WhatsApp & Store) */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-center font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Soporte por WhatsApp
            </a>
            <Link
              href="/"
              className="flex-1 py-3.5 border border-stone-300 hover:border-stone-800 text-stone-700 hover:text-stone-900 text-center font-semibold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center"
            >
              Volver al Catálogo
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
