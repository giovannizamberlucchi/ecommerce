import { Category } from '../../../../payload/payload-types';
import { HR } from '../../../_components/HR';

import classes from './index.module.scss';
import { GenerateCategoryDesktopList, GenerateCategoryMobileList } from './generateCategoryList';

type FiltersProps = {
  category?: Category;
  categories: Category[];
  subcategories?: Category[];
  slug?: string[];
};

const Filters = ({ category, categories, subcategories, slug = [] }: FiltersProps) => {
  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>Catégories</h6>

        <GenerateCategoryDesktopList categories={categories} slug={slug} className={classes.subcategory} />

        <GenerateCategoryMobileList category={category} categories={subcategories} slug={slug} />

        <HR className={classes.hr} />
      </div>
    </div>
  );
};

export default Filters;
