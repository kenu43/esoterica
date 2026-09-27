# Worker del asesor con IA

Guarda la API key de Gemini fuera del navegador. La web le manda la conversación y un resumen
del catálogo; el Worker llama a Gemini y devuelve la respuesta y los productos recomendados.
Gratis en Cloudflare (plan Free: 100.000 peticiones al día).

## Puesta en marcha (una sola vez)

```bash
cd worker
pnpm install
pnpm exec wrangler login            # cuenta gratuita de Cloudflare
pnpm run secret                     # aquí pegas la API key de Gemini (queda guardada cifrada)
pnpm run deploy                     # imprime la URL: https://universo-esoterico-chat.<tu-usuario>.workers.dev
```

Luego pon esa URL en `frontend/.env.local`:

```
VITE_CHAT_URL=https://universo-esoterico-chat.<tu-usuario>.workers.dev
```

y vuelve a publicar la web (`pnpm build` + `pnpm deploy`). Sin `VITE_CHAT_URL` el asesor no aparece.

## Pruebas locales

Crea `worker/.dev.vars` con `GEMINI_API_KEY=tu_key`, corre `pnpm dev` (puerto 8787) y usa
`VITE_CHAT_URL=http://localhost:8787` en el frontend.

## Seguridad

- Solo responde a los dominios de `ALLOWED_ORIGINS` (`wrangler.toml`): agrega el dominio propio si lo compras.
- Máximo 20 preguntas por IP cada 10 minutos, mensajes de 500 caracteres y 12 mensajes de historial.
- Si sospechas que la key se filtró, créala de nuevo en Google AI Studio y repite `pnpm run secret`.
