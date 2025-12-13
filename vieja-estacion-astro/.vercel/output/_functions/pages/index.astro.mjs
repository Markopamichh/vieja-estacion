import { c as createComponent, m as maybeRenderHead, r as renderTemplate, d as createAstro, f as addAttribute, e as renderComponent, a as renderScript } from '../chunks/astro/server_BaJHYhA2.mjs';
import 'piccolore';
import { g as getCollection, $ as $$BaseLayout, a as $$Header, b as $$Footer } from '../chunks/_astro_content_nEwg4M4N.mjs';
import 'clsx';
import { r as restaurantSchema } from '../chunks/schemas_C533pvzS.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="inicio" class="hero"> <h1>Bienvenidos a La Vieja Estación</h1> <p>Un espacio único donde la buena comida se encuentra con la mejor música en vivo</p> </section>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/sections/Hero.astro", void 0);

const $$Astro$2 = createAstro();
const $$MenuItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MenuItem;
  const { name, description, price, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="menu-item"> <div class="menu-item-content"> <img${addAttribute(image, "src")}${addAttribute(name, "alt")} class="menu-item-image" loading="lazy"> <div class="menu-item-details"> <h3>${name}</h3> <p>${description}</p> </div> </div> <span class="menu-item-price">${price}</span> </div>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/ui/MenuItem.astro", void 0);

const $$MenuSection = createComponent(async ($$result, $$props, $$slots) => {
  const allMenuItems = await getCollection("menu");
  const categories = ["Entradas", "Principales", "Para Compartir"];
  return renderTemplate`${maybeRenderHead()}<section id="menu" class="menu-section"> <div class="section-header"> <h2>Nuestro Menú</h2> <p class="subtitle">Sabores que cuentan historias</p> </div> <div class="menu-categories"> ${categories.map((category) => {
    const items = allMenuItems.filter(
      (item) => item.data.category === category && item.data.active
    );
    if (items.length === 0) return null;
    return renderTemplate`<div class="menu-category"> <h3 class="category-title">${category}</h3> <div class="category-items"> ${items.map((item) => renderTemplate`${renderComponent($$result, "MenuItem", $$MenuItem, { ...item.data })}`)} </div> </div>`;
  })} </div> </section>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/sections/MenuSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$EventCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EventCard;
  const { day, band, description, time, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="event-card"> <img${addAttribute(image, "src")}${addAttribute(band, "alt")} class="event-image" loading="lazy"> <h3>${day}</h3> <h4>${band}</h4> <p>${description}</p> <span class="event-time"><i class="far fa-clock"></i> ${time}</span> </div>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/ui/EventCard.astro", void 0);

const $$EventsSection = createComponent(async ($$result, $$props, $$slots) => {
  const allEvents = await getCollection("events");
  const activeEvents = allEvents.filter((event) => event.data.active).sort((a, b) => a.data.eventDate.getTime() - b.data.eventDate.getTime());
  return renderTemplate`${maybeRenderHead()}<section id="musica" class="music-section"> <div class="section-header"> <h2>Música en Vivo</h2> </div> <div class="events-grid"> ${activeEvents.map((event) => renderTemplate`${renderComponent($$result, "EventCard", $$EventCard, { ...event.data })}`)} </div> </section>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/sections/EventsSection.astro", void 0);

const $$HistorySection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="historia" class="history-section"> <div class="section-header"> <h2>Nuestra Historia</h2> <p class="subtitle">Un viaje a través del tiempo</p> </div> <div class="history-content"> <div class="history-text"> <p>En el corazón de la ciudad, La Vieja Estación se ha convertido en un punto de encuentro para quienes buscan buena comida, música en vivo y un ambiente único. Más que un simple bar, es un espacio cultural donde se fusionan los sabores caseros con la pasión por la música, ofreciendo una experiencia diferente cada noche.</p> <p>Con una carta variada que incluye platos tradicionales, picadas ideales para compartir y cervezas artesanales, es el lugar perfecto tanto para una cena tranquila como para disfrutar con amigos. Pero lo que realmente distingue a La Vieja Estación es su escenario abierto a bandas locales y semiprofesionales, dando lugar a nuevos talentos y a la música que nace de la región.</p> <p>Cada semana, el bar se llena de energía con conciertos íntimos, donde el público puede disfrutar de géneros que van desde el rock y el blues hasta el folklore y el jazz. Esto lo convierte en un punto clave para quienes valoran la cultura local y buscan una experiencia auténtica, en un ambiente cálido y cercano.</p> </div> <div class="history-gallery"> <img src="/assets/images/history/historia.webp" alt="Antigua estación de trenes" class="history-image" loading="lazy"> <img src="/assets/images/history/historia2.webp" alt="Proceso de renovación" class="history-image" loading="lazy"> <img src="/assets/images/history/historia3.webp" alt="Vieja Estación en la actualidad" class="history-image" loading="lazy"> <img src="/assets/images/history/historia4.jpg" alt="Vieja Estación en la actualidad" class="history-image" loading="lazy"> <img src="/assets/images/history/historia5.jpg" alt="Vieja Estación en la actualidad" class="history-image" loading="lazy"> </div> </div> </section>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/sections/HistorySection.astro", void 0);

const $$Astro = createAstro();
const $$ReviewCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReviewCard;
  const { stars, text, name, role } = Astro2.props;
  const starsDisplay = "\u2605".repeat(stars);
  return renderTemplate`${maybeRenderHead()}<div class="review-card"> <div class="review-content"> <div class="stars">${starsDisplay}</div> <p>${text}</p> <div class="reviewer"> <div class="reviewer-info"> <h4>${name}</h4> <span>${role}</span> </div> </div> </div> </div>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/ui/ReviewCard.astro", void 0);

const $$ReviewsSection = createComponent(($$result, $$props, $$slots) => {
  const reviews = [
    {
      stars: 5,
      text: "Una experiencia \xFAnica. La combinaci\xF3n de buena m\xFAsica y excelente comida hace de este lugar algo especial. Las costillas BBQ son imperdibles.",
      name: "Mar\xEDa G.",
      role: "Cliente frecuente"
    },
    {
      stars: 5,
      text: "El ambiente es incre\xEDble, especialmente los jueves de m\xFAsica ac\xFAstica. El servicio es excelente y la comida deliciosa. Definitivamente volver\xE9.",
      name: "Juan P.",
      role: "M\xFAsico local"
    },
    {
      stars: 5,
      text: "La decoraci\xF3n del lugar te transporta a otra \xE9poca. Me encanta la historia detr\xE1s del bar y c\xF3mo han mantenido la esencia de la antigua estaci\xF3n.",
      name: "Ana M.",
      role: "Historiadora"
    },
    {
      stars: 5,
      text: "Los eventos de m\xFAsica en vivo son espectaculares. El sonido es perfecto y la selecci\xF3n de bandas es excelente. \xA1El mejor lugar para terminar la semana!",
      name: "Carlos R.",
      role: "Amante de la m\xFAsica"
    },
    {
      stars: 5,
      text: "La tabla de quesos es extraordinaria, y el servicio siempre atento. El ambiente r\xFAstico-moderno crea el equilibrio perfecto para una noche especial.",
      name: "Laura B.",
      role: "Foodie"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="resenas" class="reviews-section"> <div class="section-header"> <h2>Reseñas</h2> <p class="subtitle">Lo que dicen nuestros clientes</p> </div> <div class="reviews-carousel"> <div class="reviews-track" id="reviews-track"> ${reviews.map((review) => renderTemplate`${renderComponent($$result, "ReviewCard", $$ReviewCard, { ...review })}`)} </div> </div> </section>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/sections/ReviewsSection.astro", void 0);

const $$ReservationSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="reservas" class="reservations-section"> <h2>Reserva tu Mesa</h2> <form id="reservation-form" class="reservation-form"> <input type="date" id="date" name="date" required> <input type="time" id="time" name="time" required> <input type="number" id="people" name="people" placeholder="Número de personas" required min="1" max="10"> <input type="text" id="name" name="name" placeholder="Nombre" required> <button type="submit">Reservar por WhatsApp</button> </form> </section>`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/sections/ReservationSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Inicio";
  const pageDescription = "Bar cultural con m\xFAsica en vivo en el coraz\xF3n de la ciudad. Disfruta de buena comida, cervezas artesanales y eventos musicales todas las semanas. Mi\xE9rcoles a Domingo, 18:00 a 02:00.";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle, "description": pageDescription, "schema": restaurantSchema }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "MenuSection", $$MenuSection, {})} ${renderComponent($$result2, "EventsSection", $$EventsSection, {})} ${renderComponent($$result2, "HistorySection", $$HistorySection, {})} ${renderComponent($$result2, "ReviewsSection", $$ReviewsSection, {})} ${renderComponent($$result2, "ReservationSection", $$ReservationSection, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})}  ${renderScript($$result2, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result2, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/index.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result2, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/index.astro?astro&type=script&index=2&lang.ts")} ` })}`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/index.astro", void 0);

const $$file = "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
