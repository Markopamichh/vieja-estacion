#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Sincroniza el menú de la web con el menú online de Fudo.
//
// Uso:  npm run sync:menu
//
// Descarga las categorías y productos desde la API pública de Fudo, baja las
// imágenes de los platos que las tienen y regenera por completo la colección
// src/content/menu (un JSON por plato) más las imágenes en
// public/assets/images/menu. No guarda precios: la fuente de verdad de los
// precios sigue siendo Fudo, enlazada desde la web.
//
// El slug del comercio se toma de PUBLIC_FUDO_SLUG o del valor por defecto.
// ---------------------------------------------------------------------------

import { mkdir, rm, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SLUG = process.env.PUBLIC_FUDO_SLUG || 'viejaestacion';
const API = 'https://integrations.fu.do/fudo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MENU_DIR = join(ROOT, 'src/content/menu');
const IMG_DIR = join(ROOT, 'public/assets/images/menu');
const IMG_PUBLIC = '/assets/images/menu';

// Productos internos/placeholder que no queremos mostrar (precio 0 sin descripción).
const isJunk = (p) => (p.price ?? 0) === 0 && !p.description;

const headers = {
  'fudo-account-id': Buffer.from(SLUG).toString('base64'),
  'fudo-app': 'qr-menu',
  Origin: 'https://menu.fu.do',
  Referer: 'https://menu.fu.do/',
  Accept: 'application/json',
};

async function api(path) {
  const res = await fetch(`${API}/${path}/?a=${SLUG}`, { headers });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

function slugify(str) {
  return str
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

// Detecta la extensión real por los magic bytes (Fudo suele servir WebP).
function extFor(buf) {
  if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8) return 'jpg';
  if (buf.length > 8 && buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') return 'png';
  return 'jpg';
}

async function downloadImage(url, baseName) {
  const res = await fetch(url, { headers: { Referer: 'https://menu.fu.do/' } });
  if (!res.ok) throw new Error(`imagen ${url} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = extFor(buf);
  const file = `${baseName}.${ext}`;
  await writeFile(join(IMG_DIR, file), buf);
  return `${IMG_PUBLIC}/${file}`;
}

async function main() {
  console.log(`→ Sincronizando menú de "${SLUG}" desde Fudo…`);

  const [{ productCategories }, { products }] = await Promise.all([
    api('product-categories'),
    api('products'),
  ]);

  const catById = new Map(productCategories.map((c) => [c.id, c]));
  const items = products
    .filter((p) => !isJunk(p) && catById.has(p.productCategoryId))
    .sort((a, b) => a.position - b.position);

  console.log(`  ${productCategories.length} categorías · ${items.length} platos (${products.length} totales)`);

  // Regenerar directorios desde cero.
  await rm(MENU_DIR, { recursive: true, force: true });
  await mkdir(MENU_DIR, { recursive: true });
  await mkdir(IMG_DIR, { recursive: true });
  // Limpiar imágenes previas de este directorio (solo archivos, no subcarpetas).
  for (const f of await readdir(IMG_DIR)) {
    if (/\.(jpe?g|png|webp)$/i.test(f)) await rm(join(IMG_DIR, f), { force: true });
  }

  const usedSlugs = new Set();
  let withImage = 0;

  for (const [i, p] of items.entries()) {
    let slug = slugify(p.name) || `item-${p.id}`;
    while (usedSlugs.has(slug)) slug = `${slug}-${p.id}`;
    usedSlugs.add(slug);

    const record = {
      category: catById.get(p.productCategoryId).name,
      name: p.name,
      description: p.description || '',
      order: i,
      active: true,
    };

    if (p.image) {
      try {
        record.image = await downloadImage(p.image, slug);
        withImage++;
      } catch (err) {
        console.warn(`  ⚠ sin imagen para "${p.name}": ${err.message}`);
      }
    }

    await writeFile(
      join(MENU_DIR, `${slug}.json`),
      JSON.stringify(record, null, 2) + '\n',
    );
  }

  console.log(`✓ Listo: ${items.length} platos escritos, ${withImage} con imagen.`);
  console.log('  Revisá los cambios con "git status" y comiteá si está todo bien.');
}

main().catch((err) => {
  console.error(`✗ Error: ${err.message}`);
  process.exit(1);
});
