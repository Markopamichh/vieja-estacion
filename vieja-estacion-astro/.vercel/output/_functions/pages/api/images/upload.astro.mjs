import { v as verifyToken, a as generateUniqueImageName } from '../../../chunks/blogHelpers_D2fU4MQE.mjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const token = formData.get("token");
    const file = formData.get("file");
    if (!token || !file) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Token y archivo son requeridos"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const jwtSecret = "tu-secret-muy-largo-y-seguro-cambiame-en-produccion-2025";
    const tokenValidation = verifyToken(token, jwtSecret);
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
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Tipo de archivo no válido. Use JPG, PNG, WEBP o GIF."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "El archivo es demasiado grande. Máximo 5MB."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const uniqueName = generateUniqueImageName(file.name);
    const currentDir = fileURLToPath(new URL(".", import.meta.url));
    const publicDir = join(currentDir, "../../../../public/assets/images/blog");
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = join(publicDir, uniqueName);
    await writeFile(filePath, buffer);
    const publicUrl = `/assets/images/blog/${uniqueName}`;
    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error al guardar la imagen"
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
