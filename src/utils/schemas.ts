// Schema.org Structured Data for SEO

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Vieja Estación",
  "description": "Bar cultural con música en vivo, comida artesanal y eventos semanales",
  "image": "https://viejaestacion.com/assets/images/hero/heroimg.webp",
  "url": "https://viejaestacion.com",
  "telephone": "+542994051816",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Gral. Belgrano 195",
    "addressLocality": "Centenario",
    "addressRegion": "Neuquén",
    "postalCode": "Q8309",
    "addressCountry": "AR"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Wednesday", "Thursday", "Sunday"],
      "opens": "19:00",
      "closes": "01:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Friday", "Saturday"],
      "opens": "19:00",
      "closes": "04:00"
    }
  ],
  "servesCuisine": "Cocina casera, Picadas, Hamburguesas",
  "priceRange": "$$",
  "menu": "https://menu.fu.do/viejaestacion/qr-menu",
  "sameAs": [
    "https://www.facebook.com/barculturalVIEJAESTACION",
    "https://www.instagram.com/laviejabarcultural/"
  ],
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://wa.me/542994051816?text={reservation_query}",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": {
      "@type": "Reservation",
      "name": "Reserva en Vieja Estación"
    }
  }
};

export interface EventData {
  day: string;
  band: string;
  description: string;
  time: string;
  eventDate: Date;
}

export const createEventSchema = (event: EventData) => ({
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  "name": `${event.band} en Vieja Estación`,
  "description": event.description,
  "startDate": event.eventDate.toISOString(),
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Vieja Estación",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dirección del Bar", // TODO: Actualizar
      "addressLocality": "Ciudad", // TODO: Actualizar
      "addressCountry": "AR"
    }
  },
  "performer": {
    "@type": "MusicGroup",
    "name": event.band
  },
  "organizer": {
    "@type": "Organization",
    "name": "Vieja Estación",
    "url": "https://viejaestacion.com"
  }
});

export interface BlogPostData {
  title: string;
  description: string;
  pubDate: Date;
  heroImage: string;
  author: string;
}

export const createArticleSchema = (post: BlogPostData) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "image": post.heroImage,
  "datePublished": post.pubDate.toISOString(),
  "author": {
    "@type": "Organization",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Vieja Estación",
    "logo": {
      "@type": "ImageObject",
      "url": "https://viejaestacion.com/assets/images/logo/imglogo.jpg"
    }
  }
});
