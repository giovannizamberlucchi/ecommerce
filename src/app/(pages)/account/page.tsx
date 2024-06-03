import { Metadata } from 'next';

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import AccountForm from './AccountForm';

import classes from './index.module.scss';
import { getMeUser } from '../../_utilities/getMeUser';
import { isActiveSubscription } from '../../_utilities/isActiveSubscription';
import { ReSubscribeButton } from './ReSubscribeButton';
import { Message } from '../../_components/Message';

export default async function Account({ searchParams: { warning } }) {
  const { user } = await getMeUser();
  const isActiveSubscriptionStatus = await isActiveSubscription(user);

  const refUrl = user?.referralCode
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/create-account?referral=${user?.referralCode}`
    : undefined;

  return (
    <div>
      {warning && (
        <>
          <Message warning={warning} className={classes.message} />
          <br />
        </>
      )}

      <h5 className={classes.personalInfo}>Informations personelles</h5>

      <AccountForm />

      <h5 className={classes.title} id="subscription-status">
        État de l'abonnement: {isActiveSubscriptionStatus ? 'actif' : 'inactif'}
      </h5>
      {!isActiveSubscriptionStatus && <ReSubscribeButton user={user} disabled={isActiveSubscriptionStatus} />}

      {refUrl && (
        <p className={classes.referral}>
          <b>Votre lien de parrainage:</b> <u>{refUrl}</u>
        </p>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Compte',
  description: 'Créer un compte ou se connecter.',
  openGraph: mergeOpenGraph({
    title: 'Compte',
    url: '/account',
  }),
};
