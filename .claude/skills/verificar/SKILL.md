---
name: verificar
description: Verifica que el monorepo de Universo Esotérico compila antes de entregar cambios (tipos, lint, build del frontend y del Studio). Úsala al terminar cualquier cambio de código.
---

Ejecuta desde la raíz del repo, en este orden, y detente en el primer error:

1. `pnpm --dir frontend exec tsc -b` — tipos del frontend.
2. `pnpm --dir frontend lint` — oxlint (debe quedar sin avisos).
3. `pnpm --dir frontend build` — build de producción (también regenera `public/sitemap.xml`).
4. Solo si tocaste `studio-universo-esoterico/`: `pnpm --dir studio-universo-esoterico build`.
   Si tocaste `mockData.ts` o `testimonials.data.ts`: `pnpm --dir studio-universo-esoterico seed:build`.

Reporta qué pasó en cada paso. Si el cambio es visual, revisa además la página con el dev server
(`pnpm dev`, puerto 5173) en escritorio (1440px) y móvil (375px), en claro y oscuro.
