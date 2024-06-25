{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react';

import { Header as HeaderType, Media } from '../../../payload/payload-types';
import { fetchHeader } from '../../_api/fetchGlobals';
import HeaderComponent from './HeaderComponent';

export async function Header() {
  let header: HeaderType | null = null;

  try {
    header = await fetchHeader();
  } catch (error) {
    console.log(error);
  }
  const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${(header?.media as Media)?.filename}`;

  return (
    <>
      <HeaderComponent header={header} mediaSrc={src} />
    </>
  );
}
