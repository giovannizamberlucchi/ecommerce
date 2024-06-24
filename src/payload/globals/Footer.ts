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
    {
      name: 'businessClub',
      label: {
        en: 'Business Clubs',
        fr: 'Business Clubs',
      },
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'text',
          label: {
            en: 'Link',
            fr: 'Lien',
          },
          required: true,
        },
        {
          name: 'icon',
          label: {
            en: 'Icon',
            fr: 'Icône',
          },
          required: true,
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};
