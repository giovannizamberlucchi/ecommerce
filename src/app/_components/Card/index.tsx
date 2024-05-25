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
    doc: { slug, title, categories, meta, price } = {},
    className,
  } = props;

  const { description, image: metaImage } = meta || {};

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, ' '); // replace non-breaking space with white space
  const href = `/products/${slug}`;

  return (
    <Link href={href} className={clsx(classes.card, className)}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>pas d'image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media imgClassName={classes.image} resource={metaImage} fill />}
      </div>

      <div className={classes.content}>
        {titleToUse && <p className={classes.title}>{titleToUse}</p>}
        {description && (
          <div className={classes.body}>
            {description && <p className={classes.description}>{sanitizedDescription}</p>}
          </div>
        )}
        {price && <h6>{price} €</h6>}
      </div>
    </Link>
  );
};
