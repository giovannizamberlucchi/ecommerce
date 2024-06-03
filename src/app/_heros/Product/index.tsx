import { Category, Product } from '../../../payload/payload-types';
import { AddToCartButton } from '../../_components/AddToCartButton';
import { Gutter } from '../../_components/Gutter';
import { Media } from '../../_components/Media';
import { Price } from '../../_components/Price';

import classes from './index.module.scss';

export const ProductHero: React.FC<{
  product: Product;
}> = ({ product }) => {
  const { title, image, categories, description, meta: { image: metaImage } = {} } = product;

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!image && !metaImage && <div className={classes.placeholder}>Pas d'image</div>}
        {(image && typeof image !== 'string') ||
          (metaImage && typeof metaImage !== 'string' && (
            <Media imgClassName={classes.image} resource={metaImage} fill />
          ))}
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
                  <span className={classes.separator}>|</span>
                </p>
              );
            })}
          </div>
          {/* <p className={classes.stock}>En stock</p> */}
        </div>

        <Price product={product} button={false} />

        {description && (
          <div className={classes.description}>
            <br />
            <p>{description}</p>
          </div>
        )}

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
    </Gutter>
  );
};
