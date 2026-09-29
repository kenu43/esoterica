import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCliClient } from 'sanity/cli'
import * as XLSX from 'xlsx'
import { STORES } from '../schemaTypes/constants.ts'

const client = getCliClient({ apiVersion: '2025-02-19' })
const root = dirname(fileURLToPath(import.meta.url))

const HEADERS = [
  'Enlace (no editar)',
  'Nombre',
  'Precio (COP)',
  'Precio antes',
  'Descuento %',
  'Presentación',
  'Frase corta',
  'Descripción completa',
  'Puntos clave (separados por ;)',
  'Categoría',
  'Categorías adicionales (separadas por ;)',
  'Tiendas (separadas por ;)',
  'Disponible',
  'Intenciones (separadas por ;)',
  'Fase lunar',
  'Temporada',
  'Cómo se usa',
  'Personalización',
  'Nombre de la opción (ej. Aroma)',
  'Opciones (nombre:precio; nombre:precio)',
  'Tamaños (nombre:precio; ...)',
  'Materiales (nombre:precio; ...)',
  'Colores (separados por ;)',
  'Palabras de búsqueda (separadas por ;)',
] as const

const example = {
  'Enlace (no editar)': '',
  Nombre: 'Esencia aromática',
  'Precio (COP)': 9000,
  'Precio antes': '',
  'Descuento %': '',
  Presentación: 'frasco 30 ml',
  'Frase corta': 'Esencia concentrada para difusor, riegos o sahumar.',
  'Descripción completa': 'Esencia aromática para difusor, riegos o sahumar. Disponible en varios aromas.',
  'Puntos clave (separados por ;)': 'Aroma concentrado; Rinde para varios usos',
  Categoría: 'Sahumerios e inciensos',
  'Categorías adicionales (separadas por ;)': '',
  'Tiendas (separadas por ;)': 'La Colonia; Loto & Nirvana',
  Disponible: 'Sí',
  'Intenciones (separadas por ;)': 'Abundancia; Amor',
  'Fase lunar': '',
  Temporada: '',
  'Cómo se usa': '1. Agrega unas gotas al difusor.\n2. También puedes usarla en riegos o sahumar con ella.',
  Personalización: '',
  'Nombre de la opción (ej. Aroma)': 'Aroma',
  'Opciones (nombre:precio; nombre:precio)': 'Canela; Chicle; Suerte rápida; Rosas; Sándalo',
  'Tamaños (nombre:precio; ...)': '',
  'Materiales (nombre:precio; ...)': '',
  'Colores (separados por ;)': '',
  'Palabras de búsqueda (separadas por ;)': 'esencia; aroma; riego',
}

const categories = await client.fetch<string[]>(`*[_type == "category"] | order(name asc).name`)
const intentions = await client.fetch<string[]>(`*[_type == "intention"] | order(name asc).name`)
const seasons = await client.fetch<string[]>(`*[_type == "season"] | order(name asc).name`)

const instructions = [
  { Campo: 'OBLIGATORIOS', 'Cómo llenarlo': 'Nombre, Frase corta y Categoría son obligatorios. Sin alguno de estos, la fila se omite al importar (verás el aviso en la terminal).' },
  { Campo: 'Precio (COP)', 'Cómo llenarlo': 'Opcional: si el precio varía o no se puede fijar uno, déjalo vacío. En la web aparecerá "Precio a consultar".' },
  { Campo: 'Enlace (no editar)', 'Cómo llenarlo': 'Déjalo vacío en productos nuevos. La web lo genera sola a partir del nombre.' },
  { Campo: 'Categoría', 'Cómo llenarlo': `Escribe EXACTAMENTE uno de estos nombres: ${categories.join(' · ')}` },
  { Campo: 'Tiendas', 'Cómo llenarlo': `Una o varias, separadas por ";": ${STORES.map((s) => s.title).join(' · ')}` },
  { Campo: 'Intenciones', 'Cómo llenarlo': intentions.length ? `Una o varias, separadas por ";": ${intentions.join(' · ')}` : 'Se crean desde el panel, en "Intenciones".' },
  { Campo: 'Temporada', 'Cómo llenarlo': seasons.length ? `Una de: ${seasons.join(' · ')} (o vacío)` : 'Se crean desde el panel, en "Temporadas" (o vacío).' },
  { Campo: 'Disponible', 'Cómo llenarlo': 'Escribe "Sí" o "No".' },
  { Campo: 'Fase lunar', 'Cómo llenarlo': 'nueva / creciente / llena / menguante (o vacío).' },
  { Campo: 'Opciones, Tamaños, Materiales', 'Cómo llenarlo': 'Formato "Nombre:Precio; Nombre:Precio". El precio es opcional: "Nombre; Nombre" también vale.' },
  { Campo: 'Colores, Puntos clave, Palabras de búsqueda', 'Cómo llenarlo': 'Varios valores separados por ";".' },
  { Campo: 'Subir los cambios', 'Cómo llenarlo': 'Guarda el archivo y corre: pnpm import:products export/plantilla-productos.xlsx (cambia el nombre del archivo si es otro).' },
]

const book = XLSX.utils.book_new()
const sheet = XLSX.utils.json_to_sheet([example], { header: HEADERS as unknown as string[] })
sheet['!cols'] = HEADERS.map((h) => ({ wch: Math.min(Math.max(h.length, 14), 42) }))
XLSX.utils.book_append_sheet(book, sheet, 'Productos')

const helpSheet = XLSX.utils.json_to_sheet(instructions)
helpSheet['!cols'] = [{ wch: 34 }, { wch: 100 }]
XLSX.utils.book_append_sheet(book, helpSheet, 'Instrucciones')

const outDir = resolve(root, '../export')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'plantilla-productos.xlsx')
XLSX.writeFile(book, outPath)

console.log('✓ export/plantilla-productos.xlsx creada, con un ejemplo y una hoja de instrucciones.')
console.log('  Agrega filas debajo del ejemplo (una por producto) y sube el archivo con: pnpm import:products')
