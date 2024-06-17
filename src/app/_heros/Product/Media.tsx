import { Product } from '../../../payload/payload-types';
import { Media as MediaComponent } from '../../_components/Media';
import classes from './index.module.scss';

export const Media: React.FC<{
  className?: string;
  images: Product['images'];
  metaImage?: Product['meta']['image'];
}> = ({ className, images, metaImage }) => {
  const image = metaImage || images[0].media;
  return (
    <div className={className}>
      <MediaComponent imgClassName={classes.image} resource={image} fill />
    </div>
  );
};
