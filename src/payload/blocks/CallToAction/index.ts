import type { Block } from 'payload/types';

import { invertBackground } from '../../fields/invertBackground';
import linkGroup from '../../fields/linkGroup';
import richText from '../../fields/richText';

export const CallToAction: Block = {
  slug: 'cta',
  labels: {
    singular: {
      en: 'Call to Action',
      fr: "Appel à l'action",
    },
    plural: {
      en: 'Calls to Action',
      fr: "Appels à l'action",
    },
  },
  fields: [
    invertBackground,
    richText(),
    linkGroup({
      appearances: ['primary', 'secondary'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
};
