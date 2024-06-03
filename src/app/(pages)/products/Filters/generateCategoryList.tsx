import Link from 'next/link';
import { Category } from '../../../../payload/payload-types';
import classes from './index.module.scss';
import CategoryCard from '../../../_components/Categories/CategoryCard';
import { getPathFromSlugArr } from '../../../_api/utils';
import { notFound } from 'next/navigation';
import { CategoryHeader } from '../../categories/[...slug]/CategoryHeader';

const GetAllProducts = () => (
  <div>
    <Link href="/products">Tous les produits</Link>
  </div>
);

type generateDesktopProps = {
  categories: Category[];
  slug?: string[];
  className?: string;
};

export const GenerateCategoryDesktopList: React.FC<generateDesktopProps> = ({ categories, slug = [], className }) => {
  const getCategoryBreadcrumbs = (category: Category) =>
    category.breadcrumbs !== undefined && typeof category.breadcrumbs[category.breadcrumbs.length - 1].url === 'string'
      ? category.breadcrumbs[category.breadcrumbs.length - 1].url
      : '';

  const isSelected = (category: Category) =>
    getCategoryBreadcrumbs(category) !== '' && getPathFromSlugArr(slug) === getCategoryBreadcrumbs(category);

  const getCategoryUrl = (category: Category) =>
    getCategoryBreadcrumbs(category) !== '' && !isSelected(category)
      ? `/categories${getCategoryBreadcrumbs(category)}`
      : `/products`;

  const MenuWithoutChildren = ({ data }: { data: Category[] }) => (
    <ul className={className}>
      {(data || []).map((m) => (
        <li key={m.id} className={classes['categories-item']}>
          <Link href={getCategoryUrl(m)} className={isSelected(m) ? classes.itemActive : classes.item}>
            {m.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={classes['categories--desktop']}>
      <GetAllProducts />
      <MenuWithoutChildren data={categories.filter((cat) => cat.parent === null)} />
    </div>
  );
};

type generateMobileProps = {
  category?: Category;
  categories: Category[];
  slug?: string[];
};

export const GenerateCategoryMobileList = ({ category, categories, slug = [] }: generateMobileProps) => {
  if (categories === undefined) return notFound();
  const urlBack = slug.length > 1 ? `/categories${getPathFromSlugArr(slug.slice(0, -1))}` : '/products';

  return (
    <div className={classes['categories--mobile']}>
      {slug.length > 0 && (
        <div className={classes['categories--mobile--title']}>
          <Link href={urlBack} className={classes['categories--mobile--arrow-back']}>
            {'↙'}
          </Link>

          <h6 className={classes.title}>{category !== undefined && category.title}</h6>
        </div>
      )}

      {category ? (
        <CategoryHeader category={category} subcategories={categories} />
      ) : (
        <div className={classes['categories--mobile--list']}>
          {(categories || []).map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      )}
    </div>
  );
};
