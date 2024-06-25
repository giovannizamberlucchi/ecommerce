import { Category, Product } from '../../../payload/payload-types';
import { AddToCartButton } from '../../_components/AddToCartButton';
import { Gutter } from '../../_components/Gutter';
import { Price } from '../../_components/Price';
import { formatCurrency } from '../../_utilities/currency';
import { getPriceOption } from '../../_utilities/price';
import { MediaWrapper } from './MediaWrapper';

import classes from './index.module.scss';

export const ProductHero: React.FC<{
  product: Product;
}> = ({ product }) => {
  const { title, categories, description, price, priceOption, meta: { image: metaImage } = {} } = product;

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        <MediaWrapper images={product.images} metaImage={product.meta.image} />
      </div>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            {(categories || [])?.map((category, index) => {
              const { title: categoryTitle } = category as Category;

              const titleToUse = categoryTitle || 'Generic';
              const isLast = index === categories.length - 1;

              return (
                <p key={index} className={classes.category}>
                  {titleToUse} {!isLast && <>, &nbsp;</>}
                  {!isLast && <span className={classes.separator}>|</span>}
                </p>
              );
            })}
          </div>
          {/* <p className={classes.stock}>En stock</p> */}
        </div>

        <Price product={product} button={false} />

        <AddToCartButton product={product} className={classes.addToCartButton} />

        {description && (
          <div className={classes.description}>
            <br />
            <p>{description}</p>
          </div>
        )}

        <p>{`Prix: ${formatCurrency(price)} ${getPriceOption(priceOption)}`}</p>
      </div>
    </Gutter>
  );
};
