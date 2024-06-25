import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
// import { Archive } from '../../blocks/ArchiveBlock';
// import { CallToAction } from '../../blocks/CallToAction';
// import { Content } from '../../blocks/Content';
// import { MediaBlock } from '../../blocks/MediaBlock';
import { slugField } from '../../fields/slug';
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock';
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts';
import { revalidateProduct } from './hooks/revalidateProduct';

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      en: 'Product',
      fr: 'Produit',
    },
    plural: {
      en: 'Products',
      fr: 'Produits',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  hooks: {
    afterChange: [revalidateProduct],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  endpoints: [
    {
      path: '/fix',
      method: 'get',
      handler: async ({ payload }, res) => {
        const { docs } = await payload.find({
          collection: 'products',
          limit: 1000,
        });

        await Promise.all(
          docs.map(
            async ({ id, price }) =>
              await payload.update({
                collection: 'products',
                id,
                data: {
                  price:
                    price && typeof price === 'string'
                      ? parseFloat(`${price}`.replaceAll(' ', '').replaceAll(',', '.'))
                      : 0,
                },
              }),
          ),
        );

        payload.logger.info('Fixed prices');
      },
    },
  ],
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
            if (siblingData._status === 'published' && !value) return new Date();

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
            en: 'Content',
            fr: 'Contenu',
          },
          fields: [
            {
              label: {
                en: 'Images',
                fr: 'Images',
              },
              name: 'images',
              type: 'array',
              fields: [
                {
                  type: 'upload',
                  label: false,
                  name: 'media',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              label: {
                en: 'Description',
                fr: 'Description',
              },
              required: true,
              name: 'description',
              type: 'textarea',
            },
            // {
            //   label: {
            //     en: 'Layout',
            //     fr: 'Mise en page',
            //   },
            //   name: 'layout',
            //   type: 'blocks',
            //   blocks: [CallToAction, Content, MediaBlock, Archive],
            // },
          ],
        },
        {
          label: {
            en: 'Details',
            fr: 'Détails',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  label: {
                    en: 'Product price',
                    fr: 'Prix du produit',
                  },
                  type: 'number',
                  required: true,
                },
                {
                  name: 'priceOption',
                  label: {
                    en: 'Price option',
                    fr: 'Options de prix',
                  },
                  type: 'select',
                  required: true,
                  defaultValue: 'oneTime',
                  options: [
                    {
                      label: {
                        en: 'One Time',
                        fr: 'Une fois',
                      },
                      value: 'oneTime',
                    },
                    {
                      label: {
                        en: 'Monthly',
                        fr: 'Mensuel',
                      },
                      value: 'monthly',
                    },
                    {
                      label: {
                        en: 'Yearly',
                        fr: 'Annuel',
                      },
                      value: 'yearly',
                    },
                  ],
                },
              ],
            },
            {
              label: {
                en: 'Suppliers',
                fr: 'Fournisseurs',
              },
              name: 'suppliers',
              type: 'relationship',
              relationTo: 'suppliers',
              required: true,
            },
          ],
        },
        {
          label: {
            en: 'Attributes',
            fr: 'Attributs',
          },
          fields: [
            {
              label: {
                en: 'Attributes',
                fr: 'Attributs',
              },
              type: 'array',
              name: 'attributes',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      label: {
                        en: 'Attribute',
                        fr: 'Attribut',
                      },
                      type: 'relationship',
                      relationTo: 'attributes',
                      name: 'type',
                      required: true,
                      index: true,
                    },
                    {
                      label: {
                        en: 'Value',
                        fr: 'Valeur',
                      },
                      type: 'text',
                      name: 'value',
                      index: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: {
        en: 'Categories',
        fr: 'Catégories',
      },
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: {
        en: 'Related Products',
        fr: 'Produits connexes',
      },
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
    },
    slugField(),
  ],
};

export default Products;
