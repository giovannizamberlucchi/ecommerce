'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Order, Settings } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { useCart } from '../../../_providers/Cart';
import { CheckoutItem } from '../CheckoutItem';

import classes from './index.module.scss';

export const CheckoutPage: React.FC<{
  settings: Settings;
}> = (props) => {
  const {
    settings: { productsPage },
  } = props;

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { cart, cartIsEmpty, cartTotal } = useCart();

  const handler = useCallback(async () => {
    console.log('Payment');
    setIsLoading(true);

    try {
      const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: cartTotal.raw,
          items: (cart?.items || [])?.map(({ product, quantity }) => ({
            product: typeof product === 'string' ? product : product.id,
            quantity,
            price: typeof product === 'object' ? product.price : undefined,
          })),
        }),
      });

      if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.');

      const {
        error: errorFromRes,
        doc,
      }: {
        message?: string;
        error?: string;
        doc: Order;
      } = await orderReq.json();
      setIsLoading(false);
      if (errorFromRes) throw new Error(errorFromRes);

      router.push(`/order-confirmation?order_id=${doc.id}`);
    } catch (err) {
      // don't throw an error if the order was not created successfully
      // this is because payment _did_ in fact go through, and we don't want the user to pay twice
      console.error(err.message); // eslint-disable-line no-console
      setIsLoading(false);
      router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`);
    }
  }, [cart, cartTotal, router]);

  return (
    <div>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <div>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continuer les achats?</Link>
            </div>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          <div className={classes.header}>
            <p>Produits</p>
            <div className={classes.headerItemDetails}>
              <p></p>
              <p className={classes.quantity}>Quantité</p>
            </div>
            <p className={classes.subtotal}>Sous total</p>
          </div>

          <ul>
            {(cart?.items || [])?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { title, meta },
                } = item;

                if (!quantity) return null;

                const metaImage = meta?.image;

                return (
                  <div key={index}>
                    <CheckoutItem
                      product={product}
                      title={title}
                      metaImage={metaImage}
                      quantity={quantity}
                      index={index}
                    />
                  </div>
                );
              }
              return null;
            })}
            <div className={classes.orderTotal}>
              <p>Total</p>
              <p>{cartTotal.formatted}</p>
            </div>
          </ul>
        </div>
      )}
      {!cartIsEmpty && (
        <Button className={classes.payment} label={isLoading ? 'Chargement...' : 'Paiement'} onClick={handler} />
      )}
    </div>
  );
};
