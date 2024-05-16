'use client';
import React, { ChangeEvent, useState } from 'react';

import classes from './index.module.scss';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface ProductFilterAttributeProps {
  attribute: { type: string; value: string };
}

export const ProductFilterAttribute: React.FC<ProductFilterAttributeProps> = ({ attribute }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const attributeFilterValues = searchParams.getAll(attribute.type);
  const newAttributeFilterValues = attributeFilterValues.filter((value) => value === attribute.value);
  const newSearchParams = new URLSearchParams(searchParams);

  const isSelected = attributeFilterValues.includes(attribute.value);

  if (isSelected)
    newSearchParams.delete(attribute.type, newAttributeFilterValues.length > 0 ? attribute.value : undefined);
  else newSearchParams.append(attribute.type, attribute.value);

  const newSearchParamsString = newSearchParams.toString();

  return (
    <Link
      className={classes.checkboxWrapper}
      href={newSearchParamsString ? { search: newSearchParamsString } : pathname}
    >
      <input type="checkbox" checked={isSelected} className={classes.checkbox} />
      {attribute.value}
    </Link>
  );
};
