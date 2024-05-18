import { CollectionConfig } from 'payload/types';

export const Attributes: CollectionConfig = {
  slug: 'attributes',
  admin: {
    useAsTitle: 'attribute',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'attribute',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
  ],
};
