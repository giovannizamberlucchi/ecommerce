import { Category, Media } from '../../../../../payload/payload-types';
import CategoryCard from '../../../../_components/Categories/CategoryCard';
import RichText from '../../../../_components/RichText';
import classes from './index.module.scss';

type CategoryHeaderProps = {
  category: Category;
  subcategories: Category[];
  className?: string;
};

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category: { media, description },
  subcategories,
  className,
}) => (
  <div className={className}>
    <div
      style={{ backgroundImage: media && typeof media === 'object' ? `url(${media.url})` : undefined }}
      className={classes.image}
    />

    <RichText content={description} className={classes.description} />

    <div className={classes.subcategories}>
      {subcategories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  </div>
);
