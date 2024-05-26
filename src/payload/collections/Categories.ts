import { slateEditor } from '@payloadcms/richtext-slate';
import type { CollectionConfig } from 'payload/types';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['textAlign'],
        },
      }),
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      admin: {
        position: 'sidebar',
      },
      index: true,
      label: 'URL Slug',
      name: 'slug',
      type: 'text',
      required: true,
    },
  ],
};

export default Categories;
