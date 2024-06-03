import React, { useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { EyeClosed as EyeClosedIcon, Eye as EyeIcon, EyeSlash as EyeSlashIcon, Password as PasswordIcon, Warning } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authProvider } from '@/lib/provider';
import { toast } from '@/components/core/toaster';
import { useUser } from '@/hooks/use-user';
import { Controller, useForm } from 'react-hook-form';
import * as v from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const style = {
    position: 'absolute',
    top: '100%',
    left: '100%',
    transform: 'translate(-100%, -100%)',
    width: '100%',
    height: '100%',
    bgcolor: 'background.default',
    border: '0px',
    boxShadow: 24,
    p: 4,
};
export interface UsuariosTrocarSenhaProps {
    handleOpen: () => void;
    handleClose: () => void;
    open: boolean;
}
// Definição do esquema de validação
const schemaUsuariosTrocarSenha = v.object({
    ds_Senha: v.string([
        v.minLength(8, 'A sua senha é muito curta. Deve ter no mínimo 8 caracteres.'),
        v.maxLength(30, 'A sua senha é muito longa. Deve ter no máximo 30 caracteres.'),
        v.regex(/[a-z]/, 'A sua senha deve conter pelo menos uma letra minúscula.'),
        v.regex(/[A-Z]/, 'A sua senha deve conter pelo menos uma letra maiúscula.'),
        v.regex(/[0-9]/, 'A sua senha deve conter pelo menos um número.'),
    ]),
    ds_ConfirmaSenha: v.string()
},
    [
        v.forward(
            v.custom(
                (input) => input.ds_Senha === input.ds_ConfirmaSenha,
                'As duas senhas não conferem.'
            ),
            ['ds_ConfirmaSenha']
        ),
    ]);




type schemaUsuariosTrocarSenhaRules = v.Output<typeof schemaUsuariosTrocarSenha>;

const defaultValues = {
    ds_Senha: '',
    ds_ConfirmaSenha: '',
} satisfies schemaUsuariosTrocarSenhaRules;

export function UsuariosTrocarSenha({ handleOpen, handleClose, open }: UsuariosTrocarSenhaProps): React.JSX.Element {
    const { user: usuario, setTrocaPassword } = useUser();
    const [viewPassword, setViewPassword] = React.useState(false);
    const [isCarregando, setIsCarregando] = React.useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['AuthTrocarSenha'],
        queryFn: async () => {
            let result = await authProvider.get(`Auth/v1/BuscaUsuario`, {
                params: {
                    id_Usuario: usuario?.id_Usuario
                }
            });
            if (result.status === 200) return result.data;
            else throw new Error('Falha ao Carregar Usuário');
        },
        enabled: !!usuario && open,
    });

    const mutationTrocarSenhaUsuario = useMutation({
        mutationKey: ['AuthTrocarSenha'],
        mutationFn: async () => {
            let result = await authProvider.put('/Auth/v1/TrocarSenha', {
                id_Usuario: usuario?.id_Usuario,
                ds_Senha: watch('ds_Senha'),
                ds_ConfirmaSenha: watch('ds_ConfirmaSenha'),
            });
            if (result.status === 200) {
                if (result.data) {
                    return result.data;
                } else {
                    throw new Error('Falha ao Atualizar Senha do Usuário');
                }
            } else {
                reset({
                    ds_Senha: '',
                    ds_ConfirmaSenha: ''
                })
                setError("ds_Senha", { type: 'custom', message: result.data }, { shouldFocus: true });
                throw new Error(result.data);
            }
        }
    });

    const handleCloseModal = async () => {
        try {
            setIsCarregando(true)
            await setTrocaPassword();
            if (usuario?.tp_TrocarSenha === false || data?.tp_TrocaSenha === false) {
                queryClient.removeQueries({ queryKey: ['AuthTrocarSenha'], exact: true });
                mutationTrocarSenhaUsuario.reset();
                reset({
                    ds_Senha: '',
                    ds_ConfirmaSenha: ''
                })
                handleClose();
                return;
            }

        }
        finally {
            setIsCarregando(false)
        }
    };

    const handleTrocarSenhaUsuario = async (user: schemaUsuariosTrocarSenhaRules) => {
        try {
            await mutationTrocarSenhaUsuario.mutateAsync();
            await setTrocaPassword();
            handleCloseModal();
            toast.success('Senha atualizada com sucesso!');
        } catch (err: any) {
            toast.error(err.message || 'Erro ao atualizar senha.');
        }
    };

    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    useEffect(() => {
        if (usuario?.tp_TrocarSenha === true || data?.tp_TrocaSenha === true) {
            handleOpen();
        }
    }, [data, usuario]);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch,
        reset
    } = useForm<schemaUsuariosTrocarSenhaRules>({
        mode: 'all',
        defaultValues,
        resolver: valibotResolver(schemaUsuariosTrocarSenha),
    });
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={style}
            hideBackdrop={true}
            disableAutoFocus={true}
            disableEnforceFocus={true}
        >
            <Box sx={{ margin: '18%' }}>
                {isLoading || mutationTrocarSenhaUsuario.isPending || mutationTrocarSenhaUsuario.isSuccess || isCarregando ? (
                    <Stack alignItems="center" justifyContent="center" height="100%">
                        <CircularProgress /> Carregando...
                    </Stack>
                ) : (
                    !error ? (
                        <form onSubmit={handleSubmit(handleTrocarSenhaUsuario)}>
                            <Container maxWidth="sm">
                                <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)' }}>
                                    <Stack spacing={3} sx={{ display: 'flex', p: 3 }}>
                                        <Stack direction={'row'} spacing={2} sx={{ display: 'flex', alignContent: 'center', justifyContent: 'flex-start' }}>
                                            <Typography variant='h3'>
                                                <PasswordIcon />
                                            </Typography>
                                            <Typography variant='h3'>
                                                Trocar Senha
                                            </Typography>
                                        </Stack>
                                        <Divider />
                                        <Stack spacing={2} sx={{ display: 'flex', p: 3 }}>
                                            <Controller
                                                name="ds_Senha"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.ds_Senha)} fullWidth>
                                                        <InputLabel required>Nova Senha</InputLabel>
                                                        <OutlinedInput
                                                            {...field}
                                                            type={viewPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end" tabIndex={-1}>
                                                                    <Button variant='text' color='secondary' onClick={handleViewPassword} tabIndex={-1}>
                                                                        {!viewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                                                    </Button>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                        {errors.ds_Senha && <FormHelperText>{errors.ds_Senha.message}</FormHelperText>}
                                                    </FormControl>
                                                )}
                                            />
                                            <Controller
                                                name="ds_ConfirmaSenha"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.ds_ConfirmaSenha)} fullWidth>
                                                        <InputLabel required>Confirme a Nova Senha</InputLabel>
                                                        <OutlinedInput
                                                            {...field}
                                                            type={viewPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end" tabIndex={-1}>
                                                                    <Button variant='text' color='secondary' onClick={handleViewPassword} tabIndex={-1}>
                                                                        {!viewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                                                    </Button>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                        {errors.ds_ConfirmaSenha && <FormHelperText>{errors.ds_ConfirmaSenha.message}</FormHelperText>}
                                                    </FormControl>
                                                )}
                                            />
                                        </Stack>
                                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                                            <Button color="secondary" size='small' variant="outlined" onClick={handleCloseModal}>Cancel</Button>
                                            <Button color="primary" size='small' variant="outlined" type="submit" startIcon={<PasswordIcon />}>
                                                Trocar Senha
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Container>
                        </form>
                    ) : (
                        <Typography color="text.secondary" variant="body2">
                            {error.message}
                        </Typography>
                    )
                )}
            </Box>
        </Modal>
    );
}
