'use client'

import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/account')
      } catch (_) {
        setError('Les informations entrées ne correspondent à aucun compte. Veuilez resaisir votre identifiant et votre mot de passe.')
      }
    },
    [login, router],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <p>
        {``}
        <Link href="/admin/collections/users">Se connecter à son compte Resovalie</Link>
        {''}
      </p>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Adresse Email"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="password"
        type="password"
        label="Mot de Passe"
        required
        register={register}
        error={errors.password}
      />
      <Button
        type="submit"
        appearance="primary"
        label={isLoading ? 'Processing' : 'Se connecter'}
        disabled={isLoading}
        className={classes.submit}
      />
      <div>
        <Link href={`/create-account${allParams}`}>Créer un compte</Link>
        <br />
        <Link href={`/recover-password${allParams}`}>Récupérer son mot de passe</Link>
      </div>
    </form>
  )
}

export default LoginForm
