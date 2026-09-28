import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  RotateCcw, 
  ShieldCheck, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Devoluciones y Garantías | Sandra Gil Velas Artesanales',
  description:
    'Conoce nuestra política de devoluciones, garantías y derecho de retracto conforme a la Ley 1480 de 2011 (Colombia). Condiciones para velas artesanales en cera de soya, reporte de daños en 48 horas y gestión de reembolsos.',
  alternates: {
    canonical: 'https://sandragilvelas.com/legal/politica-de-devoluciones',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const WA_NUMBER = '573175752029';
const WA_DEVOLUCION_LINK = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20deseo%20hacer%20una%20consulta%20sobre%20devoluci%C3%B3n,%20garant%C3%ADa%20o%20derecho%20de%20retracto%20de%20mi%20pedido.`;

export default function PoliticaDevolucionesPage() {
  const currentYear = new Date().getFullYear();

  return (
    <article className="space-y-10 text-stone-700 font-sans not-prose max-w-3xl mx-auto">
      {/* Header Section */}
      <header className="space-y-4 pb-6 border-b border-stone-200">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100/90 text-amber-900 rounded-full text-xs font-semibold tracking-wider uppercase">
          <RotateCcw className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Estatuto del Consumidor · Ley 1480 de 2011</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-light text-stone-900 tracking-tight leading-tight">
          Política de Devoluciones, Garantías y Derecho de Retracto
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
          Última actualización: enero de {currentYear} · Sandra Gil Velas Artesanales · Bogotá D.C., Colombia
        </p>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
          En <strong>Sandra Gil Velas Artesanales</strong> elaboramos cada vela de forma individual, con 100% cera de soya vegetal, flores botánicas preservadas y esencias finas vertidas a mano. Respaldamos la calidad de nuestras creaciones y protegemos tus derechos como consumidor de conformidad con las leyes colombianas.
        </p>
      </header>

      {/* Key Highlights / Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Retracto */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-brand-gold" />
          </div>
          <h2 className="font-serif text-base font-semibold text-stone-900">
            Derecho de Retracto
          </h2>
          <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
            5 días hábiles
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Solicita la devolución de tu dinero dentro de los 5 días hábiles siguientes a la entrega si el producto está intacto y sin encender.
          </p>
        </div>

        {/* Card 2: Transporte */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/20 shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-base font-semibold text-stone-900">
            Daños en Transporte
          </h2>
          <div className="text-xs font-semibold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-md inline-block">
            Reporte en 48 horas
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Reposición gratuita inmediata o reembolso total ante roturas de envase o daños de transporte reportados con fotos/video.
          </p>
        </div>

        {/* Card 3: Garantía */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="font-serif text-base font-semibold text-stone-900">
            Garantía Legal
          </h2>
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
            Ley 1480 de 2011
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Cobertura frente a fallas de formulación, mechas defectuosas o inconsistencias de calidad no imputables al uso indebido.
          </p>
        </div>
      </div>

      {/* Legal Framework Alert */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 text-sm text-stone-800 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-stone-900 text-xs sm:text-sm">
            Naturaleza de los Productos Artesanales
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Nuestras velas son piezas artesanales vertidas una a una con cera de soya 100% natural, aceites aromáticos de alta pureza y flores botánicas secas o preservadas. Las ligeras variaciones en tonalidad de la cera, la disposición exacta de los pétalos o la textura de cristalización (frosting) son sellos auténticos del trabajo botánico manual y no constituyen defectos de calidad.
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        
        {/* Section 1: Derecho de Retracto */}
        <section className="space-y-3.5">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-brand-gold shrink-0" />
            <span>1. Derecho de Retracto (Artículo 47 de la Ley 1480 de 2011)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            De conformidad con el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor de Colombia), en las compras efectuadas mediante comercio electrónico o venta a distancia, el consumidor tiene el derecho de retractarse de la compra y solicitar la devolución íntegra del dinero pagado.
          </p>
          
          <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
              Condiciones Obligatorias para la Validez del Retracto:
            </h3>
            <ul className="text-xs sm:text-sm text-stone-700 space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Plazo legal:</strong> La solicitud debe manifestarse dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha en que el cliente o tercero autorizado reciba el paquete.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Estado del producto:</strong> La vela debe encontrarse totalmente intacta, <strong>sin encender</strong>, con la mecha sin chamuscar, sin aromas ajenos y en perfecto estado comercial.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Empaquetado original:</strong> Debe devolverse con su embalaje primario original (caja de regalo, faja, etiquetas protectoras, amortiguadores y accesorios).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Costos de flete y envío:</strong> De conformidad con el inciso segundo del Art. 47 de la Ley 1480, los costos de transporte y demás que conlleve la devolución del bien hacia nuestro taller en Bogotá D.C. serán <strong>asumidos por el comprador</strong>, salvo que la devolución derive de un defecto de fábrica o rotura en tránsito.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Plazo de reintegro:</strong> Una vez recibido el producto en nuestro taller y verificado su estado conforme a los criterios señalados, se reintegrará la suma total pagada en un término máximo de <strong>treinta (30) días calendario</strong> a través del mismo medio de pago utilizado.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Daños en Transporte */}
        <section className="space-y-3.5 pt-6 border-t border-stone-100">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-gold shrink-0" />
            <span>2. Productos Dañados en Transporte o Defectos al Recibir</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            En Sandra Gil empacamos cada una de nuestras velas en envases de vidrio y cerámica con sistemas de amortiguación reforzada multicapa para envíos nacionales (Servientrega) y entregas locales en Bogotá. No obstante, si el producto sufre algún percance durante el traslado físico:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-2">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide block">
                Plazo para Notificar
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                Debes comunicarte con nosotros dentro de las <strong>48 horas siguientes</strong> a la entrega material del paquete por parte de la transportadora o domiciliario.
              </p>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-2">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide block">
                Evidencia Requerida
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                Envía fotografías nítidas y/o un video corto donde se aprecie la etiqueta de la transportadora, el estado exterior de la caja y el daño del envase o vela.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
              Opciones de Solución para el Cliente (Sin Costo Adicional):
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
              Tras validar la evidencia, el Comprador podrá elegir sin cargo alguno entre:
            </p>
            <ul className="text-xs sm:text-sm text-stone-700 space-y-1.5 list-disc pl-5 font-light">
              <li>
                <strong>Reposición Inmediata:</strong> Elaboración y envío prioritario de una pieza nueva idéntica, con el flete cubierto en su totalidad por Sandra Gil.
              </li>
              <li>
                <strong>Reembolso Total:</strong> Devolución del 100% del valor pagado (producto y envío) procesada de manera ágil a través de nuestra pasarela oficial de pagos <strong>Wompi (Bancolombia)</strong>.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Excepciones */}
        <section className="space-y-3.5 pt-6 border-t border-stone-100">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>3. Excepciones al Derecho de Retracto</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            De conformidad con el numeral 3 y los parágrafos del <strong>Artículo 47 de la Ley 1480 de 2011</strong>, existen excepciones expresas en las que <strong>no opera el derecho de retracto</strong>:
          </p>

          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-2.5">
            <ul className="text-xs sm:text-sm text-stone-700 space-y-2 list-disc pl-5 font-light">
              <li>
                <strong>Velas Bajo Pedido o Personalizadas:</strong> Velas diseñadas con combinaciones de aromas formuladas a medida, mensajes o nombres personalizados impresos en etiquetas, tamaños o recipientes especiales, y recuerdos para eventos (matrimonios, bautizos, corporativos). Al ser confeccionadas conforme a las especificaciones individuales del consumidor, no son susceptibles de reventa habitual y están legalmente exentas del retracto.
              </li>
              <li>
                <strong>Productos Encendidos o Manipulados:</strong> Velas cuya mecha haya sido encendida, recortada o manipulada, o cuyos sellos botánicos hayan sido alterados o expuestos a humedad, contaminantes u olores ajenos.
              </li>
              <li>
                <strong>Solicitudes Extemporáneas:</strong> Reclamaciones de retracto radicadas con posterioridad al vencimiento del término legal de los 5 días hábiles.
              </li>
            </ul>
            <p className="text-xs text-stone-500 italic pt-1 font-light">
              * Nota: La excepción de retracto para velas personalizadas no exime nuestra garantía legal en caso de defectos comprobados de fabricación o roturas en el transporte.
            </p>
          </div>
        </section>

        {/* Section 4: Garantía Legal */}
        <section className="space-y-3.5 pt-6 border-t border-stone-100">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
            <span>4. Garantía Legal de Fabricación (Artículo 7 de la Ley 1480)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Nuestros productos cuentan con garantía legal de conformidad con las directrices de la Superintendencia de Industria y Comercio (SIC):
          </p>

          <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-light">
            <p>
              <strong>¿Qué cubre la garantía de fabricación?</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Defectos estructurales de la mecha (pábilos desprendidos del fondo antes del primer uso o que no mantengan encendido regular por falla de producción).</li>
              <li>Grietas de ensamble preexistentes en el recipiente de vidrio o cerámica no causadas por impactos físicos posteriores a la entrega.</li>
              <li>Defectos severos en la fórmula de la cera que impidan su combustión normal bajo condiciones recomendadas de encendido.</li>
            </ul>

            <p className="pt-2">
              <strong>¿Qué no cubre la garantía?</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Deterioro o derretimiento provocado por exposición a fuentes externas de calor o luz solar directa.</li>
              <li>Accidentes caseros, golpes, caídas o manipulación inadecuada posterior a la entrega.</li>
              <li>Hollín o quemado irregular derivado de no recortar la mecha a 5 mm antes de encender, dejar la vela expuesta a corrientes de aire fuertes o exceder el tiempo continuo de quemado sugerido (máximo 3-4 horas continuas).</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Procedimiento Paso a Paso */}
        <section className="space-y-3.5 pt-6 border-t border-stone-100">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-gold shrink-0" />
            <span>5. Procedimiento de Solicitud y Canal de Contacto</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Para iniciar cualquier trámite de retracto, reporte de daño en transporte o garantía legal, sigue estos sencillos pasos:
          </p>

          <ol className="text-xs sm:text-sm space-y-3 list-decimal pl-5 text-stone-700 font-light">
            <li>
              <strong>Contacto directo vía WhatsApp:</strong> Comunícate con nuestra línea de atención directa al cliente al{' '}
              <a
                href={WA_DEVOLUCION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>+57 317 575 2029</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
            <li>
              <strong>Información requerida:</strong>
              <div className="mt-1.5 bg-stone-50 border border-stone-200/80 rounded-lg p-3 space-y-1 text-xs">
                <p>• <strong>Número de Pedido / Referencia Wompi:</strong> Código emitido al confirmar la compra.</p>
                <p>• <strong>Nombre completo y cédula:</strong> Datos con los que se registró el pedido.</p>
                <p>• <strong>Motivo de la solicitud:</strong> Retracto, daño en transporte o reclamación de garantía.</p>
                <p>• <strong>Evidencia audiovisual:</strong> Fotografías o video claro del producto y embalaje.</p>
              </div>
            </li>
            <li>
              <strong>Tiempo de respuesta:</strong> Nuestro equipo responderá en un plazo máximo de <strong>48 horas hábiles</strong> con el diagnóstico, autorización y las instrucciones detalladas de retorno o reposición.
            </li>
            <li>
              <strong>Coordinación logística:</strong> Para casos de retracto, te suministraremos los datos de dirección en Bogotá D.C. para que realices el despacho del paquete con la transportadora de tu preferencia.
            </li>
          </ol>
        </section>

        {/* Section 6: Reembolsos vía Wompi */}
        <section className="space-y-3.5 pt-6 border-t border-stone-100">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-gold shrink-0" />
            <span>6. Reembolsos y Reversión del Pago (Wompi)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            En caso de proceder el reembolso (por retracto, garantía o daño comprobado en transporte), los fondos se reintegrarán conforme al <strong>Decreto 587 de 2016</strong> y los estándares de nuestra pasarela de pagos <strong>Wompi by Bancolombia</strong>:
          </p>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-1.5 list-disc pl-5 font-light">
            <li><strong>Tarjetas de Crédito / Débito:</strong> La reversión se tramita con la entidad emisora del comprador. El tiempo de reflejo en el extracto depende del banco emisor (habitualmente entre 5 y 15 días hábiles).</li>
            <li><strong>Nequi / Daviplata / PSE:</strong> Se gestionará la transferencia o reverso de fondos a la cuenta origen del comprador en los plazos estipulados por el sistema financiero.</li>
          </ul>
        </section>

        {/* Section 7: Ente de Control */}
        <section className="space-y-3.5 pt-6 border-t border-stone-100">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-gold shrink-0" />
            <span>7. Protección al Consumidor y Autoridad Competente</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Sandra Gil Velas Artesanales opera bajo estricto apego a las disposiciones de la legislación colombiana. Para conocer a fondo tus derechos y deberes como consumidor, o en caso de requerir orientación oficial, puedes acudir a la <strong>Superintendencia de Industria y Comercio (SIC)</strong> en su portal oficial:{' '}
            <a
              href="https://www.sic.gov.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>www.sic.gov.co</span>
              <ExternalLink className="w-3 h-3" />
            </a>.
          </p>
        </section>
      </div>

      {/* CTA Box WhatsApp Direct */}
      <div className="bg-[#2C2A29] text-[#FAF8F5] p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm border border-stone-800">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-serif text-brand-gold">
            ¿Necesitas ayuda con un pedido o tienes dudas sobre tu devolución?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
            Escríbenos directamente por WhatsApp. Te brindamos atención personalizada de lunes a sábado de 8:00 a.m. a 6:00 p.m. (hora Colombia).
          </p>
        </div>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={WA_DEVOLUCION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-xs"
          >
            <span>Iniciar Solicitud por WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/preguntas-frecuentes"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition"
          >
            <span>Preguntas Frecuentes</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
