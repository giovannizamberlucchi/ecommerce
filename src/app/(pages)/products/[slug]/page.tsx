import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Product as ProductType } from '../../../../payload/payload-types';
import { fetchDoc } from '../../../_api/fetchDoc';
import { fetchDocs } from '../../../_api/fetchDocs';
import { Blocks } from '../../../_components/Blocks';
import { ProductHero } from '../../../_heros/Product';
import { generateMeta } from '../../../_utilities/generateMeta';
import { getMeUser } from '../../../_utilities/getMeUser';

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic';

export default async function Product({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode();

  await getMeUser({
    nullUserRedirect: `/login?redirect=${encodeURIComponent(`/products/${slug}`)}&error=${encodeURIComponent('Vous devez être connecté pour voir le produit')}`,
  });

  let product: ProductType | null = null;

  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  if (!product) notFound();

  const { relatedProducts } = product;

  return (
    <>
      <ProductHero product={product} />
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedProducts',
            blockName: 'Related Product',
            relationTo: 'products',
            introContent: [
              {
                type: 'h3',
                children: [
                  {
                    text: 'Produits connexes',
                  },
                ],
              },
            ],
            docs: relatedProducts,
          },
        ]}
      />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const products = (await fetchDocs<ProductType>('products')).docs;

    return products?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let product: ProductType | null = null;

  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {}

  return generateMeta({ doc: product });
}
