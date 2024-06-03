import type { GlobalConfig } from 'payload/types';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: {
    en: 'Settings',
    fr: 'Paramètres',
  },
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'productsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: {
        en: 'Products page',
        fr: 'Page des produits',
      },
    },
    {
      name: 'teamEmail',
      label: {
        en: 'RESOVALIE Team Email',
        fr: "E-mail de l'équipe RESOVALIE",
      },
      type: 'email',
    },
  ],
};
