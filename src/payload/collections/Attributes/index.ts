import { CollectionConfig } from 'payload/types';

export const Attributes: CollectionConfig = {
  slug: 'attributes',
  labels: {
    plural: {
      en: 'Attributes',
      fr: 'Les attributs',
    },
    singular: {
      en: 'Attribute',
      fr: 'Attribut',
    },
  },
  admin: {
    useAsTitle: 'attribute',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Attribute',
        fr: 'Attribut',
      },
      name: 'attribute',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
  ],
};
