import Link from 'next/link';
import { Home } from '../../../../payload/payload-types';
import { Gutter } from '../../../_components/Gutter';
import classes from './index.module.scss';
import { CountUpEffect } from './CountUpEffect';

type CompanyInNumberProps = {
  numbers: Home['companyInNumbers']['numbers'];
};

export const CompanyInNumber: React.FC<CompanyInNumberProps> = ({ numbers }) => {
  return (
    <div className={classes.container}>
      <Gutter className={classes['container-header']}>
        <h2 className={classes.title}>
          RESOVALIE <span>ACHATS</span>
        </h2>

        <p className={classes.subtitle}>en quelques chiffres</p>
      </Gutter>

      <div className={classes['content-container']}>
        <div className={classes['numbers-container']}>
          {(numbers || []).map((number, idx) => (
            <div key={idx} className={classes['number-with-description']}>
              <p className={classes.number}>
                <CountUpEffect end={number.number} suffix={number.suffix} />
              </p>

              <p className={classes.description}>{number.description}</p>
            </div>
          ))}
        </div>

        <Gutter className={classes['buttons-container']}>
          <Link href="/create-account" className={classes.button}>
            S'inscrire à la centrale
          </Link>

          <Link href="/login" className={classes.button}>
            Passer commande
          </Link>
        </Gutter>
      </div>
    </div>
  );
};
