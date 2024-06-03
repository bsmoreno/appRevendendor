// import * as React from 'react';

// interface PopupController<T> {

//   handleOpen: () => void;
//   handleClose: () => void;
//   handleToggle: () => void;
//   open: boolean;
// }

// export function usePopup<T = HTMLElement>(): PopupController<T> {
//   //const anchorRef = React.useRef<T>(null);
//   const [anchor, setAnchor] = React.useState(null);
//   const [open, setOpen] = React.useState<boolean>(false);

//   const handleOpen = React.useCallback(() => {
//     setOpen(true);
//   }, []);

//   const handleClose = React.useCallback(() => {
//     setOpen(false);
//   }, []);

//   const handleToggle = React.useCallback(() => {
//     setOpen((prevState) => !prevState);
//   }, []);

//   return { anchor, setAnchor, handleClose, handleOpen, handleToggle, open };
// }

import { useCallback, useState } from 'react';
import { usePopupContext } from '../contexts/popup-context';

export interface PopupController {
  anchor: any;
  setAnchor: any;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export function usePopup(id: string): PopupController {
  const { openPopupId, handleOpen, handleClose } = usePopupContext();
  const [anchor, setAnchor] = useState(null);
  const isOpen = openPopupId === id;

  const open = useCallback(() => handleOpen(id), [handleOpen, id]);
  const close = useCallback(() => handleClose(), [handleClose]); 

  return { anchor, setAnchor, isOpen, open, close  };
}
