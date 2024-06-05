'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Settings } from '../../../../payload/payload-types';
import { useAuth } from '../../../_providers/Auth';

export const LogoutPage: React.FC<{
  settings: Settings;
}> = (props) => {
  const { settings } = props;
  const { productsPage } = settings || {};
  const { logout } = useAuth();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();

        setSuccess('Déconnecté avec succès.');
      } catch (_) {
        setError('Vous êtes déjà déconnecté.');
      }
    };

    performLogout();
  }, [logout]);

  return (
    <>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'Que voulez-vous faire ensuite?'}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <>
                {' '}
                <Link href={`/${productsPage.slug}`}>Cliquez ici</Link>
                {` pour aller à la boutique.`}
              </>
            )}
            {` Pour vous reconnecter, `}
            <Link href="/login">cliquez ici</Link>
            {'.'}
          </p>
        </div>
      )}
    </>
  );
};
