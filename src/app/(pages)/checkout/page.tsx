import { Metadata } from 'next';

import { Settings } from '../../../payload/payload-types';
import { fetchSettings } from '../../_api/fetchGlobals';
import { Gutter } from '../../_components/Gutter';
import { getMeUser } from '../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import { CheckoutPage } from './CheckoutPage';

import classes from './index.module.scss';
import { isActiveSubscription } from '../../_utilities/isActiveSubscription';
import { redirect } from 'next/navigation';

export default async function Checkout() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté à votre compte pour accéder au paiement.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  });

  const isActiveSubscriptionStatus = await isActiveSubscription(user);

  if (!isActiveSubscriptionStatus)
    redirect(`/account?warning=${encodeURIComponent("Vous devez d'abord mettre à jour votre abonnement")}`);

  let settings: Settings | null = null;

  try {
    settings = await fetchSettings();
  } catch (error) {
    // no need to redirect to 404 here, just simply render the page with fallback data where necessary
    console.error(error); // eslint-disable-line no-console
  }

  return (
    <div className={classes.checkout}>
      <Gutter>
        <CheckoutPage settings={settings} />
      </Gutter>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Vérifier',
  description: 'Créer un compte ou se connecter',
  openGraph: mergeOpenGraph({
    title: 'Vérifier',
    url: '/account',
  }),
};
