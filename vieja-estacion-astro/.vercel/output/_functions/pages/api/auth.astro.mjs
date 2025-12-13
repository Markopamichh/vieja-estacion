import { g as generateToken } from '../../chunks/blogHelpers_D2fU4MQE.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { username, password } = data;
    if (!username || typeof username !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Usuario requerido"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (!password || typeof password !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Contraseña requerida"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const correctUsername = "viejaestacion";
    const correctPassword = "lavieja2025";
    if (!correctUsername || !correctPassword) ;
    if (username !== correctUsername || password !== correctPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Usuario o contraseña incorrectos"
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const jwtSecret = "tu-secret-muy-largo-y-seguro-cambiame-en-produccion-2025";
    const token = await generateToken(jwtSecret);
    return new Response(
      JSON.stringify({
        success: true,
        token
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error en autenticación:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error interno del servidor"
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
