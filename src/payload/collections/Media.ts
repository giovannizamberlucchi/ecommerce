import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: {
      en: 'Media',
      fr: 'Médias',
    },
    singular: {
      en: 'Media',
      fr: 'Médias',
    },
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Alt Text',
        fr: 'Texte alternatif',
      },
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Caption',
        fr: 'Légende',
      },
      name: 'caption',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['link'],
        },
      }),
    },
  ],
};
