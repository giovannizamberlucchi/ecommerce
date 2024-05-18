import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks';
import { PRODUCT_CATEGORIES } from './categories';
import { META } from './meta';

export const PRODUCTS = (variables?: Record<string, unknown>) => `
  query Products($filterCategoriesByIds: [JSON], $page: Int, $limit: Int = 300) {
    Products(where: { AND: [ { categories: { in: $filterCategoriesByIds } }${
      variables && 'attributes' in variables
        ? Object.entries(variables.attributes as Record<string, string[]>)
            .map(
              ([key, values]) =>
                `, { AND: [ { attributes__type: { equals: "${key}" } }, {attributes__value: { in: ${JSON.stringify(Array.isArray(values) ? values : [values])} } } ] }`,
            )
            .join('')
        : ''
    } ] }, limit: $limit, page: $page) {
      docs {
        id
        slug
        title
        priceJSON
        ${PRODUCT_CATEGORIES}
        ${META}
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
        stripeProductID
        ${PRODUCT_CATEGORIES}
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        priceJSON
        enablePaywall
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

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`;
