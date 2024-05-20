import { ProductFilterAttribute } from '../ProductFilterAttribute';
import classes from './index.module.scss';

type Props = {
  attributes: [string, string[]][];
  className?: string;
};

export const AttributesFilter: React.FC<Props> = ({ attributes, className }) => {
  return (
    <div className={className}>
      <h6 className={classes.title}>Filtres</h6>
      {attributes.flatMap(([key, values]) => (
        <div key={`attributes${key}${values}`} className={classes['container-attributes']}>
          <h6 className={classes['title-attribute']}>{key}</h6>
          {values.map((value, idx) => {
            return <ProductFilterAttribute key={`${key}-${idx}`} attribute={{ type: key, value: value }} />;
          })}
        </div>
      ))}
      {attributes.length === 0 && <p>Aucun filtre disponible</p>}
    </div>
  );
};
