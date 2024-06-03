'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '../Select';
import Link from 'next/link';
import classes from './index.module.scss';
import { useMemo } from 'react';

const options = [
  {
    label: 'Récent',
    value: 'new',
  },
  {
    label: 'Ancien',
    value: 'old',
  },
  {
    label: 'A-Z',
    value: 'asc',
  },
  {
    label: 'Z-A',
    value: 'desc',
  },
];

type SortingSelectProps = {
  className: string;
};

export const SortingSelect: React.FC<SortingSelectProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOption = useMemo(() => options.find(({ value }) => value === searchParams.get('sort')), [searchParams]);

  const goToUrl = (value: string) => {
    const initialParams: string[] = [];

    searchParams.forEach((value, key) => {
      if (value && key !== 'sort') initialParams.push(`${key}=${encodeURIComponent(value)}`);
    });

    router.push(`?${initialParams.join('&')}&sort=${value}`);
  };

  return (
    <Select
      options={options}
      placeholder="Sorting"
      defaultValue={currentOption}
      renderOption={({ label, value }) => (
        <div className={classes.option} onClick={() => goToUrl(value)}>
          {label}
        </div>
      )}
    />
  );
};
