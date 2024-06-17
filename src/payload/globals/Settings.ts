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
    {
      name: 'categoriesOrder',
      label: {
        en: 'Categories order',
        fr: 'Ordre des catégories',
      },
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      filterOptions: { parent: { exists: false } },
    },
    {
      name: 'featuredProducts',
      label: {
        en: 'Featured products',
        fr: 'Produits en vedette',
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      maxRows: 6,
    },
  ],
};
