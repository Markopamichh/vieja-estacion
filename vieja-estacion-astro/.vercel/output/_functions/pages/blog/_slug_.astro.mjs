import { c as createComponent, d as createAstro, e as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_BaJHYhA2.mjs';
import 'piccolore';
import { $ as $$BaseLayout, g as getCollection, a as $$Header, b as $$Footer } from '../../chunks/_astro_content_nEwg4M4N.mjs';
import { c as createArticleSchema } from '../../chunks/schemas_C533pvzS.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const blogPosts = await getCollection("blog");
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { Content } = await post.render();
  const articleSchema = createArticleSchema({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    heroImage: post.data.heroImage,
    author: post.data.author
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post.data.title, "description": post.data.description, "image": post.data.heroImage, "type": "article", "publishedTime": post.data.pubDate.toISOString(), "schema": articleSchema }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <article style="max-width: 800px; margin: 0 auto; padding: 6rem 2rem;"> <header style="margin-bottom: 3rem;"> <a href="/blog" style="color: var(--secondary-color); text-decoration: none; display: inline-block; margin-bottom: 2rem;">
← Volver al blog
</a> <h1 style="font-size: 2.5rem; margin-bottom: 1rem; line-height: 1.2;">${post.data.title}</h1> <div style="display: flex; gap: 1rem; align-items: center; color: var(--secondary-color); margin-bottom: 2rem;"> <time>${post.data.pubDate.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}</time> <span>•</span> <span>${post.data.author}</span> </div> ${post.data.heroImage && renderTemplate`<img${addAttribute(post.data.heroImage, "src")}${addAttribute(post.data.title, "alt")} style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px;">`} </header> <div class="blog-content" style="font-size: 1.1rem; line-height: 1.8; color: var(--text-color);"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
