import { c as createComponent, r as renderTemplate, a as renderScript, b as renderHead } from '../chunks/astro/server_BaJHYhA2.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin - Vieja Estaci\xF3n</title><link href="/admin/config.yml" type="text/yaml" rel="cms-config-url">', "", "</head> <body> <!-- Include the Decap CMS script --> ", ' <script>\n    if (window.netlifyIdentity) {\n      window.netlifyIdentity.on("init", user => {\n        if (!user) {\n          window.netlifyIdentity.on("login", () => {\n            document.location.href = "/admin";\n          });\n        }\n      });\n    }\n  <\/script> </body> </html>'])), renderScript($$result, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/admin.astro?astro&type=script&index=0&lang.ts"), renderHead(), renderScript($$result, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/admin.astro?astro&type=script&index=1&lang.ts"));
}, "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/admin.astro", void 0);

const $$file = "C:/Users/Administrator/OneDrive/Escritorio/FACULTAD/vieja estacion/vieja-estacion-astro/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
