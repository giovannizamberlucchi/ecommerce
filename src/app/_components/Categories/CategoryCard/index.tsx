import Link from 'next/link';

import { Category } from '../../../../payload/payload-types';

import classes from './index.module.scss';
import { getLastFromArray } from '../../../_api/utils';

const CategoryCard: React.FC<Category> = ({ title, breadcrumbs, media }) => {
  const lastBreadcrumb = getLastFromArray(breadcrumbs);
  const href =
    breadcrumbs.length && lastBreadcrumb.url && typeof lastBreadcrumb.url === 'string'
      ? `/categories${lastBreadcrumb.url}`
      : `/products`;

  return (
    <Link href={href} className={classes.card}>
      <div
        style={{ backgroundImage: media && typeof media === 'object' ? `url(${media.url})` : undefined }}
        className={classes.image}
      />
      <p className={classes.title}>{title}</p>
    </Link>
  );
};

export default CategoryCard;
