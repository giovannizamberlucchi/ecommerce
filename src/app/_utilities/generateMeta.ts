import type { Metadata } from 'next';

import type { Page, Product } from '../../payload/payload-types';
import { mergeOpenGraph } from './mergeOpenGraph';
import { appName } from './appName';

export const generateMeta = async (args: { doc: Partial<Page> | Partial<Product> }): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`;

  return {
    title: doc?.meta?.title || `${doc?.title ? `${doc.title} | ` : ''}${appName}`,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || appName,
      description: doc?.meta?.description,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  };
};
