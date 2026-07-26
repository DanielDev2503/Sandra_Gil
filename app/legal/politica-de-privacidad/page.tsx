import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Sandra Gil Velas Artesanales',
  description: 'Política de privacidad y tratamiento de datos personales de Sandra Gil Velas. Cumplimiento Ley 1581 de 2012 (Colombia).',
};

export default function PoliticaPrivacidadPage() {
  const year = new Date().getFullYear();
  return (
    <article className="space-y-8 text-stone-700 font-sans">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-light text-stone-900">Política de Privacidad y Tratamiento de Datos Personales</h2>
        <p className="text-xs text-stone-400">Última actualización: enero de {year} · Cumplimiento Ley 1581 de 2012</p>
      </header>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
        <strong>Nota:</strong> Esta política cumple con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013, 
        sobre Protección de Datos Personales en Colombia, y la Resolución 1074 de 2022 de la SIC.
      </div>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">1. Responsable del Tratamiento</h3>
        <ul className="text-sm space-y-1.5 list-none pl-0">
          <li><strong>Nombre:</strong> Sandra Gil</li>
          <li><strong>Actividad:</strong> Elaboración y comercialización de velas artesanales</li>
          <li><strong>Ciudad:</strong> Bogotá D.C., Colombia</li>
          <li><strong>Contacto:</strong> +57 317 575 2029 (WhatsApp)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">2. Datos Personales Recopilados</h3>
        <p className="text-sm leading-relaxed">
          Al realizar una compra o ponerse en contacto con nosotros, podemos recopilar los siguientes datos personales:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono celular</li>
          <li>Dirección de envío (ciudad, municipio, dirección)</li>
          <li>Información de pago (procesada de forma segura por Wompi/Bancolombia; no almacenamos datos de tarjetas)</li>
          <li>Historial de pedidos</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">3. Finalidades del Tratamiento</h3>
        <p className="text-sm leading-relaxed">Sus datos personales serán utilizados para:</p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li>Procesar y gestionar sus pedidos de compra</li>
          <li>Coordinar el despacho y entrega de productos</li>
          <li>Enviar confirmaciones de pedido y actualizaciones de estado</li>
          <li>Atender solicitudes de soporte y servicio al cliente</li>
          <li>Cumplir con obligaciones legales y fiscales</li>
          <li>Con su consentimiento expreso: enviar comunicaciones comerciales y novedades de nuevos productos</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">4. Base Legal del Tratamiento</h3>
        <p className="text-sm leading-relaxed">
          El tratamiento de sus datos personales se fundamenta en:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li><strong>Ejecución de un contrato:</strong> Para procesar y gestionar sus pedidos.</li>
          <li><strong>Obligación legal:</strong> Para el cumplimiento de normativas tributarias y contables colombianas.</li>
          <li><strong>Consentimiento:</strong> Para el envío de comunicaciones comerciales, que puede revocar en cualquier momento.</li>
          <li><strong>Interés legítimo:</strong> Para la prevención del fraude y la mejora de nuestros servicios.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">5. Conservación de Datos</h3>
        <p className="text-sm leading-relaxed">
          Sus datos serán conservados durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados 
          y, en cualquier caso, durante el plazo que exija la legislación colombiana aplicable (mínimo 5 años para datos contables y fiscales). 
          Los datos de comunicaciones comerciales se eliminarán cuando usted retire su consentimiento.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">6. Derechos del Titular de los Datos (Artículo 8 Ley 1581)</h3>
        <p className="text-sm leading-relaxed">Como titular de sus datos personales, usted tiene derecho a:</p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li><strong>Conocer (Acceso):</strong> Conocer los datos que tenemos sobre usted y cómo los tratamos.</li>
          <li><strong>Actualización:</strong> Solicitar la actualización de sus datos cuando sean inexactos.</li>
          <li><strong>Rectificación:</strong> Solicitar la corrección de datos incompletos o erróneos.</li>
          <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando no sean necesarios para la finalidad original.</li>
          <li><strong>Revocación del consentimiento:</strong> Revocar la autorización para el tratamiento de sus datos, sin efecto retroactivo.</li>
          <li><strong>Quejas:</strong> Presentar reclamaciones ante la Superintendencia de Industria y Comercio (SIC).</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          Para ejercer sus derechos, contacte a Sandra Gil por WhatsApp al +57 317 575 2029.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">7. Transferencias de Datos a Terceros</h3>
        <p className="text-sm leading-relaxed">
          Sus datos podrán ser compartidos únicamente con:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li><strong>Wompi (Bancolombia):</strong> Para el procesamiento seguro de pagos.</li>
          <li><strong>Operadores logísticos:</strong> Para la coordinación de envíos y entregas.</li>
          <li><strong>Supabase:</strong> Proveedor de base de datos que almacena pedidos de forma segura.</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          No vendemos, alquilamos ni compartimos sus datos con terceros para fines comerciales propios.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">8. Seguridad de los Datos</h3>
        <p className="text-sm leading-relaxed">
          Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos personales contra el acceso no autorizado, 
          la pérdida, la destrucción o la divulgación accidental, de conformidad con los estándares de la industria y la Ley 1581 de 2012.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">9. Contacto y Autoridad de Control</h3>
        <p className="text-sm leading-relaxed">
          Para cualquier consulta o ejercicio de derechos: <strong>+57 317 575 2029</strong> (WhatsApp).
        </p>
        <p className="text-sm leading-relaxed">
          Si considera que sus derechos no han sido atendidos satisfactoriamente, puede contactar a la 
          <strong> Superintendencia de Industria y Comercio (SIC)</strong> en <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">www.sic.gov.co</a>.
        </p>
      </section>
    </article>
  );
}
