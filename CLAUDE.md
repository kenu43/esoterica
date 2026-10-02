# Universo Esotérico — contexto para Claude

Web de 3 tiendas esotéricas familiares en Ibagué (El Sortilegio 1981, La Colonia 2004, Loto & Nirvana 2023).
Todo el contenido y la UI van en **español de Colombia**. Muestra precios; NO es e-commerce: la venta se
cierra por WhatsApp: lista de consulta, encargos y contacto abren un chat con el mensaje ya escrito
(número de La Colonia, `SITE.ordersWhatsapp`). No hay correos ni backend.

## Repo
- `frontend/` React 19 + Vite 8 + TS + HeroUI **v3** + Tailwind 4 + Motion + GSAP. pnpm 11.
- `studio-universo-esoterico/` Sanity Studio v6 (projectId `rx1vv2w8`, dataset `production`).
- Firebase project `esoterica-app`: solo Hosting (+ Analytics). Sin Cloud Functions.

## Comandos
`pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm --dir frontend exec tsc -b` · `pnpm studio` ·
`pnpm --dir studio-universo-esoterico build`

## Catálogo
Reglas de carga/actualización/eliminación por Excel, categorías, visibilidad y videos: ver [docs/CATALOGO.md](docs/CATALOGO.md). Comando: `pnpm --dir studio-universo-esoterico sync:referencias <archivo.xlsx> [--dry|--remove|--replace]`.

## Arquitectura frontend (Feature-Sliced Design)
`app → pages → widgets → features → entities → shared`. Solo se importa hacia capas inferiores y por el
`index.ts` de cada slice. Alias `@/` = `frontend/src`.
- Datos de producto: `entities/product/api` → `productRepository` (Sanity + fallback a `mockData.ts`).
  Si agregas campos: tipo `model/types.ts`, GROQ + mapper en `sanity.repository.ts`, schema en el Studio.
- Mapeo de ids compartidos: tiendas (`el-sortilegio|la-colonia|loto-nirvana`) y categorías deben coincidir
  entre `entities/branch`, `entities/category` y `studio…/schemaTypes/constants.ts`.
- Formularios: RHF + zod + `shared/ui/form/FormFields.tsx`; envío = `buildFormMessage` + `openWhatsApp` (`shared/lib/whatsapp.ts`).
- Categorías y glosario también vienen de Sanity (`entities/category`, `entities/glossary`) con respaldo local (`*.data.ts`).
  Los selectores de tienda usan `BRANCH_CHOICES` (incluye "La que tenga disponibilidad"; por defecto La Colonia).
- SEO por página: `useSeo()` de `shared/hooks` (title, description, JSON-LD).

## Gotchas de HeroUI v3 (React Aria)
- Compound components (`Select.Trigger`, `Drawer.Content`…), sin Provider. `onPress`, no `onClick`.
- Switch/Checkbox: control y `Label` DENTRO de `Switch.Content` / `Checkbox.Content` (si no, no son clicables).
- Select usa `value`/`onChange`; ComboBox usa `selectedKey`/`onSelectionChange`.
- `Drawer.Content` no debe llevar clases de ancho (rompe `placement`); el ancho va en `Drawer.Dialog`.
- Links como botón: `<Link className={buttonVariants({variant})}>`.
- `@sanity/icons` v5: importar por ruta (`@sanity/icons/Tag`).

## Estilo (feedback del cliente)
- Tipografía: Unbounded (títulos, peso 400) + Figtree (texto). Nada de Cormorant ni serif "IA".
- Sin emojis decorativos (usar lucide o `LotusIcon`), sin MAYÚSCULAS con tracking en etiquetas,
  brillos sutiles y lentos. Decoración con loto/sakura (`shared/ui/Florals.tsx`).
- Tono de textos: protección, limpieza, suerte, santos, Santa Muerte, velones, baños, riegos; cercano y
  colombiano, sin sonar a IA. Opiniones con jerga natural.

## No hacer
- No poner secretos en el frontend.
- No volver a agregar envío de correos ni Cloud Functions (se eliminaron a propósito).
- No usar Firestore para el catálogo (se decidió Sanity).
