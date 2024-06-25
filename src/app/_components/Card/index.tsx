import Link from 'next/link';

import { Product } from '../../../payload/payload-types';
import { Media } from '../Media';

import classes from './index.module.scss';
import clsx from 'clsx';
import { formatCurrency } from '../../_utilities/currency';
import { getPriceOption } from '../../_utilities/price';

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
    doc: { slug, title, categories, meta, price, priceOption, description } = {},
    className,
  } = props;

  const { image: metaImage } = meta || {};

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const href = `/products/${slug}`;

  return (
    <Link href={href} className={clsx(classes.card, className)}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>Pas d'image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media imgClassName={classes.image} resource={metaImage} fill />}
      </div>

      <div className={classes.content}>
        {titleToUse && <p className={classes.title}>{titleToUse}</p>}
        {description && <p className={classes.description}>{description}</p>}

        <p>{`${formatCurrency(price)} ${getPriceOption(priceOption)}`}</p>
      </div>
    </Link>
  );
};
