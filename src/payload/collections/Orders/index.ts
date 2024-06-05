import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn';
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy';
import { clearUserCart } from './hooks/clearUserCart';
import { populateOrderedBy } from './hooks/populateOrderedBy';
import { updateUserPurchases } from './hooks/updateUserPurchases';
import { sendOrderInfoToEmail } from './hooks/sendOrderInfoToEmail';

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    plural: {
      en: 'Orders',
      fr: 'Commandes',
    },
    singular: {
      en: 'Order',
      fr: 'Commande',
    },
  },
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: (doc) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart, sendOrderInfoToEmail],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      label: {
        en: 'Ordered By',
        fr: 'Commandé par',
      },
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      label: {
        en: 'Total',
        fr: 'Total',
      },
      name: 'total',
      type: 'number',
      min: 0,
    },
    {
      label: {
        en: 'Items',
        fr: 'Articles',
      },
      name: 'items',
      type: 'array',
      fields: [
        {
          label: {
            en: 'Product',
            fr: 'Produit',
          },
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          label: {
            en: 'Price',
            fr: 'Prix',
          },
          name: 'price',
          type: 'text',
        },
        {
          label: {
            en: 'Quantity',
            fr: 'Quantité',
          },
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      label: {
        en: 'Status',
        fr: 'Statut',
      },
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        {
          label: {
            en: 'Pending',
            fr: 'En attente',
          },
          value: 'pending',
        },
        {
          label: {
            en: 'Completed',
            fr: 'Complété',
          },
          value: 'completed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
