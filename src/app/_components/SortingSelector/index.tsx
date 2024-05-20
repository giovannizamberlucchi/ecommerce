'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

type Props = {
  className: string;
};

export const SortingSelector = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  const handlerOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const initialParams: string[] = [];

    searchParams.forEach((value, key) => {
      if (value && key !== 'sort') initialParams.push(`${key}=${encodeURIComponent(value)}`);
    });

    router.push(`?${initialParams.join('&')}&sort=${e.target.value}`);
  };

  return (
    <select name="user_city" onChange={handlerOnChange} className={className}>
      <option value="new" selected={sort === 'new'}>
        Récent
      </option>
      <option value="old" selected={sort === 'old'}>
        Ancien
      </option>
      <option value="asc" selected={sort === 'asc'}>
        A-Z
      </option>
      <option value="desc" selected={sort === 'desc'}>
        Z-A
      </option>
    </select>
  );
};
