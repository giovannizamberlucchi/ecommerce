import Link from 'next/link';
import { Category } from '../../../../payload/payload-types';
import classes from './index.module.scss';
import CategoryCard from '../../../_components/Categories/CategoryCard';
import { getPathFromSlugArr } from '../../../_api/utils';
import { notFound } from 'next/navigation';

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

type DataTree = {
  children?: DataTree[];
} & Category;

export const GenerateCategoryDesktopList: React.FC<generateDesktopProps> = ({ categories, slug = [], className }) => {
  const createDataTree = (dataset: Category[]): DataTree[] => {
    const hashTable = Object.create(null);
    dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }));
    const dataTree = [];
    dataset.forEach((aData) => {
      if (aData.parent !== null && typeof aData.parent !== 'string' && aData.parent?.id)
        hashTable[aData.parent?.id].children.push(hashTable[aData.id]);
      else dataTree.push(hashTable[aData.id]);
    });
    return dataTree;
  };

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

  const Menu = ({ data, className }: { data: DataTree[]; className?: string }) => (
    <ul className={className}>
      {(data || []).map((m) => (
        <li key={m.id}>
          <Link href={getCategoryUrl(m)} className={isSelected(m) ? classes.itemActive : classes.item}>
            {m.title}
          </Link>
          {m.children && <Menu data={m.children} className={className} />}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={classes['categories--desktop']}>
      <GetAllProducts />
      <Menu data={createDataTree(categories)} className={className} />
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

      <div className={classes['categories--mobile--list']}>
        {(categories || []).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
