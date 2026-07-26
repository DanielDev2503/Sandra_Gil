import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal | Sandra Gil Velas Artesanales',
  description: 'Aviso legal de Sandra Gil Velas Artesanales. Información sobre el titular del sitio web y condiciones de uso.',
};

export default function AvisoLegalPage() {
  const year = new Date().getFullYear();
  return (
    <article className="space-y-8 text-stone-700 font-sans">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-light text-stone-900">Aviso Legal</h2>
        <p className="text-xs text-stone-400">Última actualización: enero de {year}</p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">1. Identificación del Titular</h3>
        <p className="text-sm leading-relaxed">
          En cumplimiento con el deber de información recogido en la normativa colombiana aplicable, se informa que el presente sitio web es titularidad de:
        </p>
        <ul className="text-sm space-y-1.5 list-none pl-0">
          <li><strong>Nombre:</strong> Sandra Gil</li>
          <li><strong>Actividad:</strong> Elaboración y venta de velas artesanales decorativas y aromáticas</li>
          <li><strong>Ciudad:</strong> Bogotá D.C., Colombia</li>
          <li><strong>Correo electrónico de contacto:</strong> Disponible vía WhatsApp (+57 317 575 2029)</li>
          <li><strong>Sitio web:</strong> Sandra Gil Velas Artesanales</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">2. Objeto y Ámbito de Aplicación</h3>
        <p className="text-sm leading-relaxed">
          El presente Aviso Legal regula el acceso y el uso del sitio web de Sandra Gil Velas Artesanales (en adelante, "el Sitio"), 
          así como los servicios de venta en línea de productos artesanales que se ofrecen a través del mismo. 
          El acceso al Sitio implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">3. Propiedad Intelectual</h3>
        <p className="text-sm leading-relaxed">
          Todos los contenidos del Sitio, incluyendo textos, fotografías, logotipos, diseños gráficos, imágenes y demás elementos, 
          son propiedad de Sandra Gil o de terceros que han autorizado su uso. Queda expresamente prohibida la reproducción, 
          distribución, comunicación pública y transformación de dichos contenidos sin la autorización expresa y por escrito de la titular.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">4. Responsabilidad</h3>
        <p className="text-sm leading-relaxed">
          Sandra Gil no se hace responsable de los daños y perjuicios que puedan derivarse de interferencias, interrupciones, 
          virus informáticos o desconexiones en el funcionamiento operativo del sistema telemático, motivadas por causas ajenas a su control.
        </p>
        <p className="text-sm leading-relaxed">
          Asimismo, la titular se reserva el derecho de modificar, suspender, cancelar o restringir el contenido del Sitio, 
          sin necesidad de previo aviso.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">5. Legislación Aplicable y Jurisdicción</h3>
        <p className="text-sm leading-relaxed">
          El presente Aviso Legal se rige e interpreta conforme a la legislación colombiana vigente. 
          Para la resolución de cualquier controversia derivada del acceso o uso del Sitio, las partes se someten 
          a los jueces y tribunales competentes de la ciudad de Bogotá D.C., Colombia.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">6. Contacto</h3>
        <p className="text-sm leading-relaxed">
          Para cualquier consulta relacionada con el presente Aviso Legal, puede contactarnos a través de 
          WhatsApp al número <strong>+57 317 575 2029</strong>.
        </p>
      </section>
    </article>
  );
}
