import { User } from '../../payload/payload-types';
import Stripe from 'stripe';

export const isActiveSubscription = async (userData: User): Promise<boolean> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if (!userData || (!userData.stripeCustomerID && !userData.stripeCustomerID)) return false;

  const customerResponse = await stripe.customers.retrieve(userData.stripeCustomerID, { expand: ['subscriptions'] });

  if (customerResponse.deleted !== undefined) return false;

  const customer = customerResponse as Stripe.Customer;

  if (!customer.subscriptions && !customer.subscriptions.data?.length) return false;

  for (const subscription of customer.subscriptions.data) if (subscription.status === 'active') return true;

  return false;
};
