# Universo Esotérico

Web de las tres tiendas familiares del centro de Ibagué: **El Sortilegio** (1981),
**La Colonia** (2004) y **Loto & Nirvana** (2023). Catálogo con precios, consulta por
WhatsApp, encargos por WhatsApp, tarot, numerología, glosario, fase lunar y test de energía.

## Estructura

```
esoterica/
├── frontend/                   # React 19 + Vite 8 + HeroUI v3 + Tailwind 4 (Feature-Sliced Design)
├── studio-universo-esoterico/  # Sanity Studio: panel de administración del catálogo
├── firebase.json               # Firebase Hosting
└── CLAUDE.md                   # Contexto corto para sesiones con Claude
```

| Pieza         | Tecnología                                                        |
| ------------- | ----------------------------------------------------------------- |
| UI            | React 19, TypeScript, HeroUI v3, Tailwind CSS 4                   |
| Animación     | Motion (Framer Motion), GSAP ScrollTrigger, View Transitions      |
| Datos         | TanStack Query + patrón Repository (Sanity con respaldo en mock)  |
| CMS           | Sanity.io (proyecto `rx1vv2w8`, dataset `production`)             |
| Hosting       | Firebase Hosting (proyecto `esoterica-app`) + Analytics           |
| Mapas         | Leaflet + OpenStreetMap (sin API key)                             |

## Comandos (desde la raíz)

```bash
pnpm dev                 # web en http://localhost:5173
pnpm studio              # panel Sanity en http://localhost:3333
pnpm build               # compila la web (genera sitemap.xml)
pnpm run deploy          # publica la web en Firebase Hosting
pnpm run deploy:studio   # publica el panel en https://universo-esoterico.sanity.studio
```

## Puesta en marcha (una sola vez)

1. **Sanity**
   ```bash
   cd studio-universo-esoterico
   pnpm exec sanity login          # entra con la cuenta dueña del proyecto
   pnpm cors                       # autoriza localhost y el dominio de Firebase
   pnpm seed                       # sube lo que FALTA (no pisa nada de lo ya editado)
   pnpm migrate:categories         # solo si ya había productos: enlaza su categoría
   pnpm run deploy                 # publica el panel
   ```
   Luego invita a tu hermano como **Editor** en https://www.sanity.io/manage → proyecto → Members.
   Guía para él: [`studio-universo-esoterico/GUIA-PANEL.md`](studio-universo-esoterico/GUIA-PANEL.md).

2. **Vista previa sin publicar (opcional)** — crea un token "Viewer" en manage.sanity.io → proyecto → API →
   Tokens, y ponlo en `frontend/.env.local` como `VITE_SANITY_PREVIEW_TOKEN`. Con eso el menú **Presentation**
   del panel muestra la web con los cambios aún no publicados. Detalles en `studio-universo-esoterico/GUIA-PANEL.md`.

3. **Publicar**
   ```bash
   pnpm add -g firebase-tools && firebase login
   pnpm run deploy
   ```

## ¿Cómo se actualiza el catálogo?

Todo desde el panel de Sanity: fotos, precios, productos nuevos, agotados y opiniones.
La web lee Sanity en vivo (CDN), así que **no hay que volver a publicar** para ver los cambios.
Si Sanity no responde o está vacío, la web usa `frontend/src/entities/product/api/mockData.ts`.

## Personalizar

| Qué                                   | Dónde                                                  |
| ------------------------------------- | ------------------------------------------------------ |
| Nombre, redes, WhatsApp principal     | `frontend/src/shared/config/site.ts`                   |
| Tiendas (dirección, horario, teléfono)| `frontend/src/entities/branch/model/branches.data.ts`  |
| Categorías                            | `frontend/src/entities/category` + `studio…/schemaTypes/constants.ts` |
| Glosario, consejos del día, tarot     | `frontend/src/entities/{glossary,advice,tarot-card}`   |
| Colores y tipografía                  | `frontend/src/app/styles/globals.css`                  |

Créditos de imágenes: `frontend/public/images/CREDITS.md`. Las fotos de las tiendas son
provisionales: reemplázalas por fotos reales de cada local para mejor conversión y SEO.
