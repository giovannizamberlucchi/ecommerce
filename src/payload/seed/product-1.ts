import type { Product } from '../payload-types';

export const product1: Partial<Product> = {
  title: 'Cotton T-Shirt',
  price: '20',
  slug: 'cotton-t',
  _status: 'published',
  meta: {
    title: 'Cotton T-Shirt',
    description: 'Make a one-time purchase for this physical product.',
    image: '{{PRODUCT_IMAGE}}',
  },
  relatedProducts: [], // this is populated by the seed script
};
