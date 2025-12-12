import type { APIRoute } from 'astro';
import type { UploadImageResponse } from '../../../types/blog';
import { verifyToken, generateUniqueImageName } from '../../../utils/blogHelpers';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;
    const file = formData.get('file') as File;

    // Validar que se enviaron los datos requeridos
    if (!token || !file) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Token y archivo son requeridos'
        } as UploadImageResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar token
    const jwtSecret = import.meta.env.JWT_SECRET || 'default-secret-change-in-production';
    const tokenValidation = verifyToken(token, jwtSecret);

    if (!tokenValidation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: tokenValidation.expired ? 'Token expirado' : 'Token inválido'
        } as UploadImageResponse),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Tipo de archivo no válido. Use JPG, PNG, WEBP o GIF.'
        } as UploadImageResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El archivo es demasiado grande. Máximo 5MB.'
        } as UploadImageResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generar nombre único
    const uniqueName = generateUniqueImageName(file.name);

    // Obtener path absoluto al directorio public
    const currentDir = fileURLToPath(new URL('.', import.meta.url));
    const publicDir = join(currentDir, '../../../../public/assets/images/blog');

    // Convertir File a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Guardar archivo
    const filePath = join(publicDir, uniqueName);
    await writeFile(filePath, buffer);

    // Retornar URL pública
    const publicUrl = `/assets/images/blog/${uniqueName}`;

    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl
      } as UploadImageResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al guardar la imagen'
      } as UploadImageResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
