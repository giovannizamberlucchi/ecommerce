import type { PayloadHandler } from 'payload/config';
import type { PayloadRequest } from 'payload/types';
import Stripe from 'stripe';
import { fetchSettings } from '../../../../app/_api/fetchGlobals';
import { User } from '../../../payload-types';

const logs = process.env.LOGS_STRIPE_PROXY === '1';

const templateEmail = ({ user, referral }: { user: User; referral: User }) => {
  return `Bonjour, RESOVALIE team!
  
${user.name} vient de s'inscrire sur la plateforme Resovalie Achats avec un code de parrainage utilisateur ${referral.name}.
`;
};

export const success: PayloadHandler = async (req: PayloadRequest, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
  });
  const session_id = req.query.session_id;

  const session = await stripe.checkout.sessions.retrieve(session_id as string);

  if (session.status !== 'complete') return res.status(401).json({ error: 'Session not complete' });

  if (req?.query?.userId) return res.redirect('/account');

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

        let referrals =
          referrer.docs[0].referrals !== null && referrer.docs[0].referrals !== undefined
            ? referrer.docs[0].referrals.map((referral: string | User) =>
                typeof referral === 'object' ? referral.id : referral,
              )
            : [];

        referrals.push(user.id);
        await req.payload.update({
          collection: 'users',
          id: referrer.docs[0].id,
          data: {
            referrals: referrals,
          },
        });

        const settings = await fetchSettings();

        const emailData = {
          to: settings.teamEmail,
          subject: 'Programme de parrainage',
          from: 'cms@ecommerce-resovalie.payloadcms.app',
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
