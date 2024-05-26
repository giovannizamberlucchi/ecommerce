import { Category, Media } from '../../../../../payload/payload-types';
import CategoryCard from '../../../../_components/Categories/CategoryCard';
import RichText from '../../../../_components/RichText';
import classes from './index.module.scss';

type CategoryHeaderProps = {
  category: Category;
  subcategories: Category[];
  className?: string;
};

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, subcategories, className }) => {
  const media = category.media as Media;

  return (
    <div className={className}>
      <div style={{ backgroundImage: media?.url ? `url(${media.url})` : undefined }} className={classes.image} />
      <RichText content={category.description} className={classes.description} />
      <div className={classes.subcategories}>
        {subcategories.map((cat) => (
          <CategoryCard category={cat} />
        ))}
      </div>
    </div>
  );
};
