import clsx from 'clsx';
import { AttributePill, ClearPill } from './AttributePill';
import classes from './index.module.scss';

type AttributesListProps = {
  attributes: [string, string[]][];
  className?: string;
};

export const AttributesPillsList: React.FC<AttributesListProps> = ({ attributes, className }) => {
  return (
    <div className={clsx(classes.container, className)}>
      {attributes.length !== 0 && <ClearPill text="Clear all" />}
      {attributes.flatMap(([key, values]) =>
        values.map((value, idx) => <AttributePill key={`${key}-${idx}`} attribute={{ type: key, value: value }} />),
      )}
    </div>
  );
};
