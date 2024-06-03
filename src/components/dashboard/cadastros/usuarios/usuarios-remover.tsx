// usuarios-remover.tsx
import React, { MouseEventHandler, useEffect } from 'react';
import { Avatar, Box, Button, CircularProgress, Container, Modal, Paper, Stack, Typography } from '@mui/material';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import { UserMinus as UserMinusIcon } from '@phosphor-icons/react/dist/ssr/UserMinus';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authProvider } from '@/lib/provider';
import { toast } from '@/components/core/toaster';

export interface UsuariosRemoverProps {
    idUsuario?: string;
    setModalRemover: React.Dispatch<React.SetStateAction<string>>;
    dataGrid: any;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function UsuariosRemover({ idUsuario, setModalRemover, dataGrid }: UsuariosRemoverProps): React.JSX.Element {
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['Usuarios/v1/Buscar'],
        queryFn: async () => {
            let result = await authProvider.get(`Usuarios/v1/Buscar`, {
                params: {
                    id_Usuario: idUsuario
                }
            })
            if (result.status === 200)
                return result.data
            else
                throw new Error('Falha ao Carregar Usuário')
        },
        enabled: !!idUsuario && open,

    });

    const mutationRemoverUsuario = useMutation({
        mutationKey: ['Usuarios/v1/Buscar'],
        mutationFn: async () => {
            let result = await authProvider.delete('/Usuarios/v1/Deletar', {
                params: {
                    id_Usuario: idUsuario
                }
            })
            if (result.status === 200)
                if (result.data) {
                    return result.data;
                }
                else {
                    throw new Error('Falha ao Deletar Usuário')
                }
            else
                throw new Error('Falha ao Deletar Usuário')
        }
    })

    const handleClose = () => {
        queryClient.removeQueries({ queryKey: ['Usuarios/v1/Buscar'], exact: true });
        mutationRemoverUsuario.reset();
        setOpen(false);
        setModalRemover('');
    };
    const handleRemoverUsuario = async (event:any) => {
        event.preventDefault()
        await mutationRemoverUsuario.mutateAsync();
    }
    useEffect(() => {
        setOpen(idUsuario !== '');
    }, [idUsuario]);

    useEffect(() => {
        if (dataGrid && mutationRemoverUsuario.isSuccess) {
            handleClose();
            dataGrid?.current?.instance?.refresh();
            toast.error('Usuário Removido com Sucesso!');
        }
        if (mutationRemoverUsuario.isError) {
            toast.error(mutationRemoverUsuario.error.message);
            mutationRemoverUsuario.reset();
        }


    }, [mutationRemoverUsuario])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop={true}
        >
            <Box sx={style}>

                {(isLoading || mutationRemoverUsuario.isPending) ? <Stack alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} >
                    <CircularProgress /> Carregando...
                </Stack> :
                    !error ?
                        <Container maxWidth="sm">
                            <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)' }}>
                                <Stack direction="row" spacing={2} sx={{ display: 'flex', p: 3 }}>
                                    <Avatar sx={{ bgcolor: 'var(--mui-palette-error-50)', color: 'var(--mui-palette-error-main)' }}>
                                        <WarningIcon fontSize="var(--Icon-fontSize)" />
                                    </Avatar>
                                    <Stack spacing={3}>
                                        <Stack spacing={1}>
                                            <Typography variant="h5">Remover Usuário</Typography>
                                            <Typography color="text.secondary" variant="body1">
                                                Deseja Realmente Remover o Usuário:
                                            </Typography>
                                            <Typography color="text.secondary" variant="body1" fontWeight={'bold'}>
                                                {data?.ds_Nome}  {data?.ds_Sobrenome} - {data?.ds_Email}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                                            <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
                                            <Button color="error" variant="outlined" onClick={handleRemoverUsuario} startIcon={<UserMinusIcon />}>
                                                Remover
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Container>
                        : <Typography color="text.secondary" variant="body2">
                            {error.message}
                        </Typography>
                }
            </Box>
        </Modal>
    );
}
