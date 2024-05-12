import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import type { Config } from '../../payload/payload-types';
import { ORDER } from '../_graphql/orders';
import { PAGE } from '../_graphql/pages';
import { PRODUCT } from '../_graphql/products';
import { GRAPHQL_API_URL } from './shared';
import { payloadToken } from './token';
import { CATEGORY } from '../_graphql/categories';

const queryMap = {
  pages: {
    query: PAGE,
    key: 'Pages',
  },
  products: {
    query: PRODUCT,
    key: 'Products',
  },
  orders: {
    query: ORDER,
    key: 'Orders',
  },
  categories: {
    query: CATEGORY,
    key: 'Categories',
  },
};

export const fetchDoc = async <T>({
  breadcrumbUrl,
  collection,
  draft,
  slug,
}: {
  breadcrumbUrl?: string;
  collection: keyof Config['collections'];
  draft?: boolean;
  id?: string;
  slug?: string;
}): Promise<T> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  let token: RequestCookie | undefined;

  if (draft) {
    const { cookies } = await import('next/headers.js');

    token = cookies().get(payloadToken);
  }

  const doc: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables: {
        breadcrumbUrl,
        draft,
        slug,
      },
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    method: 'POST',
    next: { tags: [`${collection}_${slug}`] },
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc');

      return res?.data?.[queryMap[collection].key]?.docs?.[0];
    });

  return doc;
};
