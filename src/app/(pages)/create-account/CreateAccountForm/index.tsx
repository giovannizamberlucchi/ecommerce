'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { Button } from '../../../_components/Button';
import { Input } from '../../../_components/Input';
import { Message } from '../../../_components/Message';
import { useAuth } from '../../../_providers/Auth';

import classes from './index.module.scss';

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  referralCode: string;
};

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('referralCode') !== null) {
      const objectReferralCode = localStorage.getItem('referralCode');

      if (objectReferralCode !== null) {
        const parsedObjectReferralCode = JSON.parse(objectReferralCode);

        if (parsedObjectReferralCode.expire > new Date().getTime()) {
          setReferralCode(parsedObjectReferralCode.value);
        }
      }
    }

    if (referralCode === null) {
      setReferralCode((prev) => (!prev ? searchParams.get('referral') : prev));

      if (searchParams.get('referral') !== null) {
        const objectReferralCode = {
          value: searchParams.get('referral'),
          expire: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
        };

        localStorage.setItem('referralCode', JSON.stringify(objectReferralCode));
      }
    }
  }, [searchParams, referralCode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const phoneSchema = Yup.string().phone('FR').required();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = useCallback(
    async (data: FormData) => {
      const isPhoneValid = phoneSchema.isValidSync(data.phone);

      if (!isPhoneValid) {
        setError('Numéro de téléphone invalide.');

        return;
      }

      // if (localStorage.getItem('referralCode') !== null) {
      //   const objectReferralCode = localStorage.getItem('referralCode');

      //   if (objectReferralCode !== null) {
      //     const parsedObjectReferralCode = JSON.parse(objectReferralCode);

      //     if (parsedObjectReferralCode.expire > new Date().getTime()) {
      //       data['referralCode'] = parsedObjectReferralCode.value;
      //     }
      //   }
      // }

      const response = await fetch('/api/users/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const message =
          response.statusText || 'Il y a eu une erreur lors de votre création de compte. Essayer à nouveau..';

        setError(message);

        return;
      }

      const resData = await response.json();

      if (resData.error) {
        setError(resData.error);

        return;
      }

      router.push(resData.url);
    },
    [login, router, searchParams],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <p>
        <Link href="/admin/collections/users">Créer un compte</Link>
        {'.'}
      </p>
      <Message error={error} className={classes.message} />
      <Input name="email" label="Adresse Email" required register={register} error={errors.email} type="email" />
      <Input name="name" label="Nom et prénom" required register={register} error={errors.name} type="text" />
      <Input name="phone" label="Téléphone" required register={register} error={errors.phone} type="text" />
      <Input
        name="password"
        type="password"
        label="Mot de passe"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirmer le mot de passe"
        required
        register={register}
        validate={(value) => value === password.current || 'Les mots de passe ne correspondent pas.'}
        error={errors.passwordConfirm}
      />
      <Input
        name="referralCode"
        label="Code de Parrainage"
        register={register}
        error={errors.referralCode}
        type="text"
        defaultValue={referralCode}
      />

      <Button
        type="submit"
        label={loading ? 'Processing' : 'Créer un compte'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />

      <div>
        {'Vous avez déja un compte : '}
        <Link href={`/login${allParams}`}>Se Connecter</Link>
      </div>
    </form>
  );
};

export default CreateAccountForm;
