import { Suspense } from 'react';
import { Product } from '../../../payload/payload-types';
import { Card } from '../Card';
import { PageRange } from '../PageRange';
import { Pagination } from '../Pagination';

import classes from './index.module.scss';
import { PaginatedDocs } from 'payload/database';

export type Props = {
  page: number;
  productsData: PaginatedDocs<Product>;
  limit?: number;
};

export const CollectionProducts: React.FC<Props> = (props) => {
  const { page, productsData, limit = 10 } = props;
  const { totalPages = 1, hasNextPage = false, hasPrevPage = false } = productsData || {};

  return (
    <div className={classes.collectionArchive}>
      <div className={classes.pageRange}>
        <PageRange totalDocs={productsData?.totalDocs} currentPage={page} collection={'posts'} limit={limit} />
      </div>

      <div className={classes.products}>
        {(productsData.docs || [])?.map((result, index) => (
          <Card key={index} relationTo="products" doc={result} showCategories />
        ))}
      </div>

      {totalPages > 1 && (
        <Suspense>
          <Pagination
            totalPages={totalPages}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            className={classes.pagination}
          />
        </Suspense>
      )}
    </div>
  );
};
