import Link from 'next/link';
import { Category } from '../../../../payload/payload-types';
import classes from './index.module.scss';
import CategoryCard from '../../../_components/Categories/CategoryCard';
import { getPathFromSlugArr } from '../../../_api/utils';
import { CategoryHeader } from '../../categories/[...slug]/CategoryHeader';

const AllProducts = () => (
  <div>
    <Link href="/products">Tous les produits</Link>
  </div>
);

const MenuWithoutChildren = ({
  categories,
  className,
  slug,
}: {
  categories: Category[];
  className: string;
  slug: string[];
}) => {
  const getCategoryBreadcrumbs = (category: Category) =>
    category.breadcrumbs && typeof category.breadcrumbs[category.breadcrumbs.length - 1].url === 'string'
      ? category.breadcrumbs[category.breadcrumbs.length - 1].url
      : '';

  const isActiveCategory = (category: Category) =>
    getCategoryBreadcrumbs(category) && getPathFromSlugArr(slug) === getCategoryBreadcrumbs(category);

  const getCategoryUrl = (category: Category) =>
    getCategoryBreadcrumbs(category) && !isActiveCategory(category)
      ? `/categories${getCategoryBreadcrumbs(category)}`
      : `/products`;

  return (
    <ul className={className}>
      {categories.map((category) => (
        <li key={category.id} className={classes['categories-item']}>
          <Link
            href={getCategoryUrl(category)}
            className={isActiveCategory(category) ? classes.itemActive : classes.item}
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

type CategoryDesktopListProps = {
  categories: Category[];
  slug?: string[];
  menuWithoutChildrenClassName?: string;
};

export const CategoryDesktopList: React.FC<CategoryDesktopListProps> = ({
  categories,
  slug = [],
  menuWithoutChildrenClassName,
}) => (
  <div className={classes['categories--desktop']}>
    <AllProducts />

    <MenuWithoutChildren
      categories={categories.filter((cat) => cat.parent === null)}
      className={menuWithoutChildrenClassName}
      slug={slug}
    />
  </div>
);

type CategoryMobileListProps = {
  category?: Category;
  categories: Category[];
  slug?: string[];
};

export const CategoryMobileList = ({ category, categories, slug = [] }: CategoryMobileListProps) => {
  if (!categories.length) return null;

  const upperLevelCategoryUrl = slug.length ? `/categories${getPathFromSlugArr(slug.slice(0, -1))}` : '/products';

  return (
    <div className={classes['categories--mobile']}>
      {!!slug.length && (
        <div className={classes['categories--mobile--title']}>
          <Link href={upperLevelCategoryUrl} className={classes['categories--mobile--arrow-back']}>
            {'↙'}
          </Link>

          {category && <h6 className={classes.title}>{category.title}</h6>}
        </div>
      )}

      {category ? (
        <CategoryHeader category={category} subcategories={categories} />
      ) : (
        <div className={classes['categories--mobile--list']}>
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      )}
    </div>
  );
};
