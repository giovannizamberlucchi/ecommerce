import React from 'react';
import { useTheme } from 'payload/components/utilities';

export const Logo = () => {
  const { theme } = useTheme();

  if (theme === 'light') return <img src="/resovalie-black.webp" className="graphic-logo" />;
  if (theme === 'dark') return <img src="/resovalie-white.webp" className="graphic-logo" />;
};
