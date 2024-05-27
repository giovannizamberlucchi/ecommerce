import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { Archive } from '../../blocks/ArchiveBlock';
import { CallToAction } from '../../blocks/CallToAction';
import { Content } from '../../blocks/Content';
import { MediaBlock } from '../../blocks/MediaBlock';
import { hero } from '../../fields/hero';
import { slugField } from '../../fields/slug';
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock';
import { adminsOrPublished } from './access/adminsOrPublished';
import { revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    plural: {
      en: 'Pages',
      fr: 'Pages',
    },
    singular: {
      en: 'Page',
      fr: 'Page',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  hooks: {
    afterChange: [revalidatePage],
    afterRead: [populateArchiveBlock],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
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
        en: 'Published On',
        fr: 'Publié le',
      },
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Hero',
            fr: 'Héro',
          },
          fields: [hero],
        },
        {
          label: {
            en: 'Content',
            fr: 'Contenu',
          },
          fields: [
            {
              label: {
                en: 'Layout',
                fr: 'Mise en page',
              },
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
};
