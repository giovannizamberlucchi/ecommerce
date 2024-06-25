import { Fragment } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Order as OrderType } from '../../../../../payload/payload-types';
import { HR } from '../../../../_components/HR';
import { Media } from '../../../../_components/Media';
import { formatDateTime } from '../../../../_utilities/formatDateTime';
import { getMeUser } from '../../../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../../../_utilities/mergeOpenGraph';

import classes from './index.module.scss';
import { formatCurrency } from '../../../../_utilities/currency';
import { getPriceOption } from '../../../../_utilities/price';

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vousb devez être connecté pour voir cette commande.',
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
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

  if (!order || order === null || order === undefined) {
    notFound();
  }

  return (
    <div>
      <h5>
        {`Commande`}
        <span className={classes.id}>{` ${order.id}`}</span>
      </h5>
      <div className={classes.itemMeta}>
        <p>{`ID: ${order.id}`}</p>
        <p>{`Commandé le: ${formatDateTime(order.createdAt)}`}</p>
        {/* <p className={classes.total}>
          {'Total: '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(order.total)}
        </p> */}
      </div>

      <div className={classes.order}>
        {(order.items || [])?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, price, priceOption, meta },
            } = item;

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
                    <h6 className={classes.title}>
                      <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                        {title}
                      </Link>
                    </h6>
                    <p>{`Quantité: ${quantity}`}</p>
                    {/* <Price product={product} button={false} quantity={quantity} /> */}
                    <p>{`Prix: ${formatCurrency(price)} ${getPriceOption(priceOption)}`}</p>
                  </div>
                </div>
              </Fragment>
            );
          }

          return null;
        })}
      </div>
      <HR className={classes.hr} />
      <div className={classes.total}>
        <p>{`Total: ${formatCurrency(order.total)}`}</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Order ${id}`,
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  };
}
