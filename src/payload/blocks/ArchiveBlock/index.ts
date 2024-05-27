import type { Block } from 'payload/types';

import richText from '../../fields/richText';

export const Archive: Block = {
  slug: 'archive',
  labels: {
    singular: {
      en: 'Archive',
      fr: 'Archive',
    },
    plural: {
      en: 'Archives',
      fr: 'Archives',
    },
  },
  fields: [
    richText({
      name: 'introContent',
      label: {
        en: 'Intro Content',
        fr: "Contenu d'introduction",
      },
    }),
    {
      label: {
        en: 'Populate By',
        fr: 'Peupler par',
      },
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: {
            en: 'Collection',
            fr: 'Collection',
          },
          value: 'collection',
        },
        {
          label: {
            en: 'Individual Selection',
            fr: 'Sélection individuelle',
          },
          value: 'selection',
        },
      ],
    },
    {
      type: 'select',
      name: 'relationTo',
      label: {
        en: 'Collections To Show',
        fr: 'Collections à afficher',
      },
      defaultValue: 'products',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: [
        {
          label: {
            en: 'Products',
            fr: 'Produits',
          },
          value: 'products',
        },
      ],
    },
    {
      type: 'relationship',
      name: 'categories',
      label: {
        en: 'Categories To Show',
        fr: 'Catégories à afficher',
      },
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'number',
      name: 'limit',
      label: {
        en: 'Limit',
        fr: 'Limite',
      },
      defaultValue: 10,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
    },
    {
      type: 'relationship',
      name: 'selectedDocs',
      label: {
        en: 'Selection',
        fr: 'Sélection',
      },
      relationTo: ['products'],
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },
    {
      type: 'relationship',
      name: 'populatedDocs',
      label: {
        en: 'Populated Docs',
        fr: 'Documents peuplés',
      },
      relationTo: ['products'],
      hasMany: true,
      admin: {
        disabled: true,
        description: {
          en: 'This field is auto-populated after-read',
          fr: 'Ce champ est renseigné automatiquement après lecture',
        },
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'number',
      name: 'populatedDocsTotal',
      label: {
        en: 'Populated Docs Total',
        fr: 'Total des documents peuplés',
      },
      admin: {
        step: 1,
        disabled: true,
        description: {
          en: 'This field is auto-populated after-read',
          fr: 'Ce champ est renseigné automatiquement après lecture',
        },
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
  ],
};
