import * as React from 'react';

interface TrocaSenhaController<T> { 
  handleOpen: () => void;
  handleClose: () => void; 
  open: boolean;
}

export function useTrocaSenha<T>(): TrocaSenhaController<T> {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => { 
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => { 
    setOpen(false);
  }, []);
 

  return { handleClose, handleOpen, open };
}