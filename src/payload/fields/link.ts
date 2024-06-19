import type { Field } from 'payload/types';

import deepMerge from '../utilities/deepMerge';

export const appearanceOptions = {
  primary: {
    label: {
      en: 'Primary Button',
      fr: 'Bouton principal',
    },
    value: 'primary',
  },
  secondary: {
    label: {
      en: 'Secondary Button',
      fr: 'Bouton secondaire',
    },
    value: 'secondary',
  },
  default: {
    label: {
      en: 'Default',
      fr: 'Défaut',
    },
    value: 'default',
  },
};

export type LinkAppearances = 'primary' | 'secondary' | 'default';

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
}) => Field;

const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    label: {
      en: 'Link',
      fr: 'Lien',
    },
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            label: {
              en: 'Link Type',
              fr: 'Type de lien',
            },
            type: 'radio',
            options: [
              {
                label: {
                  en: 'Internal link',
                  fr: 'Lien interne',
                },
                value: 'reference',
              },
              {
                label: {
                  en: 'Custom URL',
                  fr: 'URL personnalisée',
                },
                value: 'custom',
              },
            ],
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
          },
          {
            name: 'newTab',
            label: {
              en: 'Open in new tab',
              fr: 'Ouvrir dans un nouvel onglet',
            },
            type: 'checkbox',
            admin: {
              width: '50%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      label: {
        en: 'Document to link to',
        fr: 'Document vers lequel créer un lien',
      },
      type: 'relationship',
      relationTo: ['pages'],
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      label: {
        en: 'Custom URL',
        fr: 'URL personnalisée',
      },
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
  ];

  if (!disableLabel) {
    (linkTypes || []).map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }));

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          label: {
            en: 'Label',
            fr: 'Étiquette',
          },
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'icon',
          label: {
            en: 'Icon',
            fr: 'Icône',
          },
          type: 'upload',
          relationTo: 'media',
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.primary, appearanceOptions.secondary];

    if (appearances) {
      appearanceOptionsToUse = (appearances || []).map((appearance) => appearanceOptions[appearance]);
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      admin: {
        description: 'Choose how the link should be rendered.',
      },
    });
  }

  return deepMerge(linkResult, overrides);
};

export default link;
