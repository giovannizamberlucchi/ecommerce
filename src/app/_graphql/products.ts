import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks';
import { PRODUCT_CATEGORIES } from './categories';
import { META } from './meta';

export const PRODUCTS = `#graphql
  query Products($filterCategoriesByIds: [JSON], $page: Int, $limit: Int = 300) {
    Products(where: { categories: { in: $filterCategoriesByIds } }, limit: $limit, page: $page) {
      docs {
        id
        slug
        title
        priceJSON
        ${PRODUCT_CATEGORIES}
        ${META}
      }
      hasNextPage
      hasPrevPage
      page
      totalPages
      totalDocs
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
