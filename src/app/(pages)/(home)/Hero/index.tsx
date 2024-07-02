import { Home } from '../../../../payload/payload-types';
import { Gutter } from '../../../_components/Gutter';
import classes from './index.module.scss';
import { Check } from '../../../_components/icons/Check';
import Link from 'next/link';
import clsx from 'clsx';

type HeroProps = {
  hero: Home['hero'];
};

export const Hero: React.FC<HeroProps> = async ({ hero }) => {
  return (
    <Gutter className={classes.container}>
      <div>
        <h2 className={classes.title}>
          Resovalie <span>ACHATS</span>
        </h2>

        <p className={classes.subtitle}>{hero.subtitle}</p>
      </div>

      <div className={classes['container-grid-four-column']}>
        <div className={classes.video}>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={`https://www.youtube-nocookie.com/embed/${hero.youtubeId}?modestbranding=1&amp;rel=0`}
            title="YouTube video player"
            width="100%"
            height="100%"
            className={classes.iframe}
          />
        </div>

        <div className={classes['description-container']}>
          <p className={classes.description}>{hero.description} </p>

          <div className={clsx(classes['buttons-container'], classes['hide-on-mobile'])}>
            <Link href="/create-account" className={classes.button}>
              S'inscrire à la centrale
            </Link>
          </div>
        </div>

        <div className={classes['text-with-check-icon']}>
          {hero.textWithCheckIconArray.map(({ text }, index) => (
            <div key={index} className={classes['text-with-check-icon-item']}>
              <Check className={classes.check} />
              <p className={classes['text-with-check-icon-text']}>{text}</p>
            </div>
          ))}
        </div>

        <div className={clsx(classes['buttons-container'], classes['hide-on-desktop'])}>
          <Link href="/create-account" className={classes.button}>
            S'inscrire à la centrale
          </Link>
        </div>
      </div>
    </Gutter>
  );
};
