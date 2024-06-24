import type { GlobalConfig } from 'payload/types';

export const Home: GlobalConfig = {
  slug: 'home',
  label: {
    en: 'Home',
    fr: 'Maison',
  },
  typescript: {
    interface: 'Home',
  },
  graphQL: {
    name: 'Home',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: {
        en: 'Hero',
        fr: 'Héros',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              label: {
                en: 'Title',
                fr: 'Titre',
              },
              required: true,
              type: 'text',
            },
            {
              name: 'subtitle',
              label: {
                en: 'Subtitle',
                fr: 'Sous-titre',
              },
              required: true,
              type: 'text',
            },
          ],
        },
        {
          name: 'description',
          label: {
            en: 'Description',
            fr: 'Description',
          },
          required: true,
          type: 'textarea',
        },

        {
          name: 'youtubeId',
          label: {
            en: 'Youtube video id',
            fr: 'Identifiant de la vidéo Youtube',
          },
          type: 'text',
          required: true,
          admin: {
            placeholder: {
              en: 'e.g. bxWsZTtqs80',
              fr: 'par exemple: bxWsZTtqs80',
            },
          },
        },

        {
          name: 'textWithCheckIconArray',
          label: {
            en: 'Text with Check icon',
            fr: 'Texte avec icône de vérification',
          },
          labels: {
            singular: {
              en: 'Text with Check icon',
              fr: 'Texte avec icône de vérification',
            },
            plural: {
              en: 'Text with Check icon',
              fr: 'Textes avec icône de vérification',
            },
          },
          type: 'array',
          fields: [
            {
              name: 'text',
              label: {
                en: 'Text',
                fr: 'Texte',
              },
              required: true,
              type: 'text',
            },
          ],
          minRows: 2,
          maxRows: 8,
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      label: {
        en: 'Our services',
        fr: 'Nos services',
      },
      fields: [
        {
          name: 'subtitle',
          label: {
            en: 'Subtitle',
            fr: 'Sous-titre',
          },
          required: true,
          type: 'text',
        },
        {
          name: 'description',
          label: {
            en: 'Description',
            fr: 'Description',
          },
          required: true,
          type: 'textarea',
        },
        {
          name: 'carousels',
          label: {
            en: 'Carousels',
            fr: 'Carrousels',
          },
          type: 'array',
          fields: [
            {
              name: 'title',
              label: {
                en: 'Title',
                fr: 'Titre',
              },
              required: true,
              type: 'text',
            },
            {
              name: 'services',
              label: {
                en: 'Services',
                fr: 'Services',
              },
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'url',
                      label: {
                        en: 'Link',
                        fr: 'Lien',
                      },
                      required: true,
                      type: 'text',
                    },
                    {
                      type: 'upload',
                      label: {
                        en: 'Image',
                        fr: 'Image',
                      },
                      name: 'media',
                      required: true,
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
          minRows: 1,
          maxRows: 4,
        },
        {
          name: 'typingEffectTextArray',
          label: {
            en: 'Typing effect texts',
            fr: 'Saisie de textes à effet',
          },
          labels: {
            singular: {
              en: 'Typing effect text',
              fr: 'Texte à effet de frappe',
            },
            plural: {
              en: 'Typing effect texts',
              fr: 'Textes à effet de frappe',
            },
          },
          type: 'array',
          fields: [
            {
              name: 'text',
              label: false,
              type: 'text',
              required: true,
              admin: {
                placeholder: {
                  en: 'e.g Entretien véhicule',
                  fr: 'par exemple Entretien des véhicules',
                },
              },
            },
          ],
          minRows: 1,
        },
      ],
    },
    {
      name: 'processDescription',
      type: 'group',
      label: {
        en: 'Process description',
        fr: 'Description du processus',
      },
      fields: [
        {
          name: 'subtitle',
          label: {
            en: 'Subtitle',
            fr: 'Sous-titre',
          },
          required: true,
          type: 'text',
        },
        {
          name: 'description',
          label: {
            en: 'Description',
            fr: 'Description',
          },
          required: true,
          type: 'text',
        },
        {
          name: 'carousel',
          label: {
            en: 'Carousel cards',
            fr: 'Cartes carrousel',
          },
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  label: {
                    en: 'Title',
                    fr: 'Titre',
                  },
                  required: true,
                  type: 'text',
                },
                {
                  name: 'media',
                  label: {
                    en: 'Icon',
                    fr: 'Icône',
                  },
                  required: true,
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'description',
              label: {
                en: 'Description',
                fr: 'Description',
              },
              required: true,
              type: 'textarea',
            },
          ],
          minRows: 1,
        },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'sliderArray',
          label: {
            en: 'Featured products preview carousel',
            fr: 'Carrousel d’aperçu des produits en vedette',
          },
          // labels: {
          //   singular: {
          //     en: 'Slider',
          //     fr: 'Curseur',
          //   },
          //   plural: {
          //     en: 'Sliders',
          //     fr: 'Curseurs',
          //   },
          // },
          type: 'array',
          fields: [
            {
              type: 'upload',
              name: 'media',
              label: {
                en: 'Image',
                fr: 'Image',
              },
              relationTo: 'media',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  label: {
                    en: 'Title',
                    fr: 'Titre',
                  },
                  required: true,
                  type: 'text',
                },
                {
                  name: 'subtitle',
                  label: {
                    en: 'Subtitle',
                    fr: 'Sous-titre',
                  },
                  type: 'text',
                },
              ],
            },
            {
              name: 'description',
              label: {
                en: 'Description',
                fr: 'Description',
              },
              required: true,
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: {
                    en: 'Button text',
                    fr: 'Texte du bouton',
                  },
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  label: {
                    en: 'Link',
                    fr: 'Lien',
                  },
                  required: true,
                },
              ],
            },
          ],
          minRows: 1,
        },
      ],
    },
    {
      name: 'companyInNumbers',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'numbers',
          label: {
            en: 'Resovalie Achats in numbers',
            fr: 'Résovalie Achats en chiffres',
          },
          labels: {
            singular: {
              en: 'Number',
              fr: 'Nombre',
            },
            plural: {
              en: 'Numbers',
              fr: 'Chiffres',
            },
          },
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  label: {
                    en: 'Number',
                    fr: 'Nombre',
                  },
                  name: 'number',
                  required: true,
                  type: 'number',
                },
                {
                  admin: {
                    placeholder: {
                      en: 'e.g. %, $, + ',
                      fr: 'par exemple. %, $, +',
                    },
                  },
                  label: {
                    en: 'Suffix',
                    fr: 'Suffixe',
                  },
                  name: 'suffix',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              label: {
                en: 'Description',
                fr: 'Description',
              },
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
          minRows: 1,
          maxRows: 8,
        },
      ],
    },
  ],
};
