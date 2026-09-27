import { CommentIcon } from '@sanity/icons/Comment'
import { HomeIcon } from '@sanity/icons/Home'
import { TagIcon } from '@sanity/icons/Tag'
import { WarningOutlineIcon } from '@sanity/icons/WarningOutline'
import type { StructureResolver } from 'sanity/structure'
import { CATEGORIES, STORES } from './schemaTypes/constants'

/**
 * Menú lateral del panel: productos agrupados por tienda y por categoría,
 * más un atajo a los agotados. Así tu hermano encuentra todo en 2 clics.
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
        .title('Por categoría')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Categorías')
            .items(
              CATEGORIES.map((c) =>
                S.listItem()
                  .title(c.title)
                  .child(
                    S.documentList()
                      .title(c.title)
                      .schemaType('product')
                      .filter('_type == "product" && category == $category')
                      .params({ category: c.value }),
                  ),
              ),
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
        .title('Opiniones de clientes')
        .icon(CommentIcon)
        .child(S.documentTypeList('testimonial').title('Opiniones de clientes')),
    ])
