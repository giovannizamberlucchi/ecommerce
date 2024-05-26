'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import classes from './index.module.scss';
import { Cross } from '../../icons/Cross';

type AttributePillProps = {
  attribute: { type: string; value: string };
};

export const AttributePill: React.FC<AttributePillProps> = ({ attribute }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Remove the filter attribute from the URL
  const attributeFilterValues = searchParams.getAll(attribute.type);
  const newAttributeFilterValues = attributeFilterValues.filter((value) => value !== attribute.value);
  const newSearchParams = new URLSearchParams(searchParams);
  //   searchParams.forEach((value, key) => [key, key === attribute.type ? newAttributeFilterValues : value]) as any as [

  if (newAttributeFilterValues.length > 0) newSearchParams.delete(attribute.type, attribute.value);
  else newSearchParams.delete(attribute.type);

  const newSearchParamsString = newSearchParams.toString();

  return (
    <Link className={classes.container} href={newSearchParamsString ? { search: newSearchParamsString } : pathname}>
      <p className={classes.attributeValue}>{attribute.value}</p>
      <Cross className={classes.cross} />
    </Link>
  );
};

export const ClearPill: React.FC<{ text: string }> = ({ text }) => {
  const pathname = usePathname();

  return (
    <Link className={classes.container} href={pathname}>
      <p className={classes.attributeValue}>{text}</p>
    </Link>
  );
};
