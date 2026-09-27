# Worker del asesor con IA

Guarda la API key de xAI (Grok) fuera del navegador. La web le manda la conversación y un resumen
del catálogo; el Worker llama a Grok y devuelve la respuesta y los productos recomendados.
Gratis en Cloudflare (plan Free: 100.000 peticiones al día).

## Puesta en marcha (una sola vez)

```bash
cd assistant-worker
pnpm install
pnpm exec wrangler login            # cuenta gratuita de Cloudflare
pnpm run secret                     # aquí pegas la API key de x.ai (queda guardada cifrada)
pnpm run deploy                     # imprime la URL: https://universo-esoterico-chat.<tu-usuario>.workers.dev
```

Luego pon esa URL en `frontend/.env.local`:

```
VITE_CHAT_URL=https://universo-esoterico-chat.<tu-usuario>.workers.dev
```

y vuelve a publicar la web (`pnpm build` + `pnpm deploy`). Sin `VITE_CHAT_URL` el asesor no aparece.

## Pruebas locales

Crea `assistant-worker/.dev.vars` con `XAI_API_KEY=tu_key`, corre `pnpm dev` (puerto 8787) y usa
`VITE_CHAT_URL=http://localhost:8787` en el frontend.

## Cambiar de modelo

`XAI_MODEL` y `XAI_FALLBACK_MODEL` en `wrangler.toml` (por defecto `grok-4-fast` y `grok-3-mini`, pensados
para responder rápido). Si x.ai renombra o retira un modelo, la respuesta trae el motivo exacto en
`detail` — cámbialo aquí por el nombre vigente en https://docs.x.ai/docs/models y vuelve a `pnpm run deploy`.

## Seguridad

- Solo responde a los dominios de `ALLOWED_ORIGINS` (`wrangler.toml`): agrega el dominio propio si lo compras.
- Máximo 20 preguntas por IP cada 10 minutos, mensajes de 500 caracteres y 12 mensajes de historial.
- Si sospechas que la key se filtró, créala de nuevo en console.x.ai y repite `pnpm run secret`.
