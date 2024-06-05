import type { Product } from '../payload-types';

export const product3: Partial<Product> = {
  title: 'Online Course',
  price: '49.99',
  slug: 'Online Course',
  _status: 'published',
  meta: {
    title: 'Online Course',
    description: 'Make a one-time purchase to gain access to this content',
    image: '{{PRODUCT_IMAGE}}',
  },
  relatedProducts: [], // this is populated by the seed script
};
