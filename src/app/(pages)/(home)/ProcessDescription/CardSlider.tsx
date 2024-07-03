'use client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { A11y, Autoplay, Keyboard, Mousewheel, Pagination, EffectCards, Navigation } from 'swiper/modules';
import classes from './index.module.scss';
import { Slider } from '../../../_components/Slider';
import { Media } from '../../../_components/Media';
import { Home } from '../../../../payload/payload-types';
import { Chevron } from '../../../_components/icons/Chevron';
import clsx from 'clsx';

type CardSliderProps = {
  carousel: Home['processDescription']['carousel'];
};

export const CardSlider: React.FC<CardSliderProps> = ({ carousel }) => (
  <div className={classes['container-slider']}>
    <Chevron className={clsx('swiper-button image-swiper-button-prev', classes['prev-icon'])} />
    <Chevron className={clsx('swiper-button image-swiper-button-next', classes['next-icon'])} />
    <Slider
      className={classes.slider}
      slides={(carousel || []).map((item, index) => ({
        children: (
          <div className={classes.slide}>
            {item.media && typeof item.media === 'object' && item.media.filename ? (
              <Media
                className={classes['slide__image-container']}
                imgClassName={classes['slide__image']}
                resource={item.media}
              />
            ) : null}

            <p className={classes['slide__title']}>
              {index + 1}. {item.title}
            </p>

            <p className={classes['slide__description']}>{item.description}</p>
          </div>
        ),
      }))}
      spaceBetween={20}
      autoplay={false}
      loop={false}
      effect={'cards'}
      grabCursor={true}
      navigation={{
        nextEl: '.image-swiper-button-next',
        prevEl: '.image-swiper-button-prev',
        disabledClass: 'swiper-button-disabled',
      }}
      modules={[A11y, Autoplay, Keyboard, Mousewheel, EffectCards, Navigation]}
    />
  </div>
);
