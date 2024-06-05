import { Category } from '../../../../payload/payload-types';
import { HR } from '../../../_components/HR';

import classes from './index.module.scss';
import { CategoryDesktopList, CategoryMobileList } from './generateCategoryList';

type FiltersProps = {
  category?: Category;
  categories: Category[];
  subcategories?: Category[];
  slug?: string[];
};

const Filters = ({ category, categories, subcategories, slug = [] }: FiltersProps) => (
  <div className={classes.filters}>
    <div>
      <h6 className={classes.title}>Catégories</h6>

      <CategoryDesktopList categories={categories} slug={slug} menuWithoutChildrenClassName={classes.subcategory} />

      <CategoryMobileList category={category} categories={subcategories} slug={slug} />

      <HR className={classes.hr} />
    </div>
  </div>
);

export default Filters;
