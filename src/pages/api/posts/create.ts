import type { APIRoute } from 'astro';
import type { ApiResponse, CreatePostRequest, BlogPostData } from '../../../types/blog';
import { verifyToken, generateSlug, generateFrontmatter, validateBlogPost } from '../../../utils/blogHelpers';
import { writeFile, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { constants } from 'fs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: CreatePostRequest = await request.json();

    // Validar que se enviaron los datos requeridos
    if (!data.token) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Token requerido'
        } as ApiResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar token
    const jwtSecret = import.meta.env.JWT_SECRET || 'default-secret-change-in-production';
    const tokenValidation = verifyToken(data.token, jwtSecret);

    if (!tokenValidation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: tokenValidation.expired ? 'Token expirado' : 'Token inválido'
        } as ApiResponse),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Convertir pubDate a Date
    const pubDate = new Date(data.pubDate);
    if (isNaN(pubDate.getTime())) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Fecha de publicación inválida'
        } as ApiResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Preparar datos del post
    const postData: BlogPostData = {
      title: data.title,
      description: data.description,
      content: data.content,
      heroImage: data.heroImage,
      pubDate,
      author: 'Vieja Estación',
      published: data.published !== undefined ? data.published : false
    };

    // Validar datos del post
    const validatedPost = validateBlogPost(postData);
    if (!validatedPost) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Datos del post inválidos. Verifica que todos los campos cumplan con los requisitos.'
        } as ApiResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generar slug
    const titleSlug = generateSlug(validatedPost.title);
    const date = validatedPost.pubDate;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const slug = `${year}-${month}-${day}-${titleSlug}`;
    const fileName = `${slug}.md`;

    // Obtener path absoluto al directorio de blog
    const currentDir = fileURLToPath(new URL('.', import.meta.url));
    const blogDir = join(currentDir, '../../../../src/content/blog');
    const filePath = join(blogDir, fileName);

    // Verificar si el archivo ya existe
    try {
      await access(filePath, constants.F_OK);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Ya existe un post con el slug "${slug}". Cambia el título o la fecha.`
        } as ApiResponse),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch {
      // El archivo no existe, podemos continuar
    }

    // Generar frontmatter
    const frontmatter = generateFrontmatter(validatedPost);

    // Construir contenido completo del archivo
    const fileContent = `${frontmatter}

${validatedPost.content}
`;

    // Escribir archivo
    await writeFile(filePath, fileContent, 'utf-8');

    console.log(`✅ Post creado exitosamente: ${fileName}`);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          slug,
          fileName,
          message: 'Post creado exitosamente. El sitio se reconstruirá automáticamente.'
        }
      } as ApiResponse),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error al crear post:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al crear el post. Verifica los logs del servidor.'
      } as ApiResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
