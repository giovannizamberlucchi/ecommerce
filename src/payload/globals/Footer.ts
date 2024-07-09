import type { GlobalConfig } from 'payload/types';

import link from '../fields/link';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    fr: 'Pied de page',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Footer Logo',
        fr: 'Logo de pied de page',
      },
      admin: {
        description: {
          en: 'The logo is placed in the footer',
          fr: 'Le logo est placé en pied de page',
        },
      },
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'copyright',
      label: {
        en: 'Copyright',
        fr: "Droits d'auteur",
      },
      type: 'text',
      // required: true,
    },
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
