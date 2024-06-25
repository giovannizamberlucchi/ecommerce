'use client';
import clsx from 'clsx';
import { Home } from '../../../../payload/payload-types';
import { Gutter } from '../../../_components/Gutter';
import classes from './index.module.scss';
import { Slider } from '../../../_components/Slider';
import { Media } from '../../../_components/Media';
import Link from 'next/link';

type FeaturedProductsProps = {
  products: Home['featuredProducts'];
};

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className={classes.height}>
      <Slider
        className={classes.slider}
        slides={(products.sliderArray || []).map((product, idx) => ({
          children: (
            <>
              {product.media && typeof product.media === 'object' && product.media.filename ? (
                <>
                  <Media className={classes['image-container']} imgClassName={classes.image} resource={product.media} />

                  <div className={classes['swiper-shutters-image-clones']}>
                    <Media
                      data-swiper-parallax="10%"
                      className={clsx(classes['swiper-shutters-image-clone'], classes['left-0'])}
                      imgClassName={clsx(classes['shutter-image'], classes['shutter-image--0'])}
                      resource={product.media}
                    />
                    <Media
                      data-swiper-parallax="-40%"
                      className={clsx(classes['swiper-shutters-image-clone'], classes['left-20'])}
                      imgClassName={clsx(classes['shutter-image'], classes['shutter-image--100'])}
                      resource={product.media}
                    />
                    <Media
                      data-swiper-parallax="30%"
                      className={clsx(classes['swiper-shutters-image-clone'], classes['left-40'])}
                      imgClassName={clsx(classes['shutter-image'], classes['shutter-image--200'])}
                      resource={product.media}
                    />
                    <Media
                      data-swiper-parallax="-80%"
                      className={clsx(classes['swiper-shutters-image-clone'], classes['left-60'])}
                      imgClassName={clsx(classes['shutter-image'], classes['shutter-image--300'])}
                      resource={product.media}
                    />
                    <Media
                      data-swiper-parallax="50%"
                      className={clsx(classes['swiper-shutters-image-clone'], classes['left-80'])}
                      imgClassName={clsx(classes['shutter-image'], classes['shutter-image--400'])}
                      resource={product.media}
                    />
                  </div>
                </>
              ) : null}
              <Gutter className={classes.container}>
                {idx === 0 && (
                  <h2 className={classes.title}>
                    Nos Produits <span>Star</span>
                  </h2>
                )}

                <div className={classes.content}>
                  <div>
                    <h3 className={clsx(classes['title-in-slider'])}>
                      #{idx + 1} {product.title}
                    </h3>
                    <h3 className={clsx(classes['text-orange'])}>{product.subtitle}</h3>
                  </div>

                  <p className={classes.description}>{product.description}</p>
                </div>

                <Link href={product.link} className={classes.button}>
                  {product.buttonText}
                </Link>
              </Gutter>
            </>
          ),
        }))}
      />
    </div>
  );
};
