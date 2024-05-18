import React from 'react';
import { Metadata } from 'next';

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import AccountForm from './AccountForm';

import classes from './index.module.scss';
import { getMeUser } from '../../_utilities/getMeUser';
import { isActiveSubscription } from '../../_utilities/isActiveSubscription';

export default async function Account() {
  const { user } = await getMeUser();
  const isActiveSubs = await isActiveSubscription(user);
  return (
    <div>
      <h5 className={classes.personalInfo}>Informations personelles</h5>
      <AccountForm />
      <h5>État de l'abonnement:{isActiveSubs ? 'actif' : 'inactif'}</h5>
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
