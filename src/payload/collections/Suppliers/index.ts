import { CollectionConfig } from 'payload/types';

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  labels: {
    plural: {
      en: 'Suppliers',
      fr: 'Fournisseurs',
    },
    singular: {
      en: 'Supplier',
      fr: 'Fournisseur',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Name',
        fr: 'Nom',
      },
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Email',
        fr: 'E-mail',
      },
      name: 'email',
      type: 'text',
      required: true,
    },
  ],
};
