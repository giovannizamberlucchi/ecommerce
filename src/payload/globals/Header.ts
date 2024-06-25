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
        en: 'Header Logo',
        fr: "Logo d'en-tête",
      },
      admin: {
        description: {
          en: 'The logo is placed in the header and on the Login, Create account, Recover password pages',
          fr: "Le logo est placé dans l'en-tête et sur les pages Connexion, Créer un compte, Récupérer le mot de passe",
        },
      },
      name: 'media',
      type: 'upload',
      relationTo: 'media',
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
