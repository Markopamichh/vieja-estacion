# Sistema de Creación de Posts del Blog

## Descripción
Este sistema permite crear posts del blog directamente desde la página `/blog` sin necesidad de usar Decap CMS.

## Características
- ✅ Autenticación con contraseña
- ✅ Subida de imágenes
- ✅ Editor de Markdown
- ✅ Preview de imágenes
- ✅ Validación de formulario
- ✅ Generación automática de slugs
- ✅ Control de publicación (publicar o guardar como borrador)

## Cómo Usar

### 1. Acceder al Formulario
1. Navega a `http://localhost:4322/blog` (o tu URL de producción)
2. Haz clic en el botón **"+ Nuevo Post"** en la esquina superior derecha
3. Se abrirá un modal con el formulario

### 2. Completar el Formulario
El formulario incluye los siguientes campos:

- **Contraseña** *: Ingresa la contraseña configurada (por defecto: `admin123`)
- **Título** *: Entre 5 y 100 caracteres
- **Descripción** *: Entre 20 y 500 caracteres (aparece en las tarjetas de preview)
- **Contenido** *: Mínimo 50 caracteres. Puedes usar Markdown:
  ```markdown
  # Título Principal
  ## Subtítulo
  **Negrita** *cursiva*

  - Item 1
  - Item 2

  [Link](https://example.com)
  ```
- **Imagen Destacada** *: JPG, PNG, WEBP o GIF (máximo 5MB)
- **Fecha de Publicación** *: Por defecto es la fecha/hora actual
- **Publicado**: Marca esta casilla para publicar inmediatamente, o déjala sin marcar para guardar como borrador

### 3. Crear el Post
1. Completa todos los campos requeridos (*)
2. Haz clic en **"Crear Post"**
3. El sistema realizará los siguientes pasos:
   - Validar la contraseña
   - Subir la imagen
   - Crear el archivo `.md` en `src/content/blog/`
4. Verás un mensaje de éxito
5. Recarga la página para ver el nuevo post

## Estructura de Archivos Generados

Cuando creas un post, se genera automáticamente un archivo Markdown:

**Ubicación**: `src/content/blog/YYYY-MM-DD-slug-del-titulo.md`

**Ejemplo**: `2025-12-10-rock-nacional-viernes.md`

**Contenido**:
```markdown
---
title: "Rock Nacional Viernes"
pubDate: 2025-12-10T20:00:00.000Z
description: "Gran noche de rock argentino en Vieja Estación"
heroImage: "/assets/images/blog/2025-12-10-1234567890-imagen.jpg"
author: "Vieja Estación"
published: true
---

# Contenido del post

Tu contenido en Markdown aquí...
```

Las imágenes se guardan en: `public/assets/images/blog/`

## Configuración

### Variables de Entorno (`.env`)

```env
# Contraseña para crear posts (CÁMBIALA EN PRODUCCIÓN)
BLOG_PASSWORD=admin123

# Secret para JWT (CÁMBIALO EN PRODUCCIÓN)
JWT_SECRET=tu-secret-muy-largo-y-seguro-cambiame-en-produccion-2025
```

**IMPORTANTE**: Cambia estas contraseñas antes de usar en producción.

### Cambiar la Contraseña

1. Abre el archivo `.env`
2. Modifica el valor de `BLOG_PASSWORD`
3. Guarda el archivo
4. El servidor se reiniciará automáticamente

## API Endpoints

El sistema incluye tres endpoints de API:

### 1. POST `/api/auth`
Valida la contraseña y retorna un token JWT.

**Request**:
```json
{
  "password": "admin123"
}
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGc..."
}
```

### 2. POST `/api/images/upload`
Sube una imagen y retorna la URL pública.

**Request**: FormData
- `token`: Token JWT
- `file`: Archivo de imagen

**Response**:
```json
{
  "success": true,
  "url": "/assets/images/blog/2025-12-10-1234567890-imagen.jpg"
}
```

### 3. POST `/api/posts/create`
Crea un nuevo post del blog.

**Request**:
```json
{
  "token": "eyJhbGc...",
  "title": "Mi Nuevo Post",
  "description": "Descripción del post",
  "content": "# Contenido\n\nPárrafo...",
  "heroImage": "/assets/images/blog/imagen.jpg",
  "pubDate": "2025-12-10T20:00:00",
  "published": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "slug": "2025-12-10-mi-nuevo-post",
    "fileName": "2025-12-10-mi-nuevo-post.md",
    "message": "Post creado exitosamente..."
  }
}
```

## Desarrollo vs Producción

### En Desarrollo (`npm run dev`)
- Los nuevos posts se detectan automáticamente
- Hot Module Reload reconstruye el sitio
- Los cambios aparecen después de unos segundos

### En Producción
- Los nuevos posts requieren un rebuild del sitio
- Opciones:
  1. **GitHub Actions**: Webhook automático para rebuild
  2. **Vercel/Netlify**: Usar modo "hybrid" de Astro
  3. **Manual**: Ejecutar `npm run build` manualmente

## Solución de Problemas

### El botón "Nuevo Post" no aparece
- Verifica que estás en `/blog`
- Revisa la consola del navegador por errores

### Error "Contraseña incorrecta"
- Verifica el valor de `BLOG_PASSWORD` en `.env`
- Asegúrate de que el servidor se reinició después de cambiar `.env`

### Error al subir imagen
- Verifica que el archivo sea JPG, PNG, WEBP o GIF
- Verifica que el tamaño sea menor a 5MB
- Verifica que la carpeta `public/assets/images/blog/` exista

### El nuevo post no aparece
- **En desarrollo**: Espera unos segundos y recarga la página
- **En producción**: Ejecuta un rebuild del sitio
- Verifica que el post tenga `published: true`

### Error "Slug ya existe"
- Ya existe un post con ese título y fecha
- Cambia el título o la fecha del post

## Seguridad

### Recomendaciones

1. **Cambia las contraseñas por defecto** antes de usar en producción
2. **Usa HTTPS** siempre (no envíes contraseñas por HTTP)
3. **Limita el acceso** a la función de crear posts si es posible
4. **Haz backups** regulares de `src/content/blog/`

### Mejoras Futuras (Opcional)

- Agregar autenticación con usuarios múltiples
- Implementar 2FA (Two-Factor Authentication)
- Agregar rate limiting para prevenir ataques
- Implementar editor WYSIWYG más avanzado
- Agregar vista previa en tiempo real del Markdown

## Archivos del Sistema

### Backend (API)
- `src/pages/api/auth.ts` - Autenticación
- `src/pages/api/posts/create.ts` - Creación de posts
- `src/pages/api/images/upload.ts` - Subida de imágenes

### Frontend (UI)
- `src/components/blog/CreatePostModal.astro` - Modal y formulario
- `src/pages/blog/index.astro` - Integración en página de blog

### Utilidades
- `src/utils/blogHelpers.ts` - Funciones helper (slug, frontmatter, validación)
- `src/types/blog.ts` - Tipos TypeScript

### Configuración
- `.env` - Variables de entorno (contraseñas)
- `.gitignore` - Asegura que `.env` no se suba al repositorio

## Licencia

Este sistema es parte del proyecto Vieja Estación y está disponible para uso interno.
