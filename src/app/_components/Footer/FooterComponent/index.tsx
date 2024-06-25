'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Footer, Media as MediaType, Settings } from '../../../../payload/payload-types';
import { noHeaderFooterUrls } from '../../../constants';
import { Gutter } from '../../Gutter';

import classes from './index.module.scss';
import { LinkedIn } from '../../icons/LinkedIn';
import { WhatsApp } from '../../icons/WhatsApp';
import { Mail } from '../../icons/Mail';
import { Instagram } from '../../icons/Instagram';
import { Media } from '../../Media';
import Image from 'next/image';

const FooterComponent = ({ footer, setting }: { footer: Footer; setting: Settings }) => {
  const pathname = usePathname();
  const navItems = footer?.navItems || [];

  const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${(footer?.media as MediaType)?.filename}`;

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter className={classes.footer} left right>
        <Image src={src} alt="logo" width={250} height={23} className={classes.logo} />
        <div className={classes.container}>
          <p className={classes.title}>Resovalie</p>

          <div>
            {navItems.map((item, index) => (
              <Link
                href={item.link.url || '/'}
                key={index}
                target={item.link.newTab && '_blank'}
                className={classes.link}
              >
                {item.link.label}
              </Link>
            ))}
          </div>

          <div className={classes['social-media']}>
            {setting?.socialMedia?.linkedInUrlSlug && (
              <Link
                href={`https://ua.linkedin.com/${setting?.socialMedia.linkedInUrlSlug}`}
                className={classes['social-media-link']}
              >
                <LinkedIn className={classes['social-media-icon']} />
              </Link>
            )}

            {setting?.socialMedia?.whatsAppUrlSlug && (
              <Link
                href={`https://wa.me/${setting?.socialMedia.whatsAppUrlSlug}`}
                className={classes['social-media-link']}
              >
                <WhatsApp className={classes['social-media-icon']} />
              </Link>
            )}

            {setting?.contactEmail && (
              <Link href={`mailto:${setting?.contactEmail}`} className={classes['social-media-link']}>
                <Mail className={classes['social-media-icon']} />
              </Link>
            )}

            {setting?.socialMedia?.instagramUrlSlug && (
              <Link
                href={`https://www.instagram.com/${setting?.socialMedia.instagramUrlSlug}/`}
                className={classes['social-media-link']}
              >
                <Instagram className={classes['social-media-icon']} />
              </Link>
            )}
          </div>
        </div>

        <div className={classes.container}>
          <p className={classes.title}>Nos Business Clubs</p>

          <div className={classes.club}>
            {footer?.businessClub?.map((item, index) => (
              <Link href={item.link} key={index} className={classes['club-link']}>
                <Media resource={item.icon} imgClassName={classes['club-image']} />
              </Link>
            ))}
          </div>
        </div>
      </Gutter>
    </footer>
  );
};

export default FooterComponent;
