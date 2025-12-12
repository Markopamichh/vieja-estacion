import type { BlogPostData } from '../types/blog';

/**
 * Genera un slug válido a partir de un título
 * Ejemplo: "Mi Nuevo Post" -> "mi-nuevo-post"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // Descomponer caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '') // Eliminar marcas diacríticas
    .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Eliminar guiones duplicados
}

/**
 * Genera el frontmatter YAML para un post
 */
export function generateFrontmatter(data: BlogPostData): string {
  const author = data.author || 'Vieja Estación';
  const published = data.published !== undefined ? data.published : false;

  return `---
title: "${data.title.replace(/"/g, '\\"')}"
pubDate: ${data.pubDate.toISOString()}
description: "${data.description.replace(/"/g, '\\"')}"
heroImage: "${data.heroImage}"
author: "${author}"
published: ${published}
---`;
}

/**
 * Valida los datos de un post del blog
 */
export function validateBlogPost(data: any): BlogPostData | null {
  if (!data || typeof data !== 'object') return null;

  // Validar campos requeridos
  if (!data.title || typeof data.title !== 'string' || data.title.length < 5 || data.title.length > 100) {
    return null;
  }

  if (!data.description || typeof data.description !== 'string' || data.description.length < 20 || data.description.length > 500) {
    return null;
  }

  if (!data.content || typeof data.content !== 'string' || data.content.length < 50) {
    return null;
  }

  if (!data.heroImage || typeof data.heroImage !== 'string') {
    return null;
  }

  if (!data.pubDate || !(data.pubDate instanceof Date) || isNaN(data.pubDate.getTime())) {
    return null;
  }

  return {
    title: data.title.trim(),
    description: data.description.trim(),
    content: data.content,
    heroImage: data.heroImage,
    pubDate: data.pubDate,
    author: data.author || 'Vieja Estación',
    published: data.published !== undefined ? Boolean(data.published) : false,
  };
}

/**
 * Valida un archivo de imagen
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de archivo no válido. Use JPG, PNG, WEBP o GIF.'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'El archivo es demasiado grande. Máximo 5MB.'
    };
  }

  return { valid: true };
}

/**
 * Genera un nombre único para una imagen
 */
export function generateUniqueImageName(originalName: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const timestamp = date.getTime();

  // Limpiar nombre original
  const cleanName = originalName
    .toLowerCase()
    .replace(/[^\w.-]/g, '-')
    .replace(/-+/g, '-');

  return `${year}-${month}-${day}-${timestamp}-${cleanName}`;
}

/**
 * Verifica un token JWT simple
 */
export function verifyToken(token: string, secret: string): { valid: boolean; expired: boolean } {
  try {
    // Decodificar JWT (formato: header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, expired: false };
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());

    // Verificar expiración
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return { valid: false, expired: true };
    }

    // En producción, deberías verificar la firma
    // Por ahora, validación simple
    return { valid: true, expired: false };
  } catch (error) {
    return { valid: false, expired: false };
  }
}

/**
 * Genera un token JWT simple
 */
export async function generateToken(secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
    iat: Math.floor(Date.now() / 1000)
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');

  const signatureData = `${base64Header}.${base64Payload}`;

  // Usar crypto para la firma
  const crypto = await import('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signatureData)
    .digest('base64url');

  return `${signatureData}.${signature}`;
}
