import React from 'react';
import { draftMode } from 'next/headers';

import classes from './index.module.scss';
import { Attribute, Category as CategoryType, Product, Settings } from '../../../../payload/payload-types';
import { fetchDoc } from '../../../_api/fetchDoc';
import { fetchDocs } from '../../../_api/fetchDocs';
import { Gutter } from '../../../_components/Gutter';
import Categories from '../../products/Categories';
import { HR } from '../../../_components/HR';
import { notFound, redirect } from 'next/navigation';
import { getLastFromArray, getPathFromSlugArr } from '../../../_api/utils';
import { getChildrenIds } from '../../_utils';
import { PaginatedDocs } from 'payload/database';
import { CollectionProducts } from '../../../_components/CollectionProducts';
import { AttributesPillsList } from '../../../_components/AttributesPillsList';
import { AttributesFilter } from '../../../_components/AttributesFilter';
import { AttributesOverlay } from '../../../_components/AttributesOverlay';
import { Metadata } from 'next';
import { generateMeta } from '../../../_utilities/generateMeta';
import { getMeUser } from '../../../_utilities/getMeUser';
import { isActiveSubscription } from '../../../_utilities/isActiveSubscription';
import { SortingSelect } from '../../../_components/SortingSelect';
import clsx from 'clsx';
import { CategoryHeader } from './CategoryHeader';
import { Filter } from '../../products/Filter';
import { fetchSettings } from '../../../_api/fetchGlobals';

type CategoriesProps = {
  params: {
    slug: string[];
  };
  searchParams: {
    page?: string;
    sort?: string;
  };
};

export const dynamic = 'force-dynamic';

const Category: React.FC<CategoriesProps> = async ({ params: { slug }, searchParams }) => {
  slug = slug.map((slugPart) => decodeURIComponent(slugPart));

  const { user } = await getMeUser({
    nullUserRedirect: `/login?redirect=${encodeURIComponent(`/categories${getPathFromSlugArr(slug)}`)}&error=${encodeURIComponent('Vous devez être connecté pour voir la catégorie')}`,
  });
  const isActiveSubscriptionStatus = await isActiveSubscription(user);

  if (!isActiveSubscriptionStatus)
    redirect(`/account?warning=${encodeURIComponent("Vous devez d'abord mettre à jour votre abonnement")}}`);

  const { isEnabled: isDraftMode } = draftMode();
  const { page = '1' } = searchParams;

  let categories: CategoryType[] | null = null;
  let category: CategoryType | null = null;
  let productsData: PaginatedDocs<Product> | null = null;
  let attributesForProducts: Attribute[] | null = null;
  let allProductsAttributes: Product[] | null = null;
  let settings: Settings | null = null;

  const attributesEntries = Object.entries(searchParams)
    .map<[string, string[]]>(([key, value]) => [key, Array.isArray(value) ? value : [value]])
    .filter(([key, value]) => key !== 'page' && key !== 'sort');
  let attributes: Record<string, string[]> = attributesEntries.reduce(
    (acc, [key, value]) => {
      acc[key] = value;

      return acc;
    },
    {} as Record<string, string[]>,
  );

  const limit = 12;

  const sortingOptions = {
    asc: 'title',
    desc: '-title',
    new: '-createdAt',
    old: 'createdAt',
  };

  try {
    category = await fetchDoc<CategoryType>({
      collection: 'categories',
      slug: getLastFromArray(slug),
      breadcrumbUrl: getPathFromSlugArr(slug),
      draft: isDraftMode,
    });

    if (!category) return notFound();

    categories = (await fetchDocs<CategoryType>('categories')).docs;

    attributesForProducts =
      (
        await fetchDocs<Attribute>('attributes', isDraftMode, {
          filterAttributesByAttribute: Object.keys(attributes),
        })
      ).docs || [];

    attributesForProducts.map((attr) => {
      if (attributes[attr.attribute] && attr?.id) {
        attributes[attr.id] = attributes[attr.attribute];

        delete attributes[attr.attribute];
      }
    });

    const subcategoriesIds = getChildrenIds(category.id, categories);

    const sort = sortingOptions[searchParams.sort] || sortingOptions.new;
    productsData = await fetchDocs<Product>('products', isDraftMode, {
      attributes,
      filterCategoriesByIds: subcategoriesIds,
      page: Number(page),
      limit,
      sort,
    });

    allProductsAttributes = (
      await fetchDocs<Product>('products-attributes', isDraftMode, {
        filterCategoriesByIds: subcategoriesIds,
      })
    ).docs;

    settings = await fetchSettings();
  } catch (error) {
    console.log(error);
  }

  if (!category) return notFound();

  let productsAttributesObject: { [key: string]: string[] } = {};

  (allProductsAttributes || []).map((product) =>
    product.attributes.map((attr) => {
      if (!attr.type || typeof attr.type === 'string') return;

      const type = attr.type;

      if (productsAttributesObject[type.attribute] && !productsAttributesObject[type.attribute].includes(attr.value)) {
        productsAttributesObject[type.attribute] = [...productsAttributesObject[type.attribute], attr.value];
      } else {
        if (!productsAttributesObject[type.attribute]) {
          productsAttributesObject[type.attribute] = [attr.value];
        }
      }
    }),
  );

  const productsAttributesEntries = Object.entries(productsAttributesObject);

  const subcategories = categories.filter(
    (cat) => cat.parent && typeof cat.parent === 'object' && cat.parent?.id === category.id,
  );

  const topLevelCategories = categories.filter((cat) => cat.parent === null);

  const categoriesOrderIds = settings?.categoriesOrder.map((cat) => (typeof cat === 'object' ? cat.id : cat));

  const sortedTopLevelCategoriesByOrder = topLevelCategories
    .filter((cat) => categoriesOrderIds.includes(cat.id))
    .sort((a, b) => categoriesOrderIds.indexOf(a.id) - categoriesOrderIds.indexOf(b.id));

  const sortedTopLevelCategoriesByTitle = topLevelCategories
    .filter((cat) => !categoriesOrderIds.includes(cat.id))
    .sort((a, b) => a.title.localeCompare(b.title));

  const sortedCategories = [...sortedTopLevelCategoriesByOrder, ...sortedTopLevelCategoriesByTitle];

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <div
          className={clsx(classes['container-attributes-sorting'], classes['container-attributes-sorting--desktop'])}
        >
          <AttributesPillsList attributes={attributesEntries} className={classes['attributes-pill--desktop']} />
          <SortingSelect />
        </div>

        <div>
          <Categories
            category={category}
            subcategories={subcategories}
            topLevelCategories={sortedCategories}
            slug={slug}
          />

          {/* <AttributesFilter
            attributes={productsAttributesEntries}
            className={classes['container-attributes-list--desktop']}
          /> */}
        </div>

        <div>
          <CategoryHeader
            category={category}
            subcategories={subcategories}
            imageClassName={classes['hide-on-mobile']}
            descriptionClassName={classes['hide-on-mobile']}
            subCategoriesClassName={classes['hide-on-mobile']}
          />

          <Filter attributes={productsAttributesEntries} className={classes['hide-on-mobile']} />

          <div
            className={clsx(classes['container-attributes-sorting'], classes['container-attributes-sorting--mobile'])}
          >
            <AttributesOverlay
              attributes={productsAttributesEntries}
              className={classes['container-attributes-list--mobile']}
            />
            <SortingSelect />
          </div>

          <AttributesPillsList attributes={attributesEntries} className={classes['attributes-pill--mobile']} />

          <CollectionProducts page={Number(page)} productsData={productsData} limit={limit} />
        </div>
      </Gutter>

      <HR />
    </div>
  );
};

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let category: CategoryType | null = null;

  try {
    category = await fetchDoc<CategoryType>({
      collection: 'categories',
      slug: getLastFromArray(slug),
      draft: isDraftMode,
    });
  } catch (error) {}

  if (!category) return;

  return generateMeta({
    doc: { ...(category || {}), title: `Catégorie ${category?.title}` || `Catégorie ${getLastFromArray(slug)}` },
  });
}

export default Category;
