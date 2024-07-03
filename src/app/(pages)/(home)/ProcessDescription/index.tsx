import Link from 'next/link';
import { Home } from '../../../../payload/payload-types';
import { Gutter } from '../../../_components/Gutter';

import classes from './index.module.scss';
import { CardSlider } from './CardSlider';
import clsx from 'clsx';
import { Chevron } from '../../../_components/icons/Chevron';

type ProcessDescriptionProps = {
  processDescription: Home['processDescription'];
};

export const ProcessDescription: React.FC<ProcessDescriptionProps> = async ({ processDescription }) => {
  return (
    <Gutter className={classes.container}>
      <h2 className={classes.title}>
        RESOVALIE <span>ACHATS</span>
      </h2>

      <h3 className={classes.subtitle}>{processDescription.subtitle}</h3>

      <p className={classes.description}>{processDescription.description}</p>

      <div className={classes['card-slider']}>
        <Chevron className={clsx('swiper-button image-swiper-button-prev-process-description', classes['prev-icon'])} />
        <Chevron className={clsx('swiper-button image-swiper-button-next-process-description', classes['next-icon'])} />

        <CardSlider carousel={processDescription.carousel} />
      </div>

      <div className={classes['buttons-container']}>
        <Link href="/create-account" className={classes.button}>
          S'inscrire à la centrale
        </Link>
      </div>
    </Gutter>
  );
};
