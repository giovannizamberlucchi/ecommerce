import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Gutter } from '../../_components/Gutter';
import { RenderParams } from '../../_components/RenderParams';
import { getMeUser } from '../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import LoginForm from './LoginForm';

import classes from './index.module.scss';
import { Header, Media } from '../../../payload/payload-types';
import { fetchHeader } from '../../_api/fetchGlobals';

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('Vous êtes déjà connecté.')}`,
  });

  let header: Header | null = null;

  try {
    header = await fetchHeader();
  } catch (error) {
    console.error(error);
  }

  const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${(header?.media as Media)?.filename}`;

  return (
    <section className={classes.login}>
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

          <div className={classes.formTitle}>
            <h3>Bienvenue</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>Sur Resovalie Achats</p>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Se connecter',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
};
