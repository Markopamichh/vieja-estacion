import { v as verifyToken, b as validateBlogPost, c as generateSlug, d as generateFrontmatter } from '../../../chunks/blogHelpers_D2fU4MQE.mjs';
import { access, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { constants } from 'fs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.token) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Token requerido"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const jwtSecret = "tu-secret-muy-largo-y-seguro-cambiame-en-produccion-2025";
    const tokenValidation = verifyToken(data.token, jwtSecret);
    if (!tokenValidation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: tokenValidation.expired ? "Token expirado" : "Token inválido"
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const pubDate = new Date(data.pubDate);
    if (isNaN(pubDate.getTime())) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Fecha de publicación inválida"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const postData = {
      title: data.title,
      description: data.description,
      content: data.content,
      heroImage: data.heroImage,
      pubDate,
      author: "Vieja Estación",
      published: data.published !== void 0 ? data.published : false
    };
    const validatedPost = validateBlogPost(postData);
    if (!validatedPost) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Datos del post inválidos. Verifica que todos los campos cumplan con los requisitos."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const titleSlug = generateSlug(validatedPost.title);
    const date = validatedPost.pubDate;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const slug = `${year}-${month}-${day}-${titleSlug}`;
    const fileName = `${slug}.md`;
    const currentDir = fileURLToPath(new URL(".", import.meta.url));
    const blogDir = join(currentDir, "../../../../src/content/blog");
    const filePath = join(blogDir, fileName);
    try {
      await access(filePath, constants.F_OK);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Ya existe un post con el slug "${slug}". Cambia el título o la fecha.`
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    } catch {
    }
    const frontmatter = generateFrontmatter(validatedPost);
    const fileContent = `${frontmatter}

${validatedPost.content}
`;
    await writeFile(filePath, fileContent, "utf-8");
    console.log(`✅ Post creado exitosamente: ${fileName}`);
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          slug,
          fileName,
          message: "Post creado exitosamente. El sitio se reconstruirá automáticamente."
        }
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al crear post:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error al crear el post. Verifica los logs del servidor."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
