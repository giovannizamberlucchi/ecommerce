import { ProductFilterAttribute } from '../ProductFilterAttribute';

type Props = {
  attributes: [string, string[]][];
  className?: string;
};

export const AttributesFilter: React.FC<Props> = ({ attributes, className }) => {
  return (
    <div className={className}>
      <h6>Filtres</h6>
      {attributes.flatMap(([key, values]) => (
        <>
          <h6>{key}</h6>
          {values.map((value, idx) => {
            return <ProductFilterAttribute key={`${key}-${idx}`} attribute={{ type: key, value: value }} />;
          })}
        </>
      ))}
      {attributes.length === 0 && <p>Aucun filtre disponible</p>}
    </div>
  );
};
