'use client';

import { useState } from 'react';
import { A11y, Autoplay, FreeMode, Keyboard, Mousewheel, Pagination, Thumbs } from 'swiper/modules';
import { Swiper } from 'swiper/types';
import { Product } from '../../../payload/payload-types';
import { Slider } from '../../_components/Slider';
import classes from './Slider.module.scss';
import { Media } from '../../_components/Media';

type MediaSliderProps = {
  images: Product['images'];
};

export const MediaSlider: React.FC<MediaSliderProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

  return (
    <>
      <Slider
        className={classes.slider}
        slides={(images || []).map(({ media }) => ({
          children:
            media && typeof media === 'object' && media.filename ? (
              <Media className={classes.imageContainer} imgClassName={classes.image} resource={media} />
            ) : null,
        }))}
        spaceBetween={20}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={false}
        loop={false}
        modules={[A11y, Autoplay, Keyboard, Mousewheel, Pagination, Thumbs]}
      />

      <Slider
        className={classes['slider-thumb']}
        slides={(images || []).map(({ media }) => ({
          children:
            media && typeof media === 'object' && media.filename ? (
              <Media className={classes.imageContainer} imgClassName={classes.image} resource={media} />
            ) : null,
        }))}
        spaceBetween={20}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        watchSlidesProgress={true}
        pagination={false}
        autoplay={false}
        loop={false}
        modules={[A11y, Autoplay, Keyboard, Mousewheel, Pagination, FreeMode]}
      />
    </>
  );
};
