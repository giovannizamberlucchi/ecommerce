'use client';

import { User } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { useRouter } from 'next/navigation';
import classes from './index.module.scss';

type ReSubscribeButtonProps = {
  user: User;
  disabled?: boolean;
};

export const ReSubscribeButton: React.FC<ReSubscribeButtonProps> = async ({ user, disabled }) => {
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

  return <Button onClick={handler} appearance="primary" className={classes.button} label="RÉ-ABONNER" />;
};
