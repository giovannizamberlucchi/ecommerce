import Link from 'next/link';

import { Category, Media } from '../../../../payload/payload-types';

import classes from './index.module.scss';

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media;

  const urlLink =
    category.breadcrumbs !== undefined && typeof category.breadcrumbs[category.breadcrumbs.length - 1].url === 'string'
      ? `/categories${category.breadcrumbs[category.breadcrumbs.length - 1].url}`
      : `/categories`;

  return (
    <Link
      href={urlLink}
      className={classes.card}
      style={{ backgroundImage: media?.url ? `url(${media.url})` : undefined }}
    >
      <p className={classes.title}>{category.title}</p>
    </Link>
  );
};

export default CategoryCard;
