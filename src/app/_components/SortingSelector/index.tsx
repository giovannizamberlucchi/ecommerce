'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import classes from './index.module.scss';
import { Chevron } from '../icons/Chevron';

type Props = {
  className: string;
};

export const SortingSelector = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  const sortingParams = {
    Récent: 'new',
    Ancien: 'old',
    'A-Z': 'asc',
    'Z-A': 'desc',
  };

  const searchKeyByValue = (value: string) => {
    return Object.keys(sortingParams).find((key) => sortingParams[key] === value);
  };

  const getUrl = (param: string) => {
    const initialParams: string[] = [];

    searchParams.forEach((value, key) => {
      if (value && key !== 'sort') initialParams.push(`${key}=${encodeURIComponent(value)}`);
    });

    return `?${initialParams.join('&')}&sort=${param}`;
  };

  return (
    <Menu>
      <MenuButton className={classes.button}>
        <p className={classes.title}>{sort ? searchKeyByValue(sort) : 'Sorting'}</p>
        <Chevron className={classes.chevron} />
      </MenuButton>
      <MenuItems anchor="bottom" className={classes.items}>
        {Object.entries(sortingParams).map(([key, value]) => {
          if (value === sort) return;
          return (
            <MenuItem>
              <a className={classes.item} href={getUrl(value)}>
                {key}
              </a>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
