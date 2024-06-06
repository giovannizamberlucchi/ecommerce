import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Gutter } from '../../_components/Gutter';
import { RenderParams } from '../../_components/RenderParams';
import { getMeUser } from '../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import CreateAccountForm from './CreateAccountForm';

import classes from './index.module.scss';

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Impossible de créer un compte quand vous êtes déjà connecté. Veuillez-vous déconnecter pour créer un nouveau compte.',
    )}`,
  });

  return (
    <section className={classes.createAccount}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/resovalie-achat-fond-blanc-rvb.jpg"
            alt="logo"
            width={250}
            height={23}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <Suspense>
            <RenderParams className={classes.params} />
          </Suspense>

          <div className={classes.formTitle}>
            <h3>Créer un compte</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>Entrer vos informations</p>

          <Suspense>
            <CreateAccountForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Compte',
  description: 'Créer un compte ou se connecter à un compte existant.',
  openGraph: mergeOpenGraph({
    title: 'Compte',
    url: '/account',
  }),
};
