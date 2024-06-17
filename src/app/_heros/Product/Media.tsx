import { Product } from '../../../payload/payload-types';
import { Media as MediaComponent } from '../../_components/Media';
import classes from './index.module.scss';

export const Media: React.FC<{
  className?: string;
  images: Product['images'];
}> = ({ className, images }) => {
  const image = images[0].media;
  return (
    <div className={className}>
      <MediaComponent imgClassName={classes.image} resource={image} fill />
    </div>
  );
};
