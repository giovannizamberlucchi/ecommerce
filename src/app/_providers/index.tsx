'use client';

import React from 'react';

import { AuthProvider } from '../_providers/Auth';
import { CartProvider } from '../_providers/Cart';
import { ThemeProvider } from './Theme';
import { FilterProvider } from './Filter';
import { FilterOverlayProvider } from './FilterOverlay';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <FilterOverlayProvider>
            <CartProvider>{children}</CartProvider>
          </FilterOverlayProvider>
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
