import React from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { Category, Page as PageType, Settings } from '../../../payload/payload-types';
import { staticHome } from '../../../payload/seed/home-static';
import { fetchDoc } from '../../_api/fetchDoc';
import { fetchDocs } from '../../_api/fetchDocs';
import { Blocks } from '../../_components/Blocks';
import { Gutter } from '../../_components/Gutter';
import { Hero } from '../../_components/Hero';
import { generateMeta } from '../../_utilities/generateMeta';
import Categories from '../../_components/Categories';
import Promotion from '../../_components/Promotion';

import classes from './index.module.scss';
import { getMeUser } from '../../_utilities/getMeUser';
import { isActiveSubscription } from '../../_utilities/isActiveSubscription';
import { getPathFromSlugArr } from '../../_api/utils';
import { fetchSettings } from '../../_api/fetchGlobals';

// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic';

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode();

  if (slug !== 'home' && slug !== '') {
    const { user } = await getMeUser({
      nullUserRedirect: `/login?redirect=${encodeURIComponent(`/${slug}`)}`,
    });

    const isActiveSubscriptionStatus = await isActiveSubscription(user);

    if (!isActiveSubscriptionStatus)
      redirect(`/account?warning=${encodeURIComponent("Vous devez d'abord mettre à jour votre abonnement")}`);
  }

  let page: PageType | null = null;
  let categories: Category[] | null = null;
  let settings: Settings | null = null;

  try {
    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    });

    categories = (await fetchDocs<Category>('categories')).docs;

    settings = await fetchSettings();
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page && slug === 'home') {
    page = staticHome;
  }

  if (!page) {
    return notFound();
  }

  if (!categories) return notFound();

  const topLevelCategories = categories.filter((cat) => cat.parent === null);

  const categoriesOrderIds = settings?.categoriesOrder.map((cat) => (typeof cat === 'object' ? cat.id : cat));

  const sortedTopLevelCategoriesByOrder = topLevelCategories
    .filter((cat) => categoriesOrderIds.includes(cat.id))
    .sort((a, b) => categoriesOrderIds.indexOf(a.id) - categoriesOrderIds.indexOf(b.id));

  const sortedTopLevelCategoriesByTitle = topLevelCategories
    .filter((cat) => !categoriesOrderIds.includes(cat.id))
    .sort((a, b) => a.title.localeCompare(b.title));

  const sortedCategories = [...sortedTopLevelCategoriesByOrder, ...sortedTopLevelCategoriesByTitle];

  const { hero, layout } = page;

  return (
    <React.Fragment>
      {slug === 'home' ? (
        <section>
          <Hero {...hero} />

          <Gutter className={classes.home}>
            <Categories categories={sortedCategories} />
            <Promotion />
          </Gutter>
        </section>
      ) : (
        <>
          <Hero {...hero} />
          {(layout || []).length > 0 && (
            <Blocks blocks={layout} disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'} />
          )}
        </>
      )}
    </React.Fragment>
  );
}

export async function generateStaticParams() {
  try {
    const pages = (await fetchDocs<PageType>('pages')).docs;
    return pages?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  if (slug !== 'home' && slug !== '') {
    const { user } = await getMeUser({
      nullUserRedirect: `/login?redirect=${encodeURIComponent(`/${slug}`)}`,
    });

    const isActiveSubscriptionStatus = await isActiveSubscription(user);

    if (!isActiveSubscriptionStatus)
      redirect(`/account?warning=${encodeURIComponent("Vous devez d'abord mettre à jour votre abonnement")}`);
  }

  const { isEnabled: isDraftMode } = draftMode();

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

  if (!page && slug === 'home') {
    page = staticHome;
  }

  return generateMeta({ doc: page });
}
