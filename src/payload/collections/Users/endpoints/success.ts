import type { PayloadHandler } from 'payload/config';
import type { PayloadRequest } from 'payload/types';
import Stripe from 'stripe';
import { fetchSettings } from '../../../../app/_api/fetchGlobals';
import { User } from '../../../payload-types';

const logs = process.env.LOGS_STRIPE_PROXY === '1';

const templateEmail = ({ user, referral }: { user: User; referral: User }) => {
  return `Bonjour, RESOVALIE team !
  
  ${user.name} vient de s'inscrire sur la plateforme Resovalie Achats avec un code de parrainage utilisateur ${referral.name}.
  `;
};

// use this handler to interact with a Stripe customer associated with any given user
// does so in secure way that does not leak or expose any cross-customer data
// pass the proper method and body to this endpoint to interact with the Stripe API
// available methods:
// GET /api/users/:id/customer
// POST /api/users/:id/customer
// body: { customer: Stripe.CustomerUpdateParams }
export const success: PayloadHandler = async (req: PayloadRequest, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
  });
  const session_id = req.query.session_id;

  const session = await stripe.checkout.sessions.retrieve(session_id as string);

  if (session.status !== 'complete') return res.status(401).json({ error: 'Session not complete' });

  const data = {
    name: req.query.name as string,
    email: req.query.email as string,
    phone: req.query.phone as string,
    password: req.query.password as string,
    stripeCustomerID: session.customer as string,
  };

  try {
    if (req.query.referral && req.query.referral !== null) {
      const referrer = await req.payload.find({
        collection: 'users',
        where: {
          referralCode: { equals: req.query.referral as string },
        },
        limit: 1,
      });

      if (referrer) {
        const user = await req.payload.create({ collection: 'users', data });
        await req.payload.update({
          collection: 'users',
          id: referrer.docs[0].id,
          data: {
            referrals: [...referrer.docs[0].referrals, user.id],
          },
        });

        const settings = await fetchSettings();

        const emailData = {
          to: settings.teamEmail,
          subject: 'Système de référence',
          from: settings.teamEmail,
          text: templateEmail({ user, referral: referrer.docs[0] }),
        };

        await req.payload.sendEmail(emailData);
      }
    } else {
      await req.payload.create({ collection: 'users', data });
    }
    return res.redirect('/login');
  } catch (error) {
    return res.redirect(
      `/login?error=${encodeURIComponent("Une erreur s'est produite lors de la création du compte")}`,
    );
  }
};
