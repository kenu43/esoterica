# Worker del asesor con IA

Guarda la API key de Groq Cloud fuera del navegador. La web le manda la conversación y un resumen
del catálogo; el Worker llama a Groq y devuelve la respuesta y los productos recomendados.
Groq Cloud es gratis y no pide tarjeta; Cloudflare también es gratis (plan Free: 100.000 peticiones al día).

## Puesta en marcha (una sola vez)

```bash
cd assistant-worker
pnpm install
pnpm exec wrangler login            # cuenta gratuita de Cloudflare
pnpm run secret                     # aquí pegas la API key de Groq (queda guardada cifrada, empieza por gsk_)
pnpm run deploy                     # imprime la URL: https://universo-esoterico-chat.<tu-usuario>.workers.dev
```

La key se saca en **console.groq.com** → API Keys → Create API Key. Nunca va en `frontend/.env.local`
ni en ningún archivo del repo: solo se guarda aquí, en el Worker, con `pnpm run secret`.

Luego pon la URL del Worker en `frontend/.env.local`:

```
VITE_CHAT_URL=https://universo-esoterico-chat.<tu-usuario>.workers.dev
```

y vuelve a publicar la web (`pnpm build` + `pnpm deploy`). Sin `VITE_CHAT_URL` el asesor no aparece.

## Pruebas locales

Crea `assistant-worker/.dev.vars` con `GROQ_API_KEY=tu_key`, corre `pnpm dev` (puerto 8787) y usa
`VITE_CHAT_URL=http://localhost:8787` en el frontend.

## Cambiar de modelo

`GROQ_MODEL` y `GROQ_FALLBACK_MODEL` en `wrangler.toml` (por defecto `openai/gpt-oss-120b` y
`openai/gpt-oss-20b`, este último más rápido y liviano). Groq cambia con frecuencia qué modelos están
disponibles; revisa los tuyos en **console.groq.com/playground** (selector de modelo, arriba a la
derecha) o con `curl https://api.groq.com/openai/v1/models -H "Authorization: Bearer tu_key"`. Si un
modelo deja de estar disponible, la respuesta trae el motivo exacto en `detail` — cámbialo aquí y
vuelve a `pnpm run deploy`.

## Seguridad

- Solo responde a los dominios de `ALLOWED_ORIGINS` (`wrangler.toml`): agrega el dominio propio si lo compras.
- Máximo 20 preguntas por IP cada 10 minutos, mensajes de 500 caracteres y 12 mensajes de historial.
- Si sospechas que la key se filtró, créala de nuevo en console.groq.com y repite `pnpm run secret`.
