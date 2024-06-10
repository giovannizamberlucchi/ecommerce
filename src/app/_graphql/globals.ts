import { LINK_FIELDS } from './link';

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
    sortingCategories {
      id
      title
    }
  }
`;

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`;
