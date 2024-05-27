import type { Block } from 'payload/types';

import { invertBackground } from '../../fields/invertBackground';

export const MediaBlock: Block = {
  labels: {
    singular: {
      en: 'Media Block',
      fr: 'Bloc Média',
    },
    plural: {
      en: 'Media Blocks',
      fr: 'Blocs Média',
    },
  },
  slug: 'mediaBlock',
  fields: [
    invertBackground,
    {
      label: {
        en: 'Position',
        fr: 'Position',
      },
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: {
            en: 'Default',
            fr: 'Défaut',
          },
          value: 'default',
        },
        {
          label: {
            en: 'Fullscreen',
            fr: 'Plein écran',
          },
          value: 'fullscreen',
        },
      ],
    },
    {
      label: {
        en: 'Media',
        fr: 'Média',
      },
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
