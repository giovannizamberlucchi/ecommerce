import React from 'react';
import Link from 'next/link';

import { Media } from '../../../_components/Media';
import { Price } from '../../../_components/Price';
import { formatDateTime } from '../../../_utilities/formatDateTime';
import { getMeUser } from '../../../_utilities/getMeUser';

import classes from './index.module.scss';

export default async function Purchases() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour accéder à votre compte.',
    )}&redirect=${encodeURIComponent('/account')}`,
  });

  return (
    <div>
      <h5>Mes commandes</h5>
      <div>
        {user?.purchases?.length || 0 > 0 ? (
          <ul className={classes.purchases}>
            {(user?.purchases || [])?.map((purchase, index) => {
              return (
                <li key={index} className={classes.purchase}>
                  {typeof purchase === 'string' ? (
                    <p>{purchase} Test</p>
                  ) : (
                    <Link href={`/products/${purchase.slug}`} className={classes.item}>
                      <div className={classes.mediaWrapper}>
                        {!purchase.meta.image && <div className={classes.placeholder}>Pas d'image</div>}
                        {purchase.meta.image && typeof purchase.meta.image !== 'string' && (
                          <Media imgClassName={classes.image} resource={purchase.meta.image} />
                        )}
                      </div>
                      <div className={classes.itemDetails}>
                        <h6>{purchase.title}</h6>
                        {/* {purchase.price && <strong>{purchase.price} €</strong>} */}
                        <p className={classes.purchasedDate}>{`Acheté le: ${formatDateTime(purchase.createdAt)}`}</p>
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={classes.noPurchases}>Vous n'avez aucune commande.</div>
        )}
      </div>
    </div>
  );
}
