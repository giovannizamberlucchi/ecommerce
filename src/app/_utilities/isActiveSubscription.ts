import { User } from '../../payload/payload-types';
import Stripe from 'stripe';

export const isActiveSubscription = async (userData: User): Promise<boolean> => {
  const apiKey = `${process.env.STRIPE_SECRET_KEY}`;
  const stripe = new Stripe(apiKey);

  if (!userData) return false;
  if (!userData.stripeCustomerID && userData.stripeCustomerID === undefined) return false;

  const customerResponse = await stripe.customers.retrieve(userData.stripeCustomerID, { expand: ['subscriptions'] });

  if (customerResponse.deleted !== undefined) return false;
  const customer = customerResponse as Stripe.Customer;
  if (!customer.subscriptions && customer.subscriptions.data.length === 0) return false;

  for (const subscription of customer.subscriptions.data) {
    if (subscription.status === 'active') return true;
  }

  return false;
};
