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
