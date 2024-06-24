'use client';
import { Home } from '../../../../payload/payload-types';

import { A11y, Autoplay, Keyboard, Mousewheel, Pagination, Thumbs } from 'swiper/modules';
import classes from './index.module.scss';
import { Slider } from '../../../_components/Slider';
import { Media } from '../../../_components/Media';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

type MediaSliderProps = {
  services: Home['services']['carousels'][0]['services'];
};

export const MediaSlider: React.FC<MediaSliderProps> = ({ services }) => {
  // Mobile
  const displayMobileOneInRow = useMediaQuery('(max-width: 330px)');
  const displayMobileTwoInRow = useMediaQuery('(max-width: 450px)');
  const displayMobileThreeInRow = useMediaQuery('(max-width: 530px)');
  const displayMobileFourInRow = useMediaQuery('(max-width: 768px)');
  const displayDesktopTwoInRow = useMediaQuery('(max-width: 850px)');
  const displayDesktopThreeInRow = useMediaQuery('(max-width: 1050px)');

  const slidesPerView = displayMobileOneInRow
    ? 1
    : displayMobileTwoInRow
      ? 2
      : displayMobileThreeInRow
        ? 3
        : displayMobileFourInRow
          ? 4
          : displayDesktopTwoInRow
            ? 2
            : displayDesktopThreeInRow
              ? 3
              : 4;
  return (
    <Slider
      className={classes.slider}
      slides={(services || []).map(({ url, media }, index) => ({
        children:
          media && typeof media === 'object' && media.filename ? (
            <Link href={url} key={index}>
              <Media className={classes['image-container']} imgClassName={classes.image} resource={media} />
            </Link>
          ) : null,
      }))}
      spaceBetween={20}
      autoplay={true}
      loop={true}
      slidesPerView={slidesPerView}
      modules={[A11y, Autoplay, Keyboard, Mousewheel, Pagination, Thumbs]}
    />
  );
};
