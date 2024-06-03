import * as React from 'react';
import { Alert, AlertColor, AlertProps, AlertPropsColorOverrides, Snackbar, SnackbarProps } from '@mui/material'; 
export interface AlertaProps extends AlertProps {
    mensagem: string;
}

export function Alertas({ mensagem, ...props }: AlertaProps): React.JSX.Element {
    return (
        <Snackbar open={(mensagem === '' ? false : true )} autoHideDuration={6000}>
            <Alert  
                variant="filled"
                sx={{ width: '100%' }}
                {...props}
            >
                {mensagem}
            </Alert>
        </Snackbar>
    );
}


