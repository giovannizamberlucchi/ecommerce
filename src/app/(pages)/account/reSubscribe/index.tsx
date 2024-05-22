'use client';

import { User } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { useRouter } from 'next/navigation';
import classes from './index.module.scss';
import clsx from 'clsx';

type Props = {
  user: User;
  disabled?: boolean;
};

export const ReSubscribe = async ({ user, disabled }: Props) => {
  const router = useRouter();

  const handler = async () => {
    if (disabled) return;

    const response = await fetch('/api/users/re-subscribe', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return;

    const resData = await response.json();

    router.push(resData.url);
  };

  return (
    <Button
      onClick={handler}
      className={clsx(classes.button, !disabled ? classes['button--active'] : classes['button--disabled'])}
    >
      Ré-Abonner
    </Button>
  );
};
