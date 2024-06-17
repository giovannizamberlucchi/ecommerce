import { slateEditor } from '@payloadcms/richtext-slate';
import type { CollectionConfig } from 'payload/types';

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    plural: {
      en: 'Categories',
      fr: 'Catégories',
    },
    singular: {
      en: 'Category',
      fr: 'Catégorie',
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Title',
        fr: 'Titre',
      },
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Description',
        fr: 'Description',
      },
      name: 'description',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['textAlign'],
        },
      }),
    },
    {
      label: {
        en: 'Media',
        fr: 'Médias',
      },
      name: 'media',
      type: 'upload',
      relationTo: 'media',
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
      filterOptions: ({ id }) => ({ parent: { equals: id } }),
    },
    {
      label: {
        en: 'URL Slug',
        fr: "Limace d'URL",
      },
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Categories;
