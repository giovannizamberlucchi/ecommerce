import { PRODUCT_CATEGORIES } from './categories';
import { LINK_FIELDS } from './link';
import { META } from './meta';

export const HEADER = `
  Header {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`;

export const HEADER_QUERY = `
query Header {
  ${HEADER}
}
`;

export const FOOTER = `
  Footer {
    copyright
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`;

export const FOOTER_QUERY = `
query Footer {
  ${FOOTER}
}
`;

export const SETTINGS = `
  Settings {
    productsPage {
      slug
    }
    teamEmail
    categoriesOrder {
      id
      title
    }
    featuredProducts {
      id
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
    }
  }
`;

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`;
