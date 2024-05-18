import type { PayloadHandler } from 'payload/config';
import type { PayloadRequest } from 'payload/types';
import Stripe from 'stripe';

const logs = process.env.LOGS_STRIPE_PROXY === '1';

// use this handler to interact with a Stripe customer associated with any given user
// does so in secure way that does not leak or expose any cross-customer data
// pass the proper method and body to this endpoint to interact with the Stripe API
// available methods:
// GET /api/users/:id/customer
// POST /api/users/:id/customer
// body: { customer: Stripe.CustomerUpdateParams }
export const signUp: PayloadHandler = async (req: PayloadRequest, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: process.env.PRODUCT_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(req.body.name)}&email=${encodeURIComponent(req.body.email)}&password=${encodeURIComponent(req.body.password)}`,
    customer_email: req.body.email,
  });

  return res.json({ url: checkoutSession.url });
};
