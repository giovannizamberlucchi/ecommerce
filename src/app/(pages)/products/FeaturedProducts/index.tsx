import clsx from 'clsx';
import { Product } from '../../../../payload/payload-types';
import { Card } from '../../../_components/Card';

import classes from './index.module.scss';

type FeaturedProductProps = {
  products: Product[];
  className?: string;
};

export const FeaturedProducts: React.FC<FeaturedProductProps> = ({ products, className }) => {
  if (!products.length) return null;

  return (
    <div className={clsx(classes.container, className)}>
      <p className={classes.title}>Produits en vedette</p>
      <div>
        <div className={classes.products}>
          {(products || [])?.map((result, index) => (
            <Card key={index} relationTo="products" doc={result} showCategories />
          ))}
        </div>
      </div>
    </div>
  );
};
