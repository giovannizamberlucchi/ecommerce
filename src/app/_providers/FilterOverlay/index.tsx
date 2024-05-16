'use client';

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react';

interface IContextType {
  overlayShow: boolean;
  setOverlayShow: React.Dispatch<SetStateAction<boolean>>;
}

export const INITIAL_FILTER_BUTTON_DATA = {
  overlayShow: false,
  setOverlayShow: () => false,
};

const FilterOverlayContext = createContext<IContextType>(INITIAL_FILTER_BUTTON_DATA);

export const FilterOverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [overlayShow, setOverlayShow] = useState(false);

  return (
    <FilterOverlayContext.Provider
      value={{
        overlayShow,
        setOverlayShow,
      }}
    >
      {children}
    </FilterOverlayContext.Provider>
  );
};

export const useFilterOverlay = () => useContext(FilterOverlayContext);
