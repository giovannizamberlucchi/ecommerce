import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { RenderParams } from '../../_components/RenderParams';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import { RecoverPasswordForm } from './RecoverPasswordForm';

import classes from './index.module.scss';
import { Header, Media } from '../../../payload/payload-types';
import { fetchHeader } from '../../_api/fetchGlobals';

export default async function RecoverPassword() {
  let header: Header | null = null;

  try {
    header = await fetchHeader();
  } catch (error) {
    console.error(error);
  }

  const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${(header?.media as Media)?.filename}`;

  return (
    <section className={classes.recoverPassword}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image src={src} alt="logo" width={250} height={23} className={classes.logo} />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <Suspense>
            <RenderParams className={classes.params} />
          </Suspense>

          <Link href="/login" className={classes.backLink}>
            <Image src="/assets/icons/arrow-left.svg" alt="left arrow" width={24} height={24} />
            <p>Retour</p>
          </Link>
          <div className={classes.formTitle}>
            <h3>Réinitialiser mon mot de passe</h3>
          </div>
          <RecoverPasswordForm />
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Récupérer mot de passe',
  description: 'Entrer votre adresse mail pour réinitialiser votre mot de passe.',
  openGraph: mergeOpenGraph({
    title: 'Récupérer mot de passe',
    url: '/recover-password',
  }),
};
