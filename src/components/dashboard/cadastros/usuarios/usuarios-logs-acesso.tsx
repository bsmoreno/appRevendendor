// usuarios-remover.tsx
import React, { MouseEventHandler, useEffect } from 'react';
import { Avatar, Box, Button, CircularProgress, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Modal, Paper, Stack, Typography } from '@mui/material';
import { Calendar as CalendarIcon } from '@phosphor-icons/react/dist/ssr/Calendar';
import { toast } from '@/components/core/toaster';
import dayjs from 'dayjs'

export interface UsuariosLogsAcessoProps {
    js_Login?: Date[];
    modalLogs: boolean;
    setModalLogs: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    p: 4,
};

export function UsuariosLogsAcesso({ js_Login, modalLogs, setModalLogs }: UsuariosLogsAcessoProps): React.JSX.Element {
    const handleClose = () => {
        setModalLogs(false);
    };
    return (
        <Modal
            open={modalLogs}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" 
        >
            <Box sx={style}>
                <Container maxWidth="sm">
                    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)' }}>
                        <Stack direction="row" spacing={2} sx={{ display: 'flex', p: 3 }}>
                            <Avatar sx={{ bgcolor: 'var(--mui-palette-primary-50)', color: 'var(--mui-palette-primary-main)' }}>
                                <CalendarIcon fontSize="var(--Icon-fontSize)" />
                            </Avatar>
                            <Stack spacing={3}>

                                <Stack spacing={1} width={'400px'}>
                                    <Stack spacing={1}>
                                        <Typography variant="h5">Ultimos Acesso</Typography>
                                    </Stack>
                                    <Stack direction="row">
                                        <List sx={{
                                            minWidth: '100%',
                                            position: 'relative',
                                            height: '300px',
                                            overflow: 'auto'
                                        }}>
                                            {
                                                js_Login?.length ?
                                                    js_Login
                                                        ?.sort((a: Date, b: Date) => {
                                                            return new Date(b).getTime() - new Date(a).getTime();
                                                        })
                                                        ?.slice(0, 10)
                                                        .map((d, i) => {
                                                            return (
                                                                <React.Fragment key={i}>
                                                                    <ListItem>
                                                                        <ListItemText primary={dayjs(d).format("DD/MM/YYYY HH:mm:ss")} />
                                                                    </ListItem>
                                                                    <Divider variant="fullWidth" component="li" />
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    : (
                                                        <React.Fragment>
                                                            <ListItem>
                                                                <ListItemText primary={'Usuário nunca acessou o sistema'} />
                                                            </ListItem>
                                                            <Divider variant="fullWidth" component="li" />
                                                        </React.Fragment>
                                                    )
                                            }



                                        </List>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                                    <Button color="secondary" variant="outlined" onClick={handleClose}>Sair</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </Modal>
    );
}
