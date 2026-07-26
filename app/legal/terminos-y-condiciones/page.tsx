import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Sandra Gil Velas Artesanales',
  description: 'Términos y condiciones de compra de Sandra Gil Velas Artesanales. Cumplimiento Ley 1480 (Estatuto del Consumidor Colombia).',
};

export default function TerminosCondicionesPage() {
  const year = new Date().getFullYear();
  return (
    <article className="space-y-8 text-stone-700 font-sans">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-light text-stone-900">Términos y Condiciones de Compra</h2>
        <p className="text-xs text-stone-400">Última actualización: enero de {year} · Cumplimiento Ley 1480 de 2011 (Estatuto del Consumidor)</p>
      </header>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
        <strong>Nota:</strong> Estos términos se rigen por la Ley 1480 de 2011 (Estatuto del Consumidor de Colombia) 
        y sus normas complementarias.
      </div>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">1. Identificación del Vendedor</h3>
        <ul className="text-sm space-y-1.5 list-none pl-0">
          <li><strong>Nombre comercial:</strong> Sandra Gil Velas Artesanales</li>
          <li><strong>Titular:</strong> Sandra Gil</li>
          <li><strong>Ciudad:</strong> Bogotá D.C., Colombia</li>
          <li><strong>Contacto:</strong> +57 317 575 2029 (WhatsApp)</li>
          <li><strong>Productos:</strong> Velas artesanales decorativas y aromáticas elaboradas a mano</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">2. Objeto del Contrato</h3>
        <p className="text-sm leading-relaxed">
          Los presentes Términos y Condiciones regulan la relación contractual entre Sandra Gil Velas Artesanales 
          (en adelante "el Vendedor") y los consumidores que realizan compras a través del sitio web (en adelante "el Comprador"), 
          de conformidad con lo establecido en la Ley 1480 de 2011 y el Decreto 1499 de 2014.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">3. Proceso de Compra</h3>
        <p className="text-sm leading-relaxed">El proceso de compra se realiza de la siguiente manera:</p>
        <ol className="text-sm space-y-2 list-decimal pl-5">
          <li>El Comprador selecciona el/los producto(s) deseado(s) y los agrega al carrito.</li>
          <li>Completa el formulario de datos de envío y contacto.</li>
          <li>Realiza el pago a través de la pasarela Wompi (Bancolombia), que acepta tarjetas de crédito/débito, Nequi y PSE.</li>
          <li>Recibe confirmación del pedido por correo electrónico.</li>
          <li>El pedido es preparado y despachado en el plazo indicado.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">4. Precios y Forma de Pago</h3>
        <p className="text-sm leading-relaxed">
          Todos los precios están expresados en Pesos Colombianos (COP) e incluyen los impuestos aplicables. 
          El Vendedor se reserva el derecho de modificar los precios en cualquier momento, 
          aunque los pedidos ya confirmados no se verán afectados por dichos cambios.
        </p>
        <p className="text-sm leading-relaxed">
          El pago se procesa de forma segura a través de <strong>Wompi by Bancolombia</strong>, 
          una plataforma certificada PCI DSS. Sandra Gil no almacena información de tarjetas de crédito.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">5. Envío y Entrega</h3>
        <p className="text-sm leading-relaxed">
          El envío es <strong>GRATUITO</strong> para todos los pedidos con destino a Bogotá D.C. y municipios aledaños 
          (Chía, Cajicá, Cota, La Calera, Sopó, Soacha, Zipaquirá). 
          Los tiempos de entrega estimados son de 1 a 3 días hábiles desde la confirmación del pago.
        </p>
        <p className="text-sm leading-relaxed">
          Los productos se despachan con empaque reforzado para garantizar la entrega en perfecto estado. 
          En caso de daño durante el transporte, el Comprador debe notificarlo dentro de las 24 horas siguientes a la recepción.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">6. Derecho de Retracto (Artículo 47 Ley 1480)</h3>
        <p className="text-sm leading-relaxed">
          De conformidad con el artículo 47 de la Ley 1480 de 2011, el Comprador tiene derecho a retractarse de la compra 
          dentro de los <strong>5 días hábiles</strong> siguientes a la entrega del producto, siempre que:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li>El producto no haya sido usado ni abierto.</li>
          <li>Conserve su empaque y etiquetas originales.</li>
          <li>El Comprador asuma los costos de devolución.</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          Para ejercer el derecho de retracto, contacte a Sandra Gil por WhatsApp al +57 317 575 2029.
        </p>
        <p className="text-sm leading-relaxed">
          <strong>Excepción:</strong> Las velas elaboradas bajo pedido (personalizadas) no tienen derecho a retracto 
          al tratarse de productos confeccionados según las especificaciones del consumidor (Art. 47, parágrafo, Ley 1480).
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">7. Garantía Legal (Artículo 7 Ley 1480)</h3>
        <p className="text-sm leading-relaxed">
          Todos los productos cuentan con garantía legal de <strong>1 (un) año</strong> contra defectos de fabricación, 
          de conformidad con el artículo 7 de la Ley 1480 de 2011. La garantía no cubre:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li>Daños causados por mal uso o negligencia del Comprador.</li>
          <li>Deterioro natural propio de las velas decorativas (decoloración natural por luz solar directa).</li>
          <li>Daños causados por no seguir las instrucciones de cuidado.</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          Para reclamaciones de garantía, contacte a Sandra Gil por WhatsApp al +57 317 575 2029 
          con fotografías del producto defectuoso.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">8. Responsabilidad del Vendedor</h3>
        <p className="text-sm leading-relaxed">
          El Vendedor no será responsable de daños o perjuicios causados por el uso incorrecto de los productos. 
          Los productos son artículos decorativos y de aromaterapia; deben manejarse con las precauciones indicadas 
          en el embalaje y en la sección de cuidados del producto.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">9. Velas Bajo Pedido (Personalizadas)</h3>
        <p className="text-sm leading-relaxed">
          Los productos catalogados como "Elaboración Bajo Pedido" son elaborados específicamente para el Comprador. 
          El precio, el tiempo de producción y las especificaciones se acuerdan directamente por WhatsApp antes de iniciar la producción. 
          Una vez confirmado el pedido y recibido el anticipo (si aplica), no es posible cancelar el pedido.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">10. Protección de Datos Personales</h3>
        <p className="text-sm leading-relaxed">
          El tratamiento de datos personales de los compradores se realiza conforme a la 
          <a href="/legal/politica-de-privacidad" className="text-brand-gold hover:underline ml-1">Política de Privacidad</a> 
          {' '}de Sandra Gil Velas Artesanales y a la Ley 1581 de 2012.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">11. Resolución de Conflictos</h3>
        <p className="text-sm leading-relaxed">
          En caso de controversia, el Comprador puede recurrir a la 
          <strong> Superintendencia de Industria y Comercio (SIC)</strong> a través de su línea de atención 
          o en <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">www.sic.gov.co</a>. 
          Los presentes Términos se rigen por la legislación colombiana vigente y cualquier disputa 
          será dirimida por los tribunales competentes de la ciudad de Bogotá D.C.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">12. Modificaciones</h3>
        <p className="text-sm leading-relaxed">
          Sandra Gil se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. 
          Los cambios entrarán en vigencia desde el momento de su publicación en el Sitio. 
          La continuación del uso del Sitio o la realización de compras implicará la aceptación de las nuevas condiciones.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">13. Contacto</h3>
        <p className="text-sm leading-relaxed">
          Para cualquier consulta, reclamación o ejercicio de derechos como consumidor, puede contactar a Sandra Gil:
        </p>
        <ul className="text-sm space-y-1 list-none pl-0">
          <li><strong>WhatsApp:</strong> +57 317 575 2029</li>
          <li><strong>Horario de atención:</strong> Lunes a sábado, 8:00 a.m. – 6:00 p.m. (hora Colombia)</li>
          <li><strong>Ciudad:</strong> Bogotá D.C., Colombia</li>
        </ul>
      </section>
    </article>
  );
}
