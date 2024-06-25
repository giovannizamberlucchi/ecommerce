import { PRODUCT_CATEGORIES } from './categories';
import { LINK_FIELDS } from './link';
import { META } from './meta';

export const MEDIA = `
  media {
          alt
          width
          height
          url
          filename
        }
`;

export const HEADER = `
  Header {
    ${MEDIA}
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
    ${MEDIA}
    copyright
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
    businessClub {
      link
      icon {
          alt
          width
          height
          url
          filename
        }
    
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
        slug
        description
        ${PRODUCT_CATEGORIES}
        price
        priceOption
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
    contactEmail
    socialMedia {
      whatsAppUrlSlug
      linkedInUrlSlug
      instagramUrlSlug
    }
  }
`;

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`;

export const HOME_HERO = `
hero {
      title
      subtitle
      description
      youtubeId
      textWithCheckIconArray {
        text
      }
    }
`;

export const HOME_SERVICES = `
services {
      subtitle
      description
      carousels{
        title
        services {
          url
          ${MEDIA}
        }
      }
      typingEffectTextArray {
        text
      }
    }
`;

export const HOME_PROCESS_DESCRIPTION = `
processDescription {
      subtitle
      description
      carousel {
        title
        ${MEDIA}
        description
      }
    }
`;

export const HOME_FEATURED_PRODUCTS = `
featuredProducts {
      sliderArray {
        ${MEDIA}
        title
        subtitle
        description
        buttonText
        link
      }
    }
`;

export const HOME_COMPANY_IN_NUMBERS = `
companyInNumbers {
      numbers {
        number
        suffix
        description
      }
    }
`;

export const HOME = `
  Home {
    ${HOME_HERO}
    ${HOME_SERVICES}
    ${HOME_PROCESS_DESCRIPTION}
    ${HOME_FEATURED_PRODUCTS}
    ${HOME_COMPANY_IN_NUMBERS}
  }
`;

export const HOME_QUERY = `
query Home {
  ${HOME}
}
`;
