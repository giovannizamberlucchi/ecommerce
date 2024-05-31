import Link from 'next/link';

import { Product } from '../../../payload/payload-types';
import { Media } from '../Media';

import classes from './index.module.scss';
import clsx from 'clsx';

export const Card: React.FC<{
  alignItems?: 'center';
  className?: string;
  showCategories?: boolean;
  hideImagesOnMobile?: boolean;
  title?: string;
  relationTo?: 'products';
  doc?: Product;
}> = (props) => {
  const {
    showCategories,
    title: titleFromProps,
    doc,
    doc: { slug, title, categories, meta, price, description } = {},
    className,
  } = props;

  const { image: metaImage } = meta || {};

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const href = `/products/${slug}`;

  return (
    <Link href={href} className={clsx(classes.card, className)}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>pas d'image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media imgClassName={classes.image} resource={metaImage} fill />}
      </div>

      <div className={classes.content}>
        {titleToUse && <p className={classes.title}>{titleToUse}</p>}
        {/* {price && <h6>{price} €</h6>} */}
        {description && (
          <div className={classes.body}>{description && <p className={classes.description}>{description}</p>}</div>
        )}
      </div>
    </Link>
  );
};
