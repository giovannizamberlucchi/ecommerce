'use client';

import { A11y /* Navigation, */, Autoplay, Keyboard, Mousewheel, Pagination, Parallax } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/mousewheel';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import deepMerge from '../../../payload/utilities/deepMerge';

import './index.scss';

const defaultProps: SwiperProps = {
  modules: [A11y, Autoplay, Keyboard, Mousewheel, /* Navigation, */ Pagination, Parallax],
  loop: true,
  slidesPerView: 1,
  // navigation: {
  //   enabled: true,
  // },
  pagination: {
    enabled: true,
    clickable: true,
  },
  autoplay: {
    pauseOnMouseEnter: true,
    delay: 4000,
  },
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: false,
  },
  parallax: true,
};

export type SliderProps = SwiperProps & {
  slides: SwiperSlideProps[];
};

export const Slider: React.FC<SliderProps> = ({ slides, ...props }) => (
  <Swiper {...deepMerge(defaultProps, props)}>
    {slides.map((slideProps, idx) => (
      <SwiperSlide key={idx} {...slideProps} />
    ))}
  </Swiper>
);
