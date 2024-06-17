import { Product } from '../../../payload/payload-types';
import { Media } from './Media';
import { MediaPlaceholder } from './MediaPlaceholder';
import { MediaSlider } from './MediaSlider';

type MediaWrapperProps = {
  images: Product['images'];
  metaImage?: Product['meta']['image'];
};

export const MediaWrapper: React.FC<MediaWrapperProps> = ({ images, metaImage }) => {
  if (!images?.length && !metaImage) return <MediaPlaceholder />;
  if ((images?.length === 1 && !metaImage) || (!images?.length && metaImage))
    return <Media images={images} metaImage={metaImage} />;
  if (images?.length > 1 || (images?.length && metaImage)) return <MediaSlider images={images} metaImage={metaImage} />;
};
