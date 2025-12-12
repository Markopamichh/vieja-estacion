# Vieja Estación - Sitio Web con Astro

Migración del sitio web de "Vieja Estación" a Astro con CMS integrado para mejor SEO, rendimiento y gestión de contenido.

## 🚀 Características

- ✅ Framework: **Astro 4.x** (Static Site Generation)
- ✅ TypeScript estricto
- ✅ **SEO completo** con meta tags, Open Graph, Twitter Cards
- ✅ **Structured Data** (Schema.org) para mejor posicionamiento
- ✅ **Content Collections** para gestión de menú y eventos
- ✅ **Decap CMS** para administrar contenido sin código
- ✅ **Blog integrado** para noticias y novedades
- ✅ CSS consolidado y optimizado (eliminados duplicados)
- ✅ Scripts client-side para interactividad (menú móvil, carrusel, WhatsApp)
- ✅ Responsive design preservado 100%
- ✅ Sitemap automático

## 📁 Estructura del Proyecto

```
vieja-estacion-astro/
├── public/
│   ├── admin/                    # Panel CMS (acceder en /admin)
│   ├── assets/images/            # Imágenes optimizadas
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/               # Header, Footer, Navigation
│   │   ├── sections/             # Secciones de la página
│   │   └── ui/                   # Componentes reutilizables
│   ├── content/
│   │   ├── menu/                 # Items del menú (JSON)
│   │   ├── events/               # Eventos musicales (Markdown)
│   │   └── blog/                 # Posts del blog (Markdown)
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout principal con SEO
│   ├── pages/
│   │   ├── index.astro           # Página principal
│   │   └── blog/                 # Páginas del blog
│   ├── scripts/                  # JavaScript client-side
│   ├── styles/                   # CSS global y variables
│   └── utils/                    # Utilidades (schemas, etc.)
└── astro.config.mjs
```

## 🛠️ Instalación y Ejecución

### Requisitos previos
- Node.js 18+
- npm o yarn

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# El sitio estará disponible en http://localhost:4321/

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Verificar tipos de TypeScript
npm run astro check
```

## 📝 Gestión de Contenido

### Acceder al CMS
1. Iniciar el servidor de desarrollo: `npm run dev`
2. Ir a `http://localhost:4321/admin`
3. Configurar autenticación según el servicio de hosting

### Editar contenido manualmente

**Menú:**
- Archivos JSON en `src/content/menu/`
- Cada item es un archivo separado
- Formato:
```json
{
  "category": "Entradas | Principales | Para Compartir",
  "name": "Nombre del plato",
  "description": "Descripción",
  "price": "$XXXX",
  "image": "/assets/images/menu/imagen.jpg",
  "active": true
}
```

**Eventos:**
- Archivos Markdown en `src/content/events/`
- Formato:
```markdown
---
day: "Día de la semana"
band: "Nombre de la banda"
description: "Descripción del evento"
time: "21:00"
image: "/assets/images/events/imagen.jpeg"
eventDate: 2025-12-15T21:00:00
active: true
---

Contenido adicional del evento...
```

**Blog:**
- Archivos Markdown en `src/content/blog/`
- Crear nuevos posts siguiendo el formato de ejemplo

## 🎨 Estilos

Los estilos están consolidados en:
- `src/styles/variables.css` - Variables CSS (colores, etc.)
- `src/styles/global.css` - Estilos globales (sin duplicados del sitio original)

## 🔧 Configuración

### Variables de entorno
Crear archivo `.env` con:
```env
PUBLIC_SITE_URL=https://tudominio.com
PUBLIC_WHATSAPP_PHONE=542996120756
PUBLIC_FACEBOOK_URL=https://www.facebook.com/barculturalVIEJAESTACION
PUBLIC_INSTAGRAM_URL=https://www.instagram.com/laviejabarcultural/
```

### Actualizar información del restaurante
Editar `src/utils/schemas.ts` para actualizar:
- Dirección física
- Ciudad y código postal
- Horarios de apertura

## 📦 Deployment

El sitio está configurado para ser desplegado en cualquier servicio que soporte sitios estáticos.

### Opciones recomendadas:
- **Vercel** (configuración incluida en astro.config.mjs)
- **Netlify** (compatible con Decap CMS)
- **Cloudflare Pages**
- **GitHub Pages**

### Build para producción:
```bash
npm run build
```
Los archivos compilados estarán en `/dist`

## ✨ Mejoras vs. Sitio Original

1. **SEO:**
   - Meta tags completos (Open Graph, Twitter Cards)
   - Structured Data (Schema.org)
   - Sitemap automático
   - URLs canónicas

2. **Performance:**
   - CSS consolidado (eliminados duplicados)
   - Imágenes organizadas por categoría
   - Build optimizado por Astro
   - Scripts solo donde son necesarios

3. **Mantenibilidad:**
   - Componentes reutilizables
   - Content Collections para datos
   - TypeScript para type safety
   - Código organizado y documentado

4. **Funcionalidades nuevas:**
   - CMS para gestionar contenido
   - Blog/noticias integrado
   - Mejor organización de assets

## 📄 Páginas

- `/` - Página principal
- `/blog` - Listado de posts del blog
- `/blog/[slug]` - Post individual
- `/admin` - Panel de administración CMS

## 🤝 Soporte

Para más información sobre Astro: [docs.astro.build](https://docs.astro.build)
Para Decap CMS: [decapcms.org](https://decapcms.org/)

## 📋 TODO

- [ ] Optimizar imágenes grandes (comprimir historia4.jpg e imghistoria2.jpg)
- [ ] Configurar autenticación del CMS según hosting elegido
- [ ] Actualizar dirección física en schemas.ts
- [ ] Configurar dominio personalizado
- [ ] Enviar sitemap a Google Search Console
# viejaestacion
