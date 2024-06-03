// usuarios-TrocarSenha.tsx
import React, { MouseEventHandler, useEffect } from 'react';
import { Avatar, Box, Button, CircularProgress, Container, IconButton, Modal, Paper, Stack, Typography } from '@mui/material';
import { Copy as CopyIcon } from '@phosphor-icons/react/dist/ssr/Copy';
import { Password as PasswordIcon } from '@phosphor-icons/react/dist/ssr/Password';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authProvider } from '@/lib/provider';
import { toast } from '@/components/core/toaster';
import { Usuario } from '@/types/user';

export interface UsuariosTrocarSenhaProps {
    idUsuario?: string;
    setModalTrocarSenha: React.Dispatch<React.SetStateAction<string>>;
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

export function UsuariosTrocarSenha({ idUsuario, setModalTrocarSenha, dataGrid }: UsuariosTrocarSenhaProps): React.JSX.Element {
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const { data: usuario, isLoading, error } = useQuery({
        queryKey: ['UsuariosV1TrocarSenha'],
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

    const mutationTrocarSenhaUsuario = useMutation({
        mutationKey: ['UsuariosV1TrocarSenha'],
        mutationFn: async () => {
            let result = await authProvider.put('/Usuarios/v1/AtualizarSenha', idUsuario)
            if (result.status === 200)
                if (result.data) {
                    return result.data;
                }
                else {
                    throw new Error('Falha ao Atualizar Senha do Usuário')
                }
            else
                throw new Error('Falha ao Atualizar Senha do Usuário')
        }
    })

    const handleClose = () => {
        queryClient.removeQueries({ queryKey: ['UsuariosV1TrocarSenha'], exact: true });
        mutationTrocarSenhaUsuario.reset();
        setOpen(false);
        setModalTrocarSenha('');
    };
    const handleTrocarSenhaUsuario = async (event: any) => {
        event.preventDefault()
        await mutationTrocarSenhaUsuario.mutateAsync();
    }
    useEffect(() => {
        setOpen(idUsuario !== '');
    }, [idUsuario]);

    useEffect(() => {
        // if (dataGrid && mutationTrocarSenhaUsuario.isSuccess) {
        //     handleClose();
        //     dataGrid?.current?.instance?.refresh();
        //     toast.error('Senha Atualizada com Sucesso!');
        // }
        // if (mutationTrocarSenhaUsuario.isError) {
        //     toast.error(mutationTrocarSenhaUsuario.error.message);
        //     mutationTrocarSenhaUsuario.reset();
        // }
    }, [mutationTrocarSenhaUsuario])
    const handleCopyToClipboard = async (novaSenha: string) => {
        try {
            await navigator.clipboard.writeText(novaSenha);
            toast.success('Senha copiada para o clipboard!');
        } catch (err) {
            console.error('Falha ao copiar o texto: ', err);
            toast.error('Falha ao copiar o texto para o clipboard.');
        }
    };
    const ExibeUsuario = (usuario: Usuario) => {
        return (<Stack spacing={3}>
            <Stack spacing={1}>
                <Typography variant="h5">Trocar Senha</Typography>
                <Typography color="text.secondary" variant="body1">
                    Deseja Realmente Trocar Senha do Usuário:
                </Typography>
                <Typography color="text.secondary" variant="body1" fontWeight={'bold'}>
                    {usuario?.ds_Nome}  {usuario?.ds_Sobrenome} - {usuario?.ds_Email}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button color="error" variant="outlined" onClick={handleTrocarSenhaUsuario} startIcon={<PasswordIcon />}>
                    Trocar Senha
                </Button>
            </Stack>
        </Stack>
        )
    }
    const ExibeNovaSenha = (novaSenha: string) => {
        return (
            <Stack spacing={3} width={'100%'}>
                <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Typography color="text.secondary" variant="h5">Nova Senha:</Typography>

                    <Stack direction="row" spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            aria-label="copy"
                            color="secondary"
                            variant='text'
                            endIcon={<CopyIcon />}
                            onClick={(event) => handleCopyToClipboard(novaSenha)}>
                            {novaSenha}
                        </Button>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                    <Button color="secondary" variant="outlined" onClick={handleClose}>Sair</Button>
                </Stack>
            </Stack>
        )
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop={true}
        >
            <Box sx={style}>
                {(
                    (isLoading || mutationTrocarSenhaUsuario.isPending) ? <Stack alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} >
                        <CircularProgress /> Carregando...
                    </Stack> :
                        !error ?
                            <Container maxWidth="sm">
                                <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)' }}>
                                    <Stack direction="row" spacing={2} sx={{ display: 'flex', p: 3 }}>
                                        <Avatar sx={{ bgcolor: 'var(--mui-palette-error-50)', color: 'var(--mui-palette-error-main)', display: (mutationTrocarSenhaUsuario.isSuccess ? 'none' : '') }} >
                                            <PasswordIcon fontSize="var(--Icon-fontSize)" />
                                        </Avatar>
                                        {!mutationTrocarSenhaUsuario.isSuccess ?
                                            ExibeUsuario(usuario) :
                                            ExibeNovaSenha(mutationTrocarSenhaUsuario.data)}
                                    </Stack>
                                </Paper>
                            </Container>
                            : <Typography color="text.secondary" variant="body2">
                                {error.message}
                            </Typography>

                )}
            </Box>
        </Modal >
    );
}
