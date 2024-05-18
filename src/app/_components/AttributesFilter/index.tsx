import { ProductFilterAttribute } from '../ProductFilterAttribute';

type Props = {
  attributes: [string, string[]][];
  className?: string;
};

export const AttributesFilter: React.FC<Props> = ({ attributes, className }) => {
  return (
    <div className={className}>
      {attributes.flatMap(([key, values]) => (
        <>
          <h6>{key}</h6>
          {values.map((value, idx) => {
            return <ProductFilterAttribute key={`${key}-${idx}`} attribute={{ type: key, value: value }} />;
          })}
        </>
      ))}
    </div>
  );
};
