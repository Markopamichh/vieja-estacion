# Scripts

## `sync-menu.mjs` — Sincronizar el menú con Fudo

El comercio administra su carta desde **Fudo**. Cuando la actualizan ahí, la web
no se entera sola: hay que correr este script para traer los cambios.

```bash
npm run sync:menu
```

Qué hace:

1. Llama a la API pública de Fudo (categorías + productos del comercio).
2. Regenera por completo `src/content/menu/` (un `.json` por plato).
3. Descarga las imágenes de los platos que las tengan a
   `public/assets/images/menu/`.
4. **No guarda precios** — la carta online de Fudo sigue siendo la fuente de
   verdad de los precios, enlazada desde la web con el botón "Ver menú completo".

Después de correrlo, revisá los cambios y comiteá:

```bash
git status
git add -A && git commit -m "sync: actualizar menú desde Fudo"
git push
```

### Configuración

El slug del comercio se toma de la variable de entorno `PUBLIC_FUDO_SLUG`
(por defecto `viejaestacion`). Si el comercio cambia de cuenta en Fudo, ajustá
esa variable.

> Nota: no requiere navegador ni dependencias externas, solo Node. Si Fudo
> cambia su API interna, puede que haya que revisar los headers en el script
> (`fudo-account-id`, `fudo-app`).
