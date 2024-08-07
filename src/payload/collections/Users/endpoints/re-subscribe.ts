import type { PayloadHandler } from 'payload/config';
import type { PayloadRequest } from 'payload/types';
import Stripe from 'stripe';

export const reSubscribe: PayloadHandler = async (req: PayloadRequest, res) => {
  if (!req.body.userId) return res.status(400).json({ error: 'Missing userId' });

  const user = await req.payload.findByID({
    collection: 'users',
    id: req.body.userId,
  });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: process.env.PRODUCT_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/success?session_id={CHECKOUT_SESSION_ID}&userId=${req.body.userId}`,
    customer: user.stripeCustomerID,
  });

  return res.json({ url: checkoutSession.url });
};
