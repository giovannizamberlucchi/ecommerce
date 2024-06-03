import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Order } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { RenderParams } from '../../../_components/RenderParams';
import { formatDateTime } from '../../../_utilities/formatDateTime';
import { getMeUser } from '../../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph';

import classes from './index.module.scss';

export default async function Orders() {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour voir vos commandes.',
    )}&redirect=${encodeURIComponent('/orders')}`,
  });

  let orders: Order[] | null = null;

  try {
    orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })
      ?.then(async (res) => {
        if (!res.ok) notFound();
        const json = await res.json();
        if ('error' in json && json.error) notFound();
        if ('errors' in json && json.errors) notFound();
        return json;
      })
      ?.then((json) => json.docs);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <h5>Mes commandes</h5>
      {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
        <p className={classes.noOrders}>Vous n'avez aucune commande.</p>
      )}

      <Suspense>
        <RenderParams />
      </Suspense>

      {orders !== undefined && orders.length > 0 && (
        <ul className={classes.orders}>
          {(orders || [])?.map((order) => (
            <li key={order.id} className={classes.order}>
              <Link className={classes.item} href={`/account/orders/${order.id}`}>
                <div className={classes.itemContent}>
                  <h6 className={classes.itemTitle}>{`Commande ${order.id}`}</h6>
                  <div className={classes.itemMeta}>
                    {/* <p>
                      {'Totale: '}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(order.total)}
                    </p> */}
                    <p className={classes.orderDate}>{`Commandé le: ${formatDateTime(order.createdAt)}`}</p>
                  </div>
                </div>
                <Button
                  appearance="default"
                  label="Voir l'ordre"
                  className={classes.button}
                  el="link"
                  href={`/account/orders/${order.id}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Commandes',
  description: 'Vos commandes.',
  openGraph: mergeOpenGraph({
    title: 'Commandes',
    url: '/orders',
  }),
};
