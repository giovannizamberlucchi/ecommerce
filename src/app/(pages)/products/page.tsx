import { draftMode } from 'next/headers';

import { Attribute, Category, Page as PageType, Product } from '../../../payload/payload-types';
import { fetchDoc } from '../../_api/fetchDoc';
import { fetchDocs } from '../../_api/fetchDocs';
import { Blocks } from '../../_components/Blocks';
import { Gutter } from '../../_components/Gutter';
import { HR } from '../../_components/HR';
import Filters from './Filters';

import classes from './index.module.scss';
import { CollectionProducts } from '../../_components/CollectionProducts';
import { PaginatedDocs } from 'payload/database';
import { notFound, redirect } from 'next/navigation';
import { AttributesPillsList } from '../../_components/AttributesPillsList';
import { AttributesFilter } from '../../_components/AttributesFilter';
import { AttributesOverlay } from '../../_components/AttributesOverlay';
import { Metadata } from 'next';
import { generateMeta } from '../../_utilities/generateMeta';
import { staticCart } from '../../../payload/seed/cart-static';
import { getMeUser } from '../../_utilities/getMeUser';
import { isActiveSubscription } from '../../_utilities/isActiveSubscription';

export const dynamic = 'force-dynamic';

type ProductsProps = {
  searchParams: {
    page?: string;
  } & Record<string, string | string[] | undefined>;
};

const Products: React.FC<ProductsProps> = async ({ searchParams }) => {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour voir la page du magasin.',
    )}&redirect=${encodeURIComponent('/products')}`,
  });
  const isActiveSubs = await isActiveSubscription(user);
  if (!isActiveSubs) redirect('/login');

  const { isEnabled: isDraftMode } = draftMode();
  const { page = '1' } = searchParams;

  let pageCMS: PageType | null = null;
  let categories: Category[] | null = null;
  let productsData: PaginatedDocs<Product> | null = null;
  let attributesForProducts: Attribute[] | null = null;
  let AllProductsAttributes: Product[] | null = null;

  const limit = 12;
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

  try {
    pageCMS = await fetchDoc<PageType>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    });

    categories = (await fetchDocs<Category>('categories')).docs || [];

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

    productsData = await fetchDocs<Product>('products', isDraftMode, {
      attributes,
      page: Number(page),
      limit: limit,
    });

    AllProductsAttributes = (await fetchDocs<Product>('products-attributes', isDraftMode)).docs;
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

  if (categories === null) return notFound();
  if (Number(page) > productsData?.totalPages) return notFound();

  const subcategories = categories.filter((cat) => cat.parent === null);

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <AttributesPillsList attributes={attributesEntries} className={classes['attributes-pill--desktop']} />

        <div>
          <Filters categories={categories} subcategories={subcategories} />
          <AttributesFilter
            attributes={productsAttributesEntries}
            className={classes['container-attributes-list--desktop']}
          />
        </div>

        <div>
          <Blocks blocks={pageCMS?.layout} disableTopPadding={true} />
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

export default Products;

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();
  const slug = 'products';

  let page: PageType | null = null;

  try {
    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static home page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }
  if (!page) {
    page = staticCart;
  }

  return generateMeta({ doc: page });
}
