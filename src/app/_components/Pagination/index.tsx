'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import Paginate from 'react-paginate';

import { Chevron } from '../Chevron';
import classes from './index.module.scss';

type SelectedItem = { selected: number };

type PaginationProps = {
  className?: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
};

export const Pagination: React.FC<PaginationProps> = ({ hasPrevPage, hasNextPage, totalPages, className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageChange = ({ selected }: SelectedItem): void => {
    const initialParams: string[] = [];

    searchParams.forEach((value, key) => {
      if (value && key !== 'page') initialParams.push(`${key}=${encodeURIComponent(value)}`);
    });

    router.push(initialParams.length ? `?${initialParams.join('&')}&page=${selected + 1}` : `?page=${selected + 1}`);
  };
  return (
    <div className={clsx(classes.pagination, className)}>
      <Paginate
        activeClassName={classes.active}
        activeLinkClassName={classes.active}
        breakClassName={classes.page}
        containerClassName={classes.pagination}
        forcePage={(Number(searchParams.get('page')) || 1) - 1}
        nextLabel={<Chevron rotate={-90} className={classes.icon} />}
        nextLinkClassName={hasNextPage ? classes['button'] : classes['button--disabled']}
        onPageChange={pageChange}
        pageClassName={classes.page}
        pageCount={totalPages}
        previousLabel={<Chevron rotate={90} className={classes.icon} />}
        previousLinkClassName={hasPrevPage ? classes['button'] : classes['button--disabled']}
      />
    </div>
  );
};
