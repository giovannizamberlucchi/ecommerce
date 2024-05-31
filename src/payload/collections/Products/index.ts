import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { Archive } from '../../blocks/ArchiveBlock';
import { CallToAction } from '../../blocks/CallToAction';
import { Content } from '../../blocks/Content';
import { MediaBlock } from '../../blocks/MediaBlock';
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
            en: 'Content',
            fr: 'Contenu',
          },
          fields: [
            {
              label: {
                en: 'Description',
                fr: 'Description',
              },
              required: true,
              name: 'description',
              type: 'textarea',
            },
            {
              label: {
                en: 'Layout',
                fr: 'Mise en page',
              },
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: {
            en: 'Product Details',
            fr: 'Détails du produit',
          },
          fields: [
            {
              name: 'price',
              label: {
                en: 'Product price',
                fr: 'Prix du produit',
              },
              type: 'number',
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
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        };
      },
    },
    slugField(),
    {
      name: 'skipSync',
      label: {
        en: 'Skip Sync',
        fr: 'Ignorer la synchronisation',
      },
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
};

export default Products;
