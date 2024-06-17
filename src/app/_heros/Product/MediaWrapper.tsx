import { Product } from '../../../payload/payload-types';
import { Media } from './Media';
import { MediaPlaceholder } from './MediaPlaceholder';
import { MediaSlider } from './MediaSlider';

type MediaWrapperProps = {
  images: Product['images'];
  metaImage?: Product['meta']['image'];
};

export const MediaWrapper: React.FC<MediaWrapperProps> = ({ images, metaImage }) => {
  if (metaImage) images = [{ media: metaImage }, ...images];

  if (!images?.length) return <MediaPlaceholder />;
  if (images?.length === 1) return <Media images={images} />;
  if (images?.length > 1) return <MediaSlider images={images} />;
};
