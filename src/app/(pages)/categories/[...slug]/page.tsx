import React from 'react';
import { draftMode } from 'next/headers';

import classes from './index.module.scss';
import { Category, Product } from '../../../../payload/payload-types';
import { fetchDoc } from '../../../_api/fetchDoc';
import { fetchDocs } from '../../../_api/fetchDocs';
import { Gutter } from '../../../_components/Gutter';
import Filters from '../../products/Filters';
import { HR } from '../../../_components/HR';
import { notFound } from 'next/navigation';
import { getLastFromArray, getPathFromSlugArr } from '../../../_api/utils';
import { getChildrenIds } from '../../_utils';
import { PaginatedDocs } from 'payload/database';
import { CollectionArchive } from '../../../_components/CollectionArchive';

type CategoriesProps = {
  params: {
    slug: string[];
  };
  searchParams: {
    page?: string;
  };
};

export const dynamic = 'force-dynamic';

const Categories: React.FC<CategoriesProps> = async ({ params: { slug }, searchParams: { page = '1' } }) => {
  const { isEnabled: isDraftMode } = draftMode();

  let categories: Category[] | null = null;
  let category: Category | null = null;
  let productsData: PaginatedDocs<Product> | null = null;
  const limit = 10;

  try {
    category = await fetchDoc<Category>({
      collection: 'categories',
      slug: getLastFromArray(slug),
      breadcrumbUrl: getPathFromSlugArr(slug),
      draft: isDraftMode,
    });

    categories = (await fetchDocs<Category>('categories')).docs;

    const subcategoriesIds = getChildrenIds(category.id, categories);

    productsData = await fetchDocs<Product>('products', isDraftMode, {
      filterCategoriesByIds: subcategoriesIds,
      page: Number(page),
      limit,
    });
  } catch (error) {
    console.log(error);
  }

  if (!category) return notFound();
  if (Number(page) > productsData?.totalPages) return notFound();

  const subcategories = categories.filter((cat) => typeof cat.parent !== 'string' && cat.parent?.id === category.id);

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters category={category} categories={categories} subcategories={subcategories} slug={slug} />
        <CollectionArchive page={Number(page)} productsData={productsData} limit={limit} />
      </Gutter>
      <HR />
    </div>
  );
};

export default Categories;
