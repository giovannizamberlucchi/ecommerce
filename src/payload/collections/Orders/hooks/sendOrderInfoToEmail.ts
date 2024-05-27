import { fetchSettings } from '../../../../app/_api/fetchGlobals';
import { Order, Product, User } from '../../../payload-types';
import type { AfterChangeHook } from 'payload/dist/collections/config/types';

type TemplateProps = {
  user: User;
  data: {
    name: string;
    items: {
      product: string;
      quantity: string;
    }[];
  };
};

const templateEmail = ({ user, data }: TemplateProps) => {
  const { name, items } = data;

  return `Bonjour, ${name} !

Vous avez une nouvelle demande de devis sur la plateforme Resovalie Achats !

Produits demandés: 

${(items || []).map((item) => {
  if (!item.product || !item.quantity) return;

  return `
Produit: ${item.product}
Quantité: ${item.quantity}

`;
})}
Coordonnées du client
Nom: ${user.name}
E-mail: ${user.email}
Téléphone: ${user.phone}

Cordialement,
L'équipe Résovalie Achats
`;
};

export const sendOrderInfoToEmail: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req;

  if (operation === 'create' && doc.orderedBy && doc.items) {
    const orderedBy = typeof doc.orderedBy === 'string' ? doc.orderedBy : doc.orderedBy.id;

    const user = await payload.findByID({
      collection: 'users',
      id: orderedBy,
    });

    if (user) {
      const settings = await fetchSettings();
      if (!settings) {
        return;
      }
      let suppliersAndPurchase = {};

      for (const item of doc.items) {
        let product: Product;
        if (typeof item.product === 'string') {
          product = await payload.findByID({
            collection: 'products',
            id: item.product,
            depth: 2,
          });
        } else {
          product = item.product;
        }

        if (typeof product === 'object' && product && typeof product.suppliers === 'object' && product.suppliers) {
          const supplier = product.suppliers;

          if (!suppliersAndPurchase[supplier.email]) {
            suppliersAndPurchase[supplier.email] = {};
            suppliersAndPurchase[supplier.email]['name'] = supplier.name;
            suppliersAndPurchase[supplier.email]['items'] = [];
          }
          suppliersAndPurchase[supplier.email]['items'].push({ product: product.title, quantity: item.quantity });
        }
      }

      for (const [key, value] of Object.entries(suppliersAndPurchase)) {
        const dataToEmail = {
          to: key,
          subject: `RESOVALIE Commande #${doc.id}`,
          from: 'cms@ecommerce-resovalie.payloadcms.app',
          text: templateEmail({ user, data: value as TemplateProps['data'] }),
          cc: settings.teamEmail,
        };

        await req.payload.sendEmail(dataToEmail);
      }
    }
  }
  return;
};
