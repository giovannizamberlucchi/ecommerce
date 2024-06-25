import { Home } from '../../../../payload/payload-types';
import { Gutter } from '../../../_components/Gutter';
import { MediaSlider } from './MediaSlider';
import { TypingText } from './TypingText';
import classes from './index.module.scss';

type ServicesProps = {
  services: Home['services'];
};

export const Services: React.FC<ServicesProps> = async ({ services }) => {
  return (
    <Gutter className={classes.container}>
      <div>
        <h2 className={classes.title}>
          Nos <span>Services</span>
        </h2>

        <p className={classes.subtitle}>{services.subtitle}</p>
      </div>

      <p className={classes.description}>{services.description}</p>

      <div className={classes.services}>
        {services.carousels.map((item, index) => (
          <div className={classes['services__item']} key={index}>
            <p className={classes['services__item__title']}>{item.title}</p>

            <MediaSlider services={item.services} />
          </div>
        ))}
      </div>

      <p className={classes['typing-text']}>
        Et bien d'autres: <TypingText texts={services.typingEffectTextArray.map((text) => text.text)} />
      </p>
    </Gutter>
  );
};
