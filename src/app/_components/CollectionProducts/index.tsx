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

  return (
    <div className={classes.collectionArchive}>
      <div className={classes.pageRange}>
        <PageRange totalDocs={productsData?.totalDocs} currentPage={page} collection={'posts'} limit={limit} />
      </div>

      <div className={classes.grid}>
        {(productsData.docs || [])?.map((result, index) => (
          <Card key={index} relationTo="products" doc={result} showCategories />
        ))}
      </div>

      {productsData?.totalPages > 1 && (
        <Suspense>
          <Pagination
            totalPages={productsData?.totalPages as number}
            hasPrevPage={productsData?.hasPrevPage as boolean}
            hasNextPage={productsData?.hasNextPage as boolean}
          />
        </Suspense>
      )}
    </div>
  );
};
