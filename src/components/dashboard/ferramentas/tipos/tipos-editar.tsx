
import * as React from 'react';
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Divider, Fade, FormControl, FormHelperText, Grid, IconButton, InputLabel, Modal, OutlinedInput, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Database as DataBaseIcon, XCircle as XCircleIcon, Trash as DeleteIcon, Plus as PlusIcon } from "@phosphor-icons/react"
import { TiposEditarHooks } from './hooks/tipos-editar-hooks';
import { v4 as uuidV4 } from 'uuid';
import { Tipo } from '@/types/ferramentas/tipo';
export interface TiposCriarProps {
    ds_Tipo: string
    handleCloseModal: () => void
}
export function TiposEditar({ ds_Tipo, handleCloseModal }: TiposCriarProps): React.JSX.Element {

    const {
        Controller,
        handleSubmit,
        handleClose,
        onSubmit,
        getFieldState,
        errors,
        control,
        isError,
        isSubmitting,
        isFetching,
        isLoading,
        open,
        setOpen,
        tipo,
        fields, append, prepend, remove, swap, move, insert
    } = TiposEditarHooks({ dsTipo: ds_Tipo, handleCloseModal });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableEnforceFocus
            closeAfterTransition
            keepMounted
            hideBackdrop={false}
            disableAutoFocus={false}
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
                    <Container maxWidth="lg">
                        <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 3 }}>
                            {isLoading || isFetching || isSubmitting ?
                                <CircularProgress />
                                :
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack spacing={3} divider={<Divider />}>
                                        <Box>
                                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Grid sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                    <Avatar sx={{ bgcolor: 'var(--mui-palette-primary-50)', color: 'var(--mui-palette-primary-main)' }}>
                                                        <DataBaseIcon fontSize="var(--Icon-fontSize)" />
                                                    </Avatar>
                                                    <Typography variant="h5" pl={4}>Cadastro de Tipos - {tipo?.ds_Tipo?.toLocaleUpperCase()}</Typography>
                                                </Grid>
                                                {/* <Grid sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                    <Button color="error" variant="text" onClick={handleClose}>
                                                        <XCircleIcon />
                                                    </Button>
                                                </Grid> */}
                                            </Grid>
                                        </Box>
                                        <Stack spacing={1} divider={<Divider />}>
                                            <Stack spacing={1} sx={{ textAlign: 'left' }}>
                                                <Controller
                                                    control={control}
                                                    name="ds_Tipo"
                                                    render={({ field }) => (
                                                        <FormControl error={Boolean(errors.ds_Tipo)} fullWidth>
                                                            <InputLabel required>Tipo</InputLabel>
                                                            <OutlinedInput inputProps={{ style: { textTransform: 'lowercase' }, "aria-readonly": true }} {...field} />
                                                            {errors.ds_Tipo ? <FormHelperText>{errors.ds_Tipo.message}</FormHelperText> : null}
                                                        </FormControl>
                                                    )}
                                                />
                                            </Stack>
                                            <Stack spacing={1} sx={{ textAlign: 'left' }}>
                                                <TableContainer component={Paper}>
                                                    <Table stickyHeader aria-label="sticky table" size="small" >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell key={uuidV4()} align={'center'} size="small">
                                                                    Ordem
                                                                </TableCell>
                                                                <TableCell key={uuidV4()} align={'left'} size="small">
                                                                    Texto *
                                                                </TableCell>
                                                                <TableCell key={uuidV4()} align={'left'} size="small">
                                                                    Detalhes *
                                                                </TableCell>
                                                                <TableCell key={uuidV4()} align={'center'} size="small">
                                                                    <Tooltip title="Novo">
                                                                        <IconButton onClick={(e) => {
                                                                            const newItem = {
                                                                                id: uuidV4(),
                                                                                text: '',
                                                                                detail: '',
                                                                                status: true,
                                                                            } satisfies Tipo;
                                                                            append(newItem);
                                                                        }}>
                                                                            <PlusIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {fields.map((item: any, index: any) => {
                                                                if (item.status === true) {
                                                                    return (
                                                                        <TableRow role="button" tabIndex={index} key={index}>
                                                                            <TableCell key={`${uuidV4()}`} align={'center'} size="small">
                                                                                {index + 1}
                                                                            </TableCell>
                                                                            <TableCell key={`${uuidV4()}`} align={'left'} size="small">
                                                                                <Controller
                                                                                    control={control}
                                                                                    name={`js_Tipo.${index}.text`}
                                                                                    render={({ field, fieldState }) => (
                                                                                        <FormControl error={Boolean(fieldState?.error?.message)} fullWidth>
                                                                                            <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                                                                                            {fieldState?.error?.message ? <FormHelperText>{fieldState?.error?.message}</FormHelperText> : null}
                                                                                        </FormControl>
                                                                                    )}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell key={`${uuidV4()}`} align={'left'} size="small">
                                                                                <Controller
                                                                                    control={control}
                                                                                    name={`js_Tipo.${index}.detail`}
                                                                                    render={({ field, fieldState, formState }) => {
                                                                                        return (
                                                                                            <FormControl error={Boolean(fieldState?.error?.message)} fullWidth>
                                                                                                <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                                                                                                {getFieldState(`js_Tipo.${index}.text`, formState)?.error?.message ? <FormHelperText>&nbsp;</FormHelperText> : null}
                                                                                            </FormControl>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell key={`${uuidV4()}`} align={'center'} size="small">
                                                                                <Tooltip title="Remover">
                                                                                    <IconButton onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        remove(index);
                                                                                    }}>
                                                                                        <DeleteIcon />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                }
                                                                else
                                                                    return null
                                                            })}
                                                        </TableBody>
                                                        {errors?.js_Tipo ?
                                                            <TableFooter>
                                                                <TableRow>
                                                                    <TableCell colSpan={4}>
                                                                        <FormControl error={Boolean(errors?.js_Tipo)} fullWidth>
                                                                            <FormHelperText>{
                                                                                errors?.js_Tipo?.root?.message
                                                                            }</FormHelperText>
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableFooter>
                                                            : null}
                                                    </Table>
                                                </TableContainer>
                                            </Stack>
                                            <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                                                <Button type="button" color="secondary" variant="outlined" onClick={(event: any) => {
                                                    handleClose(event);
                                                }}>
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
                            }
                        </Paper>
                    </Container>
                </Box>
            </Fade>
        </Modal>
    )
}