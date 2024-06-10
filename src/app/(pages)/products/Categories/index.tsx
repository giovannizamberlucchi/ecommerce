import { Category } from '../../../../payload/payload-types';
import { HR } from '../../../_components/HR';

import classes from './index.module.scss';
import { CategoryDesktopList, CategoryMobileList } from './generateCategoryList';

type CategoriesProps = {
  category?: Category;
  subcategories: Category[];
  topLevelCategories?: Category[];
  slug?: string[];
};

const Categories = ({ category, subcategories, topLevelCategories, slug = [] }: CategoriesProps) => (
  <div className={classes.filters}>
    <div>
      <h6 className={classes.title}>Catégories</h6>

      <CategoryDesktopList
        categories={topLevelCategories}
        slug={slug}
        menuWithoutChildrenClassName={classes.subcategory}
      />

      <CategoryMobileList
        category={category}
        categories={subcategories}
        topLevelCategories={topLevelCategories}
        slug={slug}
      />

      <HR className={classes.hr} />
    </div>
  </div>
);

export default Categories;
