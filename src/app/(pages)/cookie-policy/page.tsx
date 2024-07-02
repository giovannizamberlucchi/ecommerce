import { notFound } from 'next/navigation';
import { Page } from '../../../payload/payload-types';
import { fetchDoc } from '../../_api/fetchDoc';
import { Gutter } from '../../_components/Gutter';
import { Blocks } from '../../_components/Blocks';
import classes from './index.module.scss';
import { Metadata } from 'next';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';

export default async function CookiePolicy() {
  let cookiePolicy: Page | null = null;

  try {
    cookiePolicy = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cookie-policy',
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  if (!cookiePolicy) return notFound();

  return (
    <Gutter className={classes.container}>
      <h3 className={classes.title}>{cookiePolicy.title}</h3>
      {(cookiePolicy?.layout || [])?.length > 0 && <Blocks blocks={cookiePolicy?.layout} disableTopPadding={true} />}
    </Gutter>
  );
}

export const metadata: Metadata = {
  title: 'Mentions legales',
  description: 'Mentions legales',
  openGraph: mergeOpenGraph({
    title: 'Mentions legales',
    url: '/cookie-policy',
  }),
};
