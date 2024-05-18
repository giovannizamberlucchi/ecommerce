import React from 'react';
import { draftMode } from 'next/headers';

import classes from './index.module.scss';
import { Attribute, Category, Page, Product } from '../../../../payload/payload-types';
import { fetchDoc } from '../../../_api/fetchDoc';
import { fetchDocs } from '../../../_api/fetchDocs';
import { Gutter } from '../../../_components/Gutter';
import Filters from '../../products/Filters';
import { HR } from '../../../_components/HR';
import { notFound } from 'next/navigation';
import { getLastFromArray, getPathFromSlugArr } from '../../../_api/utils';
import { getChildrenIds } from '../../_utils';
import { PaginatedDocs } from 'payload/database';
import { CollectionProducts } from '../../../_components/CollectionProducts';
import { AttributesPillsList } from '../../../_components/AttributesPillsList';
import { AttributesFilter } from '../../../_components/AttributesFilter';
import { AttributesOverlay } from '../../../_components/AttributesOverlay';
import { Metadata } from 'next';
import { generateMeta } from '../../../_utilities/generateMeta';

type CategoriesProps = {
  params: {
    slug: string[];
  };
  searchParams: {
    page?: string;
  };
};

export const dynamic = 'force-dynamic';

const Categories: React.FC<CategoriesProps> = async ({ params: { slug }, searchParams }) => {
  const { isEnabled: isDraftMode } = draftMode();
  const { page = '1' } = searchParams;

  let categories: Category[] | null = null;
  let category: Category | null = null;
  let productsData: PaginatedDocs<Product> | null = null;
  let attributesForProducts: Attribute[] | null = null;
  let AllProductsAttributes: Product[] | null = null;

  const attributesEntries = Object.entries(searchParams)
    .map<[string, string[]]>(([key, value]) => [key, Array.isArray(value) ? value : [value]])
    .filter(([key, value]) => key !== 'page');
  let attributes: Record<string, string[]> = attributesEntries.reduce(
    (acc, [key, value]) => {
      acc[key] = value;

      return acc;
    },
    {} as Record<string, string[]>,
  );

  const limit = 12;

  try {
    category = await fetchDoc<Category>({
      collection: 'categories',
      slug: getLastFromArray(slug),
      breadcrumbUrl: getPathFromSlugArr(slug),
      draft: isDraftMode,
    });

    categories = (await fetchDocs<Category>('categories')).docs;

    attributesForProducts =
      (
        await fetchDocs<Attribute>('attributes', isDraftMode, {
          filterAttributesByAttribute: Object.keys(attributes),
        })
      ).docs || [];

    attributesForProducts.map((attr) => {
      if (attributes[attr.attribute] !== undefined) {
        attributes[attr.id] = attributes[attr.attribute];
        delete attributes[attr.attribute];
      }
    });

    const subcategoriesIds = getChildrenIds(category.id, categories);

    productsData = await fetchDocs<Product>('products', isDraftMode, {
      filterCategoriesByIds: subcategoriesIds,
      page: Number(page),
      limit,
    });

    AllProductsAttributes = (
      await fetchDocs<Product>('products-attributes', isDraftMode, {
        filterCategoriesByIds: subcategoriesIds,
      })
    ).docs;
  } catch (error) {
    console.log(error);
  }

  let productsAttributesObject: { [key: string]: string[] } = {};

  (AllProductsAttributes || []).map((product) =>
    product.attributes.map((attr) => {
      if (attr.type === null && typeof attr.type === 'string' && attr.type === undefined) return;
      const type = attr.type as Attribute;
      if (
        productsAttributesObject[type.attribute] !== undefined &&
        !productsAttributesObject[type.attribute].includes(attr.value)
      )
        productsAttributesObject[type.attribute] = [...productsAttributesObject[type.attribute], attr.value];
      else productsAttributesObject[type.attribute] = [attr.value];
    }),
  );

  const productsAttributesEntries = Object.entries(productsAttributesObject);

  if (!category) return notFound();
  if (Number(page) > productsData?.totalPages) return notFound();

  const subcategories = categories.filter((cat) => typeof cat.parent !== 'string' && cat.parent?.id === category.id);

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <AttributesPillsList attributes={attributesEntries} className={classes['attributes-pill--desktop']} />

        <div>
          <Filters category={category} categories={categories} subcategories={subcategories} slug={slug} />
          <AttributesFilter
            attributes={productsAttributesEntries}
            className={classes['container-attributes-list--desktop']}
          />
        </div>

        <div>
          <AttributesPillsList attributes={attributesEntries} className={classes['attributes-pill--mobile']} />
          <AttributesOverlay
            attributes={productsAttributesEntries}
            className={classes['container-attributes-list--mobile']}
          />
          <CollectionProducts page={Number(page)} productsData={productsData} limit={limit} />
        </div>
      </Gutter>
      <HR />
    </div>
  );
};

export default Categories;

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let category: Category | null = null;

  try {
    category = await fetchDoc<Category>({
      collection: 'categories',
      slug: getLastFromArray(slug),
      draft: isDraftMode,
    });
  } catch (error) {}

  if (!category) return;

  return generateMeta({ doc: { title: `Catégorie ${category?.title}` || `Catégorie ${getLastFromArray(slug)}` } });
}
