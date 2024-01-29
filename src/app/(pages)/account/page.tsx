import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  return (
    <div>
      <h5 className={classes.personalInfo}>Informations personelles</h5>
      <AccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Créer un compte ou se connecter.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
