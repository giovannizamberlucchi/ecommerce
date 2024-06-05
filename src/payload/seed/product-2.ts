import type { Product } from '../payload-types';

export const product2: Partial<Product> = {
  title: 'E-Book',
  price: '129.99',
  slug: 'ebook',
  _status: 'published',
  meta: {
    title: 'E-Book',
    description: 'Make a one-time purchase for this digital asset.',
    image: '{{PRODUCT_IMAGE}}',
  },
  relatedProducts: [], // this is populated by the seed script
};
