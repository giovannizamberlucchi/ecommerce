import { notFound } from 'next/navigation';
import { Home as HomeType } from '../../../payload/payload-types';
import { fetchHome } from '../../_api/fetchGlobals';
import { Hero } from './Hero';
import classes from './index.module.scss';
import { Services } from './Services';
import { ProcessDescription } from './ProcessDescription';
import { FeaturedProducts } from './FeaturedProducts';
import { CompanyInNumber } from './CompanyInNumber';
import { Metadata } from 'next';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';

const Home = async () => {
  let home: HomeType | null = null;

  try {
    home = await fetchHome();
  } catch (error) {
    console.error(error);
  }

  if (!home) return notFound();

  return (
    <div className={classes.container}>
      <Hero hero={home.hero} />

      <Services services={home.services} />

      <ProcessDescription processDescription={home.processDescription} />

      <FeaturedProducts products={home.featuredProducts} />

      <CompanyInNumber numbers={home.companyInNumbers.numbers} />
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Maison',
  description: "Page d'accueil.",
  openGraph: mergeOpenGraph({
    title: 'Maison',
    url: '/',
  }),
};

export default Home;
