
import * as React from 'react';
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Divider, Fade, FormControl, FormHelperText, Grid, InputLabel, Modal, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Database as DataBaseIcon, XCircle as XCircleIcon, Trash as DeleteIcon, Plus as PlusIcon } from "@phosphor-icons/react"
import TiposModalHooks from './hooks/index'
import { TiposCriarHooks } from './hooks/tipos-criar-hooks';
export interface TiposCriarProps {
    tp_Novo: boolean
    handleCloseModal: () => void
}
export function TiposCriar({ tp_Novo, handleCloseModal }: TiposCriarProps): React.JSX.Element {
    const {
        Controller,
        handleSubmit,
        handleClose,
        onSubmit,
        errors,
        control,
        isSubmitting,
        open,
    } = TiposCriarHooks({ tpNovo: tp_Novo, handleCloseModal });
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableEnforceFocus
            closeAfterTransition
            disablePortal={true}
            keepMounted
            hideBackdrop={false}
            sx={{ bgcolor: 'var(--mui-palette-background-level0)' }}
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    p: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    {isSubmitting ?
                        <CircularProgress />
                        :
                        <Container maxWidth="lg">
                            <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 3 }}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack spacing={3} divider={<Divider />}>
                                        <Box>
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Grid sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                    <Avatar sx={{ bgcolor: 'var(--mui-palette-primary-50)', color: 'var(--mui-palette-primary-main)' }}>
                                                        <DataBaseIcon fontSize="var(--Icon-fontSize)" />
                                                    </Avatar>
                                                    <Typography variant="h5" pl={4}>Cadastro de Novo Tipo</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Stack spacing={1} divider={<Divider />}>
                                            <Stack spacing={1} sx={{ textAlign: 'left' }}>
                                                <Controller
                                                    control={control}
                                                    name="ds_Tipo"
                                                    render={({ field }: any) => (
                                                        <FormControl error={Boolean(errors.ds_Tipo)} fullWidth>
                                                            <InputLabel required>Tipo</InputLabel>
                                                            <OutlinedInput inputProps={{ style: { textTransform: 'lowercase' } }} {...field} />
                                                            {errors.ds_Tipo ? <FormHelperText>{errors.ds_Tipo.message}</FormHelperText> : null}
                                                        </FormControl>
                                                    )}
                                                />
                                            </Stack>
                                            <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                                                <Button type="button" color="secondary" variant="outlined"
                                                    onClick={(event: any) => { 
                                                        handleClose(event)
                                                    }}
                                                // onClick={(event: any, reason: any) => {
                                                //     handleClose(event, reason);
                                                // }}
                                                //onClick={handleClose}
                                                >
                                                    Cancelar
                                                </Button>
                                                <LoadingButton type="submit"
                                                    loadingIndicator="Salvando..."
                                                    loading={isSubmitting} variant="outlined">
                                                    Salvar
                                                </LoadingButton>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </form>
                            </Paper>
                        </Container>
                    }
                </Box>
            </Fade>
        </Modal>
    )
}