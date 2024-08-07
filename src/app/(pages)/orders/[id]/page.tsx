import React, { Fragment } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Order as OrderType } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { Gutter } from '../../../_components/Gutter';
import { HR } from '../../../_components/HR';
import { Media } from '../../../_components/Media';
import { Price } from '../../../_components/Price';
import { formatDateTime } from '../../../_utilities/formatDateTime';
import { getMeUser } from '../../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph';

import classes from './index.module.scss';
import { formatCurrency } from '../../../_utilities/currency';
import { getPriceOption } from '../../../_utilities/price';

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour voir cette commande.',
    )}&redirect=${encodeURIComponent(`/orders/${id}`)}`,
  });

  let order: OrderType | null = null;

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async (res) => {
      if (!res.ok) notFound();
      const json = await res.json();
      if ('error' in json && json.error) notFound();
      if ('errors' in json && json.errors) notFound();
      return json;
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  if (!order) {
    notFound();
  }

  return (
    <Gutter className={classes.orders}>
      <h1>
        {`Commande`}
        <span className={classes.id}>{` ${order.id}`}</span>
      </h1>
      <div className={classes.itemMeta}>
        <p>{`ID: ${order.id}`}</p>
        {/* <p>{`Payment Intent: ${order.stripePaymentIntentID}`}</p> */}
        <p>{`Commandé le: ${formatDateTime(order.createdAt)}`}</p>
        {/* <p className={classes.total}>
          {'Total: '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(order.total / 100)}
        </p> */}
      </div>
      <HR />
      <div className={classes.order}>
        <h4 className={classes.orderItems}>Items</h4>
        {(order.items || [])?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, price, priceOption, meta },
            } = item;

            const isLast = index === (order?.items?.length || 0) - 1;

            const metaImage = meta?.image;

            return (
              <Fragment key={index}>
                <div className={classes.row}>
                  <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                    {!metaImage && <span className={classes.placeholder}>Pas d'image</span>}
                    {metaImage && typeof metaImage !== 'string' && (
                      <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
                    )}
                  </Link>
                  <div className={classes.rowContent}>
                    {/* {!stripeProductID && (
                      <p className={classes.warning}>
                        {'This product is not yet connected to Stripe. To link this product, '}
                        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}>
                          edit this product in the admin panel
                        </Link>
                        {'.'}
                      </p>
                    )} */}
                    <h5 className={classes.title}>
                      <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                        {title}
                      </Link>
                    </h5>
                    <p>{`Quantité: ${quantity}`}</p>
                    {/* <Price product={product} button={false} quantity={quantity} /> */}
                    {price && <p>{`Prix: ${formatCurrency(price)} ${getPriceOption(priceOption)}`}</p>}
                  </div>
                </div>
                {!isLast && <HR />}
              </Fragment>
            );
          }

          return null;
        })}
      </div>
      <HR />
      <div className={classes.actions}>
        <Button href="/orders" appearance="primary" label="Voir toutes les commandes" />
        <Button href="/account" appearance="secondary" label="Aller au compte" />
      </div>
    </Gutter>
  );
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Commande ${id}`,
    description: `Détails de la commande pour la commande ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Commande ${id}`,
      url: `/orders/${id}`,
    }),
  };
}
