import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { anyone } from '../../access/anyone';
import adminsAndUser from './access/adminsAndUser';
import { checkRole } from './checkRole';
import { customerProxy } from './endpoints/customer';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';
import { loginAfterCreate } from './hooks/loginAfterCreate';
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases';
import { CustomerSelect } from './ui/CustomerSelect';
import { signUp } from './endpoints/signUp';
import { success } from './endpoints/success';
import { createReferralCode } from './hooks/createReferralCode';
import { updateReferralsByReferrer } from './hooks/updateReferralsByReferrer';
import { updateReferrerByReferrals } from './hooks/updateReferrerByReferrals';
import { reSubscribe } from './endpoints/re-subscribe';
import { User } from '../../payload-types';

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: {
      en: 'Users',
      fr: 'Utilisateurs',
    },
    singular: {
      en: 'User',
      fr: 'Utilisateur',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: ({ req, token, user }) => {
        return `${(user as User | null)?.name ? `Hi, ${(user as User).name}!\n\n` : ''}You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}/reset-password?token=${token} \nIf you did not request this, please ignore this email and your password will remain unchanged.`;
      },
    },
  },
  endpoints: [
    {
      path: '/:teamID/customer',
      method: 'get',
      handler: customerProxy,
    },
    {
      path: '/success',
      method: 'get',
      handler: success,
    },
    {
      path: '/:teamID/customer',
      method: 'patch',
      handler: customerProxy,
    },
    {
      path: '/sign-up',
      method: 'post',
      handler: signUp,
    },
    {
      path: '/re-subscribe',
      method: 'post',
      handler: reSubscribe,
    },
  ],
  fields: [
    {
      label: {
        en: 'Name',
        fr: 'Nom',
      },
      name: 'name',
      type: 'text',
    },
    {
      label: {
        en: 'Roles',
        fr: 'Les rôles',
      },
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: {
            en: 'Admin',
            fr: 'Administrateur',
          },
          value: 'admin',
        },
        {
          label: {
            en: 'Customer',
            fr: 'Client',
          },
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      label: {
        en: 'Phone Number',
        fr: 'Numéro de téléphone',
      },
      name: 'phone',
      type: 'text',
    },
    {
      label: {
        en: 'Purchases',
        fr: 'Achats',
      },
      name: 'purchases',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      label: {
        en: 'Stripe Customer',
        fr: 'Client Stripe',
      },
      name: 'stripeCustomerID',
      type: 'text',
      admin: {
        position: 'sidebar',
        components: {
          Field: CustomerSelect,
        },
      },
    },
    {
      label: {
        en: 'Cart',
        fr: 'Panier',
      },
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: {
            en: 'Items',
            fr: 'Articles',
          },
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              label: {
                en: 'Product',
                fr: 'Produit',
              },
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              label: {
                en: 'Quantity',
                fr: 'Quantité',
              },
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
        // If you wanted to maintain a 'created on'
        // or 'last modified' date for the cart
        // you could do so here:
        // {
        //   name: 'createdOn',
        //   label: 'Created On',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
        // {
        //   name: 'lastModified',
        //   label: 'Last Modified',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
      ],
    },
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
    {
      label: {
        en: 'Referral Code',
        fr: 'Code de parrainage',
      },
      name: 'referralCode',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [createReferralCode],
      },
    },
    {
      label: {
        en: 'Referrer',
        fr: 'Référent',
      },
      name: 'referrer',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        // FIXME: This hook is not working, MongoDB error
        // afterChange: [updateReferralsByReferrer],
      },
      filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
    },
    {
      label: {
        en: 'Referrals',
        fr: 'Références',
      },
      name: 'referrals',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        afterChange: [updateReferrerByReferrals],
      },
      filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
    },
  ],
  timestamps: true,
};

export default Users;
