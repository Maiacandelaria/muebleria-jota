(() => {
  const mensajeFooter = 'Piezas artesanales que honran el pasado y abrazan el futuro.';
  const declaracionCentral = 'Hermanos Jota es el redescubrimiento de un arte olvidado: crear muebles que no solo sirven una función, sino que alimentan el alma. Existimos en la intersección entre herencia e innovación, donde la calidez del optimismo de los años 60 se encuentra con la conciencia de la sustentabilidad del 2026. Cada pieza cuenta una historia de artesanía que honra el pasado mientras abraza el futuro.';

  function aplicarDeclaracion(selector) {
    document.querySelectorAll(selector).forEach((elemento) => {
      elemento.textContent = declaracionCentral;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    aplicarTexto('.footer-desc', mensajeFooter);
    agregarInstagramFooter();
    aplicarTexto('.home-hero .hero-content p', 'Una sensación de calidez y nostalgia te envuelve: como descubrir un tesoro familiar en perfectas condiciones, hecho para acompañar tu historia.');
    aplicarTexto('.encabezado-catalogo > p', 'Descubrí materiales sustentables, diseño atemporal y la historia de cada pieza; más que mobiliario, una filosofía de vida.');
    aplicarTexto('.contacto-hero__texto', 'Hablemos como asesores de confianza y compañeros entusiastas del diseño bello y funcional: con calidez, experiencia y respeto por tu historia.');
    aplicarTexto('.brand-manifesto-banner .manifesto-text', 'Vivir con Hermanos Jota se vuelve parte de tu ritual diario. Cada pieza envejece con gracia, desarrolla carácter y conserva su belleza esencial: una inversión en legado.');
    insertarViajeEmocional();
    insertarTeaserLongevidad();
  });

  function aplicarTexto(selector, texto) {
    document.querySelectorAll(selector).forEach((elemento) => {
      elemento.textContent = texto;
    });
  }

  function agregarInstagramFooter() {
    document.querySelectorAll('.footer-contact-info').forEach((info) => {
      if (info.querySelector('[data-instagram]')) return;
      const instagram = document.createElement('p');
      instagram.dataset.instagram = 'true';
      instagram.innerHTML = '<strong>Instagram:</strong> <a href="https://www.instagram.com/muebleria_hnos_jota/" target="_blank" rel="noopener noreferrer">@muebleria_hnos_jota</a>';
      info.appendChild(instagram);
    });
  }

  function insertarViajeEmocional() {
    const historia = document.querySelector('.history-section');
    if (!historia || document.querySelector('.emotional-journey')) return;

    historia.insertAdjacentHTML('afterend', `
      <section class="emotional-journey home-container" aria-labelledby="journey-title">
        <div class="emotional-journey__intro">
          <span class="section-eyebrow">Viaje emocional</span>
          <h2 id="journey-title">Piezas que acompañan tu vida</h2>
          <p>Una experiencia cálida, conocedora y accesible: tradición e innovación al servicio de hogares con historia.</p>
        </div>
        <div class="journey-grid">
          <article class="journey-card"><span class="journey-card__step">Primera impresión</span><h3>Calidez con intención</h3><p>La calidad se reconoce de inmediato, como encontrar un tesoro familiar conservado con cariño.</p></article>
          <article class="journey-card"><span class="journey-card__step">Conexión profunda</span><h3>Detalles que cuentan</h3><p>Materiales sustentables, líneas atemporales y manos expertas revelan una filosofía detrás de cada pieza.</p></article>
          <article class="journey-card"><span class="journey-card__step">Impacto duradero</span><h3>Un legado cotidiano</h3><p>Con el tiempo, cada mueble gana carácter y se convierte en parte de tus rituales y tus recuerdos.</p></article>
        </div>
      </section>
    `);
  }

  function insertarTeaserLongevidad() {
    const journey = document.querySelector('.emotional-journey');
    if (!journey || document.querySelector('.longevity-teaser')) return;
    journey.insertAdjacentHTML('afterend', `
      <section class="longevity-teaser" aria-labelledby="longevity-title"><div class="home-container longevity-teaser__content"><div><span class="section-eyebrow">Compromiso de longevidad</span><h2 id="longevity-title">Programa Herencia Viva</h2><p>Garantía extendida, restauración, taller de cuidados, recompra garantizada y trazabilidad para que cada pieza conserve su historia.</p></div><a class="home-button" href="./templates/productos.html">Conocé la colección</a></div></section>
    `);
  }
})();
