# Backend · Cloud Functions

Una sola función por ahora: **`sendRequest`**, que recibe los formularios de la web
(encargos y contacto) y envía el correo con **Resend**. La API key de Resend vive
solo aquí, nunca en el navegador.

```
backend/functions/src/
├── index.ts                                  # registra las funciones
└── modules/requests/
    ├── domain/request.ts                     # esquema zod + puerto Mailer (sin dependencias)
    ├── application/send-request.usecase.ts   # caso de uso
    └── infrastructure/
        ├── resend.mailer.ts                  # adaptador Resend (API REST, plantilla HTML)
        └── http.ts                           # onRequest: CORS, rate limit, honeypot, composition root
```

Para agregar otra función: crea un módulo nuevo con las mismas tres capas y expórtalo en `index.ts`.

## Flujo

`Formulario (frontend)` → `POST /api/requests` → Firebase Hosting reescribe a la función
`sendRequest` (misma URL, sin problemas de CORS) → Resend → correo a `MAIL_TO`.

## Configuración (una sola vez)

Requiere el plan **Blaze** de Firebase (Cloud Functions no está en el plan gratuito;
con este volumen el costo es prácticamente $0).

```bash
cd backend/functions
pnpm install
firebase functions:secrets:set RESEND_API_KEY      # pega la key de Resend cuando la pida
cp .env.example .env                                # y define MAIL_TO (correo que recibe)
```

- **Remitente:** sin dominio propio, Resend solo permite `onboarding@resend.dev` y solo
  entrega al correo dueño de la cuenta de Resend. Para enviar a cualquier correo y con
  remitente propio (ej. `pedidos@universoesoterico.com`), verifica el dominio en Resend y
  cambia `MAIL_FROM` en `.env`.

## Desarrollo local

```bash
pnpm --dir backend/functions serve    # emulador en :5001 (usa .secret.local y .env)
pnpm dev                              # el frontend reenvía /api/requests al emulador
```

## Desplegar

```bash
pnpm run deploy:functions             # desde la raíz del repo
```
