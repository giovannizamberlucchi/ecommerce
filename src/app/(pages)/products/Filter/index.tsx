import { ProductFilterAttribute } from '../../../_components/ProductFilterAttribute';
import classes from './index.module.scss';

type Props = {
  attributes: [string, string[]][];
  className?: string;
};

export const Filter: React.FC<Props> = ({ attributes, className }) => {
  if (attributes.length === 0) return;

  return (
    <div className={className}>
      <h6 className={classes.title}>Filtres</h6>
      {attributes.flatMap(([key, values]) => (
        <div key={`attributes${key}${values}`} className={classes['container-attributes']}>
          <h6 className={classes['title-attribute']}>{key}</h6>
          <div className={classes['container-values']}>
            {values.map((value, idx) => (
              <ProductFilterAttribute key={`${key}-${idx}`} attribute={{ type: key, value: value }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
