import Link from 'next/link';
import { Home } from '../../../../payload/payload-types';
import { Gutter } from '../../../_components/Gutter';

import classes from './index.module.scss';
import { CardSlider } from './CardSlider';

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
