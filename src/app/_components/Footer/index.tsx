import React from 'react';

import { Footer as FooterType, Settings } from '../../../payload/payload-types';
import { fetchFooter, fetchSettings } from '../../_api/fetchGlobals';
import FooterComponent from './FooterComponent';

export async function Footer() {
  let footer: FooterType | null = null;
  let setting: Settings | null = null;

  try {
    footer = await fetchFooter();
    setting = await fetchSettings();
  } catch (error) {
    console.log(error);
  }
  return <FooterComponent footer={footer} setting={setting} />;
}
