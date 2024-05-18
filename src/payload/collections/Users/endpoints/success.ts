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
export const success: PayloadHandler = async (req: PayloadRequest, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  });
  const session_id = req.query.session_id;

  const session = await stripe.checkout.sessions.retrieve(session_id as string);

  if (session.status !== 'complete') return res.status(401).json({ error: 'Session not complete' });

  const data = {
    name: req.query.name as string,
    email: req.query.email as string,
    password: req.query.password as string,
    stripeCustomerID: session.customer as string,
  };

  try {
    const userData = await req.payload.create({ collection: 'users', data });

    return res.redirect('/login');
  } catch (error) {}
};
