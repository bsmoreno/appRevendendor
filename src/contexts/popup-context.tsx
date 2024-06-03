import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface PopupContextProps {
  openPopupId: string | null;
  handleOpen: (id: string) => void;
  handleClose: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);

  const handleOpen = useCallback((id: string) => {
    setOpenPopupId(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenPopupId(null);
  }, []);

  return (
    <PopupContext.Provider value={{ openPopupId, handleOpen, handleClose }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = (): PopupContextProps => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopupContext must be used within a PopupProvider');
  }
  return context;
};
