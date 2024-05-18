import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import type { Config } from '../../payload/payload-types';
import { ORDERS } from '../_graphql/orders';
import { PAGES } from '../_graphql/pages';
import { PRODUCTS, PRODUCTS_ATTRIBUTES } from '../_graphql/products';
import { GRAPHQL_API_URL } from './shared';
import { payloadToken } from './token';
import { CATEGORIES } from '../_graphql/categories';
import { PaginatedDocs } from 'payload/database';
import { ATTRIBUTES } from '../_graphql/attributes';

const queryMap = {
  pages: {
    query: PAGES,
    key: 'Pages',
  },
  products: {
    query: PRODUCTS,
    key: 'Products',
  },
  orders: {
    query: ORDERS,
    key: 'Orders',
  },
  categories: {
    query: CATEGORIES,
    key: 'Categories',
  },
  'products-attributes': {
    query: PRODUCTS_ATTRIBUTES,
    key: 'Products',
  },
  attributes: {
    query: ATTRIBUTES,
    key: 'Attributes',
  },
};

export const fetchDocs = async <T>(
  collection: keyof Config['collections'] | 'products-attributes',
  draft?: boolean,
  variables?: Record<string, unknown>,
): Promise<PaginatedDocs<T>> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  let token: RequestCookie | undefined;

  if (draft) {
    const { cookies } = await import('next/headers');
    token = cookies().get(payloadToken);
  }

  const docs: PaginatedDocs<T> = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    next: { tags: [collection] },
    body: JSON.stringify({
      query:
        typeof queryMap[collection].query === 'string'
          ? queryMap[collection].query
          : queryMap[collection].query(variables),
      variables,
    }),
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs');

      return res?.data?.[queryMap[collection].key];
    });

  return docs;
};
