import { draftMode } from 'next/headers';

import { Category, Page, Product } from '../../../payload/payload-types';
import { fetchDoc } from '../../_api/fetchDoc';
import { fetchDocs } from '../../_api/fetchDocs';
import { Blocks } from '../../_components/Blocks';
import { Gutter } from '../../_components/Gutter';
import { HR } from '../../_components/HR';
import Filters from './Filters';

import classes from './index.module.scss';
import { CollectionArchive } from '../../_components/CollectionArchive';
import { PaginatedDocs } from 'payload/database';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode();

  let page: Page | null = null;
  let categories: Category[] | null = null;
  let productsData: PaginatedDocs<Product> | null = null;

  const limit = 10;

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    });

    categories = (await fetchDocs<Category>('categories')).docs || [];
    productsData = await fetchDocs<Product>('products', isDraftMode, {
      page: Number(page),
      limit: limit,
    });
  } catch (error) {
    console.log(error);
  }

  if (categories === null) return notFound();
  if (Number(page) > productsData?.totalPages) return notFound();

  const subcategories = categories.filter((cat) => cat.parent === null);

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters categories={categories} subcategories={subcategories} />
        <div>
          <Blocks blocks={page?.layout} disableTopPadding={true} />
          <CollectionArchive page={1} productsData={productsData} limit={limit} />
        </div>
      </Gutter>
      <HR />
    </div>
  );
};

export default Products;
