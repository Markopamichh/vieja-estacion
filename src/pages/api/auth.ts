import type { APIRoute } from 'astro';
import type { AuthResponse } from '../../types/blog';
import { generateToken } from '../../utils/blogHelpers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { username, password } = data;

    // Validar que se enviaron usuario y contraseña
    if (!username || typeof username !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Usuario requerido'
        } as AuthResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!password || typeof password !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Contraseña requerida'
        } as AuthResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Obtener credenciales desde variables de entorno
    const correctUsername = import.meta.env.BLOG_USERNAME;
    const correctPassword = import.meta.env.BLOG_PASSWORD;

    if (!correctUsername || !correctPassword) {
      console.error('BLOG_USERNAME o BLOG_PASSWORD no están configuradas en las variables de entorno');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error de configuración del servidor'
        } as AuthResponse),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar credenciales
    if (username !== correctUsername || password !== correctPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Usuario o contraseña incorrectos'
        } as AuthResponse),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generar token JWT
    const jwtSecret = import.meta.env.JWT_SECRET || 'default-secret-change-in-production';
    const token = await generateToken(jwtSecret);

    return new Response(
      JSON.stringify({
        success: true,
        token
      } as AuthResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error en autenticación:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor'
      } as AuthResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
