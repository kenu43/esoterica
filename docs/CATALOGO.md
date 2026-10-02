# Catálogo: cómo cargar, actualizar y eliminar productos

Guía para quien administre el catálogo (Sanity) y para futuras sesiones de Claude. Todo el contenido va en español de Colombia.

## Dónde vive cada cosa

| Qué | Dónde |
| --- | --- |
| Panel donde se editan productos | https://universo-esoterico.sanity.studio/ |
| Esquema (campos) | `studio-universo-esoterico/schemaTypes/*.ts` |
| Script de carga masiva por Excel | `studio-universo-esoterico/scripts/sync-referencias.ts` |
| Reglas de textos/intenciones/categorías automáticas | `studio-universo-esoterico/scripts/enrich.ts` y `knowledge.ts` |
| Plantilla de Excel con listas desplegables | `studio-universo-esoterico/export/plantilla-productos-universo-esoterico.xlsx` |
| Producto de ejemplo (todos los campos) | `scripts/create-example-product.ts` (queda **oculto** en la web) |

## Categorías (una por cada Grupo del inventario)

Los ids (slug) deben coincidir entre Sanity, `frontend/src/entities/category/model/categories.data.ts` (respaldo local) y `studio…/scripts/enrich.ts`.

`figuras`, `santa-muerte`, `velas`, `riegos`, `inciensos`, `bisuteria`, `suerte`, `duendes`, `piedras`, `san-diego`, `rituales`, `perfumeria`, `jabones`, `libreria`, `natural`, `trucos`, `extractos`, `otros`.

Grupo del Excel → categoría: Figuras religiosas→figuras, Santas muertes→santa-muerte, Velas y veladoras→velas, Riegos y sales→riegos, Inciensos y sahumerios→inciensos, Bisutería y accesorios→bisuteria, Suerte y Feng Shui→suerte, Duendes→duendes, Piedras y cuarzos→piedras, San Diego→san-diego, Rituales y santería→rituales, Perfumería→perfumeria, Jabones→jabones, Librería y novenas→libreria, Sexual y natural→natural, Químicos y trucos→trucos, Extractos→extractos. Sin grupo→otros.

Si se crea una categoría nueva: agrégala en Sanity **y** en `categories.data.ts` (con su imagen de respaldo en `public/images/products`) **y** en `enrich.ts`. El ícono se elige en el campo "Ícono" (hay uno distinto por categoría).

## Reglas del Excel de inventario

- Columnas mínimas: **Grupo, Nombre, Código de barras, Precio de venta**.
- **Precio 0 o vacío** → el producto se carga sin precio y la web muestra "Precio a consultar".
- **Sin grupo** → categoría "Otros".
- **Nombres que contienen "sin especificar" NO se cargan** (y si ya estaban en Sanity se borran al sincronizar). Son filas genéricas del inventario.
- Los nombres en MAYÚSCULAS se pasan a formato normal ("Cuarzo Citrino").
- **Código de barras**: se guarda en el campo `barcode` (no se ve en la web) y sirve para reconocer el producto en futuras cargas. **No es único**: 83 códigos se repiten en el inventario y 37 filas traen "." como código. Cuando un código está repetido o inválido, el producto se reconoce por su **nombre**; por eso, si cambias un nombre cuyo código esté repetido, se tomará como producto nuevo.
- Todos los productos nuevos se cargan en **las tres tiendas**, disponibles y visibles.
- Cada producto nuevo sale con: descripción, frase corta, puntos clave, "cómo se usa", intenciones, temporada (si el nombre menciona Navidad, Semana Santa, etc.) y palabras de búsqueda, generados por reglas en `enrich.ts` / `knowledge.ts` (santos, colores de velas, formatos). Son un punto de partida: se pueden editar en el panel o por Excel.
- "Más pedido" (`destacado`) y "Nuevo" se asignan automáticamente a productos de buen precio ($3.000–$60.000) y alta demanda, repartidos entre categorías (máx. 36 y 24).

## Comandos (desde la raíz del repo)

Siempre con sesión iniciada en Sanity (`pnpm --dir studio-universo-esoterico exec sanity login`).

```bash
# Ver qué haría, sin tocar nada
pnpm --dir studio-universo-esoterico sync:referencias "C:\ruta\Archivo.xlsx" --dry

# ACTUALIZAR por código/nombre y CREAR los que no existan (no toca fotos ni lo que no esté en el Excel)
pnpm --dir studio-universo-esoterico sync:referencias "C:\ruta\Archivo.xlsx"

# ELIMINAR de la web todos los productos que aparezcan en el Excel
pnpm --dir studio-universo-esoterico sync:referencias "C:\ruta\Archivo.xlsx" --remove

# EMPEZAR DE CERO: borra TODOS los productos y categorías y los crea otra vez (¡pierde fotos y ediciones!)
pnpm --dir studio-universo-esoterico sync:referencias "C:\ruta\Archivo.xlsx" --replace
```

- **Eliminar** (`--remove`): sirve para depurar. El Excel solo necesita las columnas Nombre y Código de barras de lo que se quiere sacar.
- **Actualizar nombres y precios**: se manda el Excel con los cambios; los productos se reconocen por código (o nombre). Las celdas vacías no borran nada.
- Para **ocultar sin borrar** usa "Mostrar en la página = No" (en el panel o en la columna de la plantilla).
- `--replace` pide cuidado: borra también las fotos asociadas a los productos (los archivos quedan en Sanity pero sin enlace).

## Plantilla con columnas completas

`export/plantilla-productos-universo-esoterico.xlsx` trae los 1.959 productos actuales y estas columnas (con listas desplegables que salen de Sanity): Categoría, Frase corta, Descripción completa, Puntos clave, Cómo se usa, Intención 1-3, Temporada, Fase lunar, las tres tiendas (Sí/No), Disponible, Mostrar en la página, Etiqueta, Precio antes, Descuento %, Presentación, Colores, Enlace de video, Palabras de búsqueda.

Se importa con el mismo comando de arriba (sin flags). Reglas: celda vacía = no cambia nada; las listas solo aceptan valores existentes en Sanity (hoja "Listas"). **Si se crea una categoría, intención o temporada nueva en Sanity, hay que regenerar la plantilla** (o añadir el valor en la hoja "Listas").

Fotos y videos **no** se cargan por Excel (se suben en el panel); el enlace de YouTube/Vimeo sí.

## Visible, agotado y oculto

- `inStock` ("Disponible") = No → sigue visible con la marca "Agotado por ahora".
- `visible` ("Mostrar en la página") = No → desaparece de listados, buscador, detalle y conteos de categorías. En el panel hay una lista "Ocultos en la web".
- Los documentos sin el campo `visible` (anteriores) se tratan como visibles.

## Fotos y videos

- Sin foto, la web muestra un fondo morado con loto y el ícono de la categoría (`ProductImage`).
- Videos: en el producto, campo **Video** (archivo MP4, ideal < 50 MB, corto y vertical) o **Enlace de video** (YouTube/Vimeo, mejor para videos largos). El archivo tiene prioridad. Se muestra bajo la galería del detalle (`ProductVideo`).

## Rendimiento del listado

- `/productos` pagina en el servidor (GROQ, 24 por tanda, "Cargar más" + carga automática al llegar al final). Filtros, orden y búsqueda se resuelven en Sanity.
- La búsqueda espera 400 ms desde la última tecla y exige que **todas** las palabras aparezcan (nombre, frase corta, etiquetas o código).
- Nadie debe pedir "todo el catálogo": usar `useProducts({ category, limit })`, `useProductFeed(filter)`, `useProduct(slug)` o `useCategoryCounts()`.

## Asistente Merlín

Pide solo los productos relacionados con la conversación (búsqueda por palabras del último mensaje + algunos populares, máx. 20) y reintenta una vez si el servidor falla. El worker (`assistant-worker`) acepta máx. 25 productos y prueba tres modelos de Groq. Tras cambiar el worker hay que desplegarlo: `cd assistant-worker && npx wrangler deploy`.

## Despliegues

- Esquema del Studio: `pnpm --dir studio-universo-esoterico exec sanity deploy` (si no se despliega, el panel muestra "Unknown field" para campos nuevos).
- Frontend: Firebase Hosting (ver `CLAUDE.md`).
