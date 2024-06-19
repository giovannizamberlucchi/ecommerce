import { META } from './meta';

export const PRODUCT_CATEGORIES = `categories {
  title
  id
  breadcrumbs {
    id
    label
  }
}`;

export const CATEGORIES = `#graphql
  query Categories {
    Categories(limit: 300) {
      docs {
        id
        title
        slug
        breadcrumbs {
          id
          label
          url
        }
        media {
          alt
          width
          height
          url
        }
        parent {
          id
          title
          media {
            alt
            width
            height
            url
          }
        }
      }
    }
  }
`;

export const CATEGORY = `#graphql
  query Category($slug: String, $breadcrumbUrl: String) {
    Categories(where: { slug: { equals: $slug }, breadcrumbs__url: { equals: $breadcrumbUrl } }, limit: 1) {
      docs {
        id
        title
        media {
          alt
          width
          height
          url
        }
        parent {
          id
          title
          media {
            alt
            width
            height
            url
          }
        }
        description
        featuredProducts {
          id
          slug
          title
          description
          ${PRODUCT_CATEGORIES}
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
          images {
            id
            media {
              id
              alt
              filename
              mimeType
              filesize
              width
              height
              url
            }
          }
        }
      }
    }
  }
`;
