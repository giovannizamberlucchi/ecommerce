'use client';

import React, { Fragment, useCallback, useState } from 'react';
import Link from 'next/link';

import { Order, Page, Settings } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { LoadingShimmer } from '../../../_components/LoadingShimmer';
import { useAuth } from '../../../_providers/Auth';
import { useCart } from '../../../_providers/Cart';
import CartItem from '../CartItem';

import classes from './index.module.scss';
import { useRouter } from 'next/navigation';

export const CartPage: React.FC<{
  settings: Settings;
  page: Page;
}> = (props) => {
  const { settings } = props;
  const { productsPage } = settings || {};

  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart();

  const handler = useCallback(async () => {
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
      setIsLoading(false);

      router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`);
    }
  }, [cart, cartTotal, router]);

  return (
    <>
      <br />

      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Votre panier est vide
              {typeof productsPage === 'object' && productsPage?.slug && (
                <>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Cliquer ici</Link>
                  {` pour retour au magasin.`}
                </>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                <div className={classes.header}>
                  <p>Produits</p>

                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Quantité</p>
                  </div>
                  <p className={classes.headersubtotal}>Sous total</p>
                </div>

                <ul className={classes.itemsList}>
                  {(cart?.items || [])?.map((item) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta },
                      } = item;

                      const metaImage = meta?.image;

                      return (
                        <CartItem
                          key={`product-${id}`}
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      );
                    }

                    return null;
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Récapitulatif</h6>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Total</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>

                <Button
                  className={classes.checkoutButton}
                  label={isLoading ? 'Chargement...' : 'Demander un devis'}
                  appearance="primary"
                  onClick={handler}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
