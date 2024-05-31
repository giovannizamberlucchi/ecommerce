import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks';
import { PRODUCT_CATEGORIES } from './categories';
import { META } from './meta';

export const PRODUCTS = (variables?: Record<string, unknown>) => `#graphql
  query Products($filterCategoriesByIds: [JSON], $page: Int, $limit: Int = 300, $sort: String) {
    Products(where: { AND: [ { categories: { in: $filterCategoriesByIds } }${
      variables && 'attributes' in variables
        ? Object.entries(variables.attributes as Record<string, string[]>)
            .map(
              ([key, values]) =>
                `, { AND: [ { attributes__type: { equals: "${key}" } }, {attributes__value: { in: ${JSON.stringify(Array.isArray(values) ? values : [values])} } } ] }`,
            )
            .join('')
        : ''
    } ] }, limit: $limit, page: $page, sort: $sort) {
      docs {
        id
        slug
        title
        description
        price
        ${PRODUCT_CATEGORIES}
        ${META}
        suppliers {
          name
          email
        }
        attributes {
          type {
            attribute
          }
          value
        }
      }
      hasNextPage
      hasPrevPage
      page
      totalPages
      totalDocs
    }
  }
`;

export const PRODUCTS_ATTRIBUTES = `#graphql
  query ProductsAttributes($filterCategoriesByIds: [JSON]) {
    Products(where: { categories: { in: $filterCategoriesByIds } }, limit: 10000) {
      docs {
        attributes {
            type {
              attribute
            }
            value
          }
      }
    }
  }
`;

export const PRODUCT = `#graphql
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        title
        description
        ${PRODUCT_CATEGORIES}
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        price
        suppliers {
          name
          email
        }
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`;
