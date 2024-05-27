import type { GlobalConfig } from 'payload/types';

import link from '../fields/link';

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    fr: 'En-tête',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Navigation Items',
        fr: 'Éléments de navigation',
      },
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
};
