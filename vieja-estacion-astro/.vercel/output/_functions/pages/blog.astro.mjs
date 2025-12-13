import { c as createComponent, m as maybeRenderHead, a as renderScript, r as renderTemplate, e as renderComponent, f as addAttribute } from '../chunks/astro/server_BaJHYhA2.mjs';
import 'piccolore';
import { g as getCollection, $ as $$BaseLayout, a as $$Header, b as $$Footer } from '../chunks/_astro_content_nEwg4M4N.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$CreatePostModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<dialog id="createPostDialog" class="create-post-modal" data-astro-cid-6mnxrw7g> <div class="modal-content" data-astro-cid-6mnxrw7g> <button class="close-btn" onclick="this.closest('dialog').close()" type="button" data-astro-cid-6mnxrw7g>✕</button> <!-- Vista de Login --> <div id="loginView" data-astro-cid-6mnxrw7g> <h2 data-astro-cid-6mnxrw7g>Iniciar Sesión</h2> <p style="color: #666; margin-bottom: 1.5rem;" data-astro-cid-6mnxrw7g>Ingresa tus credenciales para crear posts</p> <form id="loginForm" class="auth-form" data-astro-cid-6mnxrw7g> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="username" data-astro-cid-6mnxrw7g>Usuario</label> <input type="text" id="username" name="username" required placeholder="Ingresa tu usuario" autocomplete="username" data-astro-cid-6mnxrw7g> </div> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="loginPassword" data-astro-cid-6mnxrw7g>Contraseña</label> <input type="password" id="loginPassword" name="password" required placeholder="Ingresa tu contraseña" autocomplete="current-password" data-astro-cid-6mnxrw7g> </div> <div id="loginStatus" class="form-status" style="display: none;" data-astro-cid-6mnxrw7g></div> <div class="form-actions" data-astro-cid-6mnxrw7g> <button type="button" class="btn btn-secondary" onclick="this.closest('dialog').close()" data-astro-cid-6mnxrw7g>
Cancelar
</button> <button type="submit" class="btn btn-primary" id="loginBtn" data-astro-cid-6mnxrw7g>
Iniciar Sesión
</button> </div> </form> </div> <!-- Vista de Creación de Post (oculta inicialmente) --> <div id="createPostView" style="display: none;" data-astro-cid-6mnxrw7g> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;" data-astro-cid-6mnxrw7g> <h2 data-astro-cid-6mnxrw7g>Crear Nuevo Post</h2> <button type="button" class="btn-link" id="logoutBtn" data-astro-cid-6mnxrw7g>Cerrar sesión</button> </div> <form id="createPostForm" class="post-form" data-astro-cid-6mnxrw7g> <!-- Título --> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="title" data-astro-cid-6mnxrw7g>Título * (5-100 caracteres)</label> <input type="text" id="title" name="title" required minlength="5" maxlength="100" placeholder="Ej: Rock Nacional este Viernes" data-astro-cid-6mnxrw7g> </div> <!-- Descripción --> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="description" data-astro-cid-6mnxrw7g>Descripción * (20-500 caracteres)</label> <textarea id="description" name="description" required minlength="20" maxlength="500" rows="3" placeholder="Breve descripción del post" data-astro-cid-6mnxrw7g></textarea> </div> <!-- Contenido --> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="content" data-astro-cid-6mnxrw7g>Contenido * (mínimo 50 caracteres, Markdown permitido)</label> <textarea id="content" name="content" required minlength="50" rows="10" placeholder="Escribe el contenido del post aquí. Puedes usar Markdown:

# Título
## Subtítulo
**Negrita** *cursiva*

- Item 1
- Item 2" data-astro-cid-6mnxrw7g></textarea> </div> <!-- Imagen --> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="heroImage" data-astro-cid-6mnxrw7g>Imagen Destacada *</label> <input type="file" id="heroImage" name="heroImage" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" required data-astro-cid-6mnxrw7g> <small data-astro-cid-6mnxrw7g>JPG, PNG, WEBP o GIF - Máximo 5MB</small> <div id="imagePreview" style="display: none; margin-top: 10px;" data-astro-cid-6mnxrw7g> <img id="imagePreviewImg" src="" alt="Preview" style="max-width: 200px; border-radius: 8px;" data-astro-cid-6mnxrw7g> </div> </div> <!-- Fecha de publicación --> <div class="form-group" data-astro-cid-6mnxrw7g> <label for="pubDate" data-astro-cid-6mnxrw7g>Fecha de Publicación *</label> <input type="datetime-local" id="pubDate" name="pubDate" required data-astro-cid-6mnxrw7g> </div> <!-- Publicado --> <div class="form-group checkbox-group" data-astro-cid-6mnxrw7g> <label data-astro-cid-6mnxrw7g> <input type="checkbox" id="published" name="published" data-astro-cid-6mnxrw7g> <span data-astro-cid-6mnxrw7g>Publicar inmediatamente</span> </label> <small data-astro-cid-6mnxrw7g>Si no lo marcas, el post se guardará como borrador</small> </div> <!-- Mensajes de estado --> <div id="formStatus" class="form-status" style="display: none;" data-astro-cid-6mnxrw7g></div> <!-- Botones --> <div class="form-actions" data-astro-cid-6mnxrw7g> <button type="button" class="btn btn-secondary" onclick="this.closest('dialog').close()" data-astro-cid-6mnxrw7g>
Cancelar
</button> <button type="submit" class="btn btn-primary" id="submitBtn" data-astro-cid-6mnxrw7g>
Crear Post
</button> </div> </form> </div> </div> </dialog>  ${renderScript($$result, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/blog/CreatePostModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/components/blog/CreatePostModal.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog", ({ data }) => data.published === true);
  const sortedPosts = allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const pageTitle = "Blog y Noticias";
  const pageDescription = "Mantente al d\xEDa con las \xFAltimas noticias, eventos especiales y novedades de Vieja Estaci\xF3n.";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle, "description": pageDescription }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <section class="blog-listing" style="padding: 6rem 2rem; min-height: 60vh;"> <div class="container"> <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;"> <div> <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Blog y Noticias</h1> <p class="subtitle">Mantente al día con nuestras novedades</p> </div> <button id="openModalBtn" style="padding: 0.75rem 1.5rem; background-color: var(--primary-color); color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease;" onclick="document.getElementById('createPostDialog').showModal()">
+ Nuevo Post
</button> </div> ${sortedPosts.length === 0 ? renderTemplate`<p style="text-align: center; font-size: 1.2rem; color: var(--secondary-color);">
Próximamente encontrarás aquí nuestras últimas noticias y eventos especiales.
</p>` : renderTemplate`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;"> ${sortedPosts.map((post) => renderTemplate`<article style="border: 1px solid #eee; border-radius: 8px; overflow: hidden; transition: transform 0.3s ease;"> <a${addAttribute(`/blog/${post.slug}`, "href")} style="text-decoration: none; color: inherit;"> ${post.data.heroImage && renderTemplate`<img${addAttribute(post.data.heroImage, "src")}${addAttribute(post.data.title, "alt")} style="width: 100%; height: 200px; object-fit: cover;" loading="lazy">`} <div style="padding: 1.5rem;"> <time style="font-size: 0.9rem; color: var(--secondary-color);"> ${post.data.pubDate.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time> <h2 style="margin: 0.5rem 0 1rem; font-size: 1.5rem;">${post.data.title}</h2> <p style="color: var(--secondary-color); line-height: 1.6;">${post.data.description}</p> <span style="display: inline-block; margin-top: 1rem; color: var(--primary-color); font-weight: bold;">
Leer más →
</span> </div> </a> </article>`)} </div>`} </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})}  ${renderComponent($$result2, "CreatePostModal", $$CreatePostModal, {})} ` })}`;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
