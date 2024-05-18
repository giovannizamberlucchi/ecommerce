import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { Gutter } from '../../_components/Gutter';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import { ResetPasswordForm } from './ResetPasswordForm';

import classes from './index.module.scss';

export default async function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>

      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </Gutter>
  );
}

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe',
  description: 'Entrer un nouveau mot de passe.',
  openGraph: mergeOpenGraph({
    title: 'Réinitialiser le mot de passe',
    url: '/reset-password',
  }),
};
