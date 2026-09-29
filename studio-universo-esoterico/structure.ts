import type { StructureResolver } from 'sanity/structure'
import { emojiIcon } from './schemaTypes/emojiIcon'
import { STORES } from './schemaTypes/constants'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Panel de catálogo')
    .items([
      S.listItem()
        .title('Todos los productos')
        .icon(emojiIcon('🛍️'))
        .child(S.documentTypeList('product').title('Todos los productos')),
      S.divider(),
      ...STORES.map((store) =>
        S.listItem()
          .title(store.title)
          .icon(emojiIcon('🏪'))
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
        .icon(emojiIcon('🗂️'))
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
        .icon(emojiIcon('⚠️'))
        .child(
          S.documentList()
            .title('Agotados')
            .schemaType('product')
            .filter('_type == "product" && inStock == false'),
        ),
      S.divider(),
      S.listItem()
        .title('Categorías (crear y editar)')
        .icon(emojiIcon('🗂️'))
        .child(S.documentTypeList('category').title('Categorías')),
      S.listItem()
        .title('Temporadas (Navidad, etc.)')
        .icon(emojiIcon('🎉'))
        .child(S.documentTypeList('season').title('Temporadas')),
      S.listItem()
        .title('Intenciones (amor, protección…)')
        .icon(emojiIcon('✨'))
        .child(S.documentTypeList('intention').title('Intenciones')),
      S.listItem()
        .title('Aprende y Sanar (artículos)')
        .icon(emojiIcon('📝'))
        .child(S.documentTypeList('article').title('Artículos')),
      S.listItem()
        .title('Glosario místico')
        .icon(emojiIcon('📖'))
        .child(S.documentTypeList('glossaryTerm').title('Glosario místico')),
      S.listItem()
        .title('Opiniones de clientes')
        .icon(emojiIcon('💬'))
        .child(S.documentTypeList('testimonial').title('Opiniones de clientes')),
    ])
