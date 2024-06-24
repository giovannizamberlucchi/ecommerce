'use client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { A11y, Autoplay, Keyboard, Mousewheel, Pagination, EffectCards } from 'swiper/modules';
import classes from './index.module.scss';
import { Slider } from '../../../_components/Slider';
import { Media } from '../../../_components/Media';
import { Home } from '../../../../payload/payload-types';

type CardSliderProps = {
  carousel: Home['processDescription']['carousel'];
};

export const CardSlider: React.FC<CardSliderProps> = ({ carousel }) => (
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
    modules={[A11y, Autoplay, Keyboard, Mousewheel, EffectCards]}
  />
);
