import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { createGlobalState } from 'react-use';

export const useBlockUI = createGlobalState(false);
export function BlockUI(): React.JSX.Element {
    const [openState, setBlockUI] = useBlockUI();

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openState} >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

