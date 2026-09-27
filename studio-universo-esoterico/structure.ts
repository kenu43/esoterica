import { BookIcon } from '@sanity/icons/Book'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { CalendarIcon } from '@sanity/icons/Calendar'
import { CommentIcon } from '@sanity/icons/Comment'
import { HomeIcon } from '@sanity/icons/Home'
import { SparkleIcon } from '@sanity/icons/Sparkle'
import { TagIcon } from '@sanity/icons/Tag'
import { ThListIcon } from '@sanity/icons/ThList'
import { WarningOutlineIcon } from '@sanity/icons/WarningOutline'
import type { StructureResolver } from 'sanity/structure'
import { STORES } from './schemaTypes/constants'

/**
 * Menú lateral del panel: productos agrupados por tienda y por categoría,
 * más atajos a agotados, categorías, glosario y opiniones. Así tu hermano encuentra todo en 2 clics.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Universo Esotérico')
    .items([
      S.listItem()
        .title('Todos los productos')
        .icon(TagIcon)
        .child(S.documentTypeList('product').title('Todos los productos')),
      S.divider(),
      ...STORES.map((store) =>
        S.listItem()
          .title(store.title)
          .icon(HomeIcon)
          .child(
            S.documentList()
              .title(store.title)
              .schemaType('product')
              .filter('_type == "product" && $store in stores')
              .params({ store: store.value })
              .initialValueTemplates([]),
          ),
      ),
      S.divider(),
      S.listItem()
        .title('Productos por categoría')
        .icon(TagIcon)
        .child(
          S.documentTypeList('category')
            .title('Elige una categoría')
            .child((categoryId) =>
              S.documentList()
                .title('Productos')
                .schemaType('product')
                .filter('_type == "product" && category._ref == $categoryId')
                .params({ categoryId }),
            ),
        ),
      S.listItem()
        .title('Agotados')
        .icon(WarningOutlineIcon)
        .child(
          S.documentList()
            .title('Agotados')
            .schemaType('product')
            .filter('_type == "product" && inStock == false'),
        ),
      S.divider(),
      S.listItem()
        .title('Categorías (crear y editar)')
        .icon(ThListIcon)
        .child(S.documentTypeList('category').title('Categorías')),
      S.listItem()
        .title('Temporadas (Navidad, etc.)')
        .icon(CalendarIcon)
        .child(S.documentTypeList('season').title('Temporadas')),
      S.listItem()
        .title('Intenciones (amor, protección…)')
        .icon(SparkleIcon)
        .child(S.documentTypeList('intention').title('Intenciones')),
      S.listItem()
        .title('Aprende y Sanar (artículos)')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('article').title('Artículos')),
      S.listItem()
        .title('Glosario místico')
        .icon(BookIcon)
        .child(S.documentTypeList('glossaryTerm').title('Glosario místico')),
      S.listItem()
        .title('Opiniones de clientes')
        .icon(CommentIcon)
        .child(S.documentTypeList('testimonial').title('Opiniones de clientes')),
    ])
