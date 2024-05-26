import React from 'react';
import { Metadata } from 'next';

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import AccountForm from './AccountForm';

import classes from './index.module.scss';
import { getMeUser } from '../../_utilities/getMeUser';
import { isActiveSubscription } from '../../_utilities/isActiveSubscription';
import { ReSubscribe } from './ReSubscribe';

export default async function Account() {
  const { user } = await getMeUser();
  const isActiveSubs = await isActiveSubscription(user);

  const refUrl =
    user?.referralCode !== null && user?.referralCode !== undefined
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/create-account?referral=${user?.referralCode}`
      : '';

  return (
    <div>
      <h5 className={classes.personalInfo}>Informations personelles</h5>
      <AccountForm />

      <h5 className={classes.title}>État de l'abonnement: {isActiveSubs ? 'actif' : 'inactif'}</h5>
      {!isActiveSubs && <ReSubscribe user={user} disabled={isActiveSubs} />}

      {refUrl !== '' && (
        <p className={classes.referral}>
          Votre lien de parrainage : <strong>{refUrl}</strong>
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
