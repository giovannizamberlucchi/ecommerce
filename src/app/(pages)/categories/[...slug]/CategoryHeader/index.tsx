import clsx from 'clsx';
import { Category, Media } from '../../../../../payload/payload-types';
import CategoryCard from '../../../../_components/Categories/CategoryCard';
import RichText from '../../../../_components/RichText';
import classes from './index.module.scss';

type CategoryHeaderProps = {
  category: Category;
  subcategories: Category[];
  imageClassName?: string;
  subCategoriesClassName?: string;
  descriptionClassName?: string;
};

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category: { media, description },
  subcategories,
  imageClassName,
  subCategoriesClassName,
  descriptionClassName,
}) => (
  <>
    <div
      style={{ backgroundImage: media && typeof media === 'object' ? `url(${media.url})` : undefined }}
      className={clsx(classes.image, imageClassName)}
    />

    <RichText content={description} className={clsx(classes.description, descriptionClassName)} />

    <div className={clsx(classes.subcategories, subCategoriesClassName)}>
      {subcategories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  </>
);
