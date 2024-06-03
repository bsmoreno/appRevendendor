'use client';

import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    ToggleButton,
    ButtonGroup,
    IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { NumericFormat } from 'react-number-format';
import { FornecedoresCriarFromHooks } from './hooks/fornecedores-criar-form-hooks';
import MaskedInput from 'react-text-mask'
import { MagnifyingGlass as SearchIcon } from '@phosphor-icons/react';
import AutoCompleteCidades from '@/components/widgets/autocomplete/autocompletecidades';

export function FornecedoresCriarForm(): React.JSX.Element {
    var {
        Controller,
        handleSubmit,
        handleCep,
        setValue,
        setFocus,
        onSubmit,
        watch,
        errors,
        control,
        isSubmitting,
        navigate,
        maskTelefone,
        maskCpfCnpj,
        maskCep
    } = FornecedoresCriarFromHooks();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent>
                    <Stack divider={<Divider />} spacing={4}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Informações Basicas</Typography>
                            <Grid container spacing={2}>
                                <Grid md={4} xsOffset={0} xs={12} >
                                    <Controller
                                        control={control}
                                        name="cd_CpfCnpj"
                                        rules={{ maxLength: 14 }}
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.cd_CpfCnpj)} fullWidth>
                                                <InputLabel required>CPF/CNPJ</InputLabel>
                                                <MaskedInput
                                                    value={field.value}
                                                    mask={maskCpfCnpj}
                                                    keepCharPositions={true}
                                                    guide={false}
                                                    render={(ref, props) => (<OutlinedInput
                                                        inputRef={ref}
                                                        ref={field.ref}
                                                        {...props}
                                                    />
                                                    )}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                    onBlur={(event: any) => {
                                                        field.onBlur();
                                                    }}
                                                />
                                                {errors.cd_CpfCnpj ? <FormHelperText>{errors.cd_CpfCnpj.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={4} xsOffset={0} xs={12} >
                                    <Controller
                                        control={control}
                                        name="cd_IE"
                                        rules={{ maxLength: 14 }}
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.cd_IE)} fullWidth>
                                                <InputLabel>RG/IE</InputLabel>
                                                <OutlinedInput {...field} />
                                                {errors.cd_IE ? <FormHelperText>{errors.cd_IE.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_RazaoSocial"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_RazaoSocial)} fullWidth>
                                                <InputLabel required>Razão Social</InputLabel>
                                                <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                                                {errors.ds_RazaoSocial ? <FormHelperText>{errors.ds_RazaoSocial.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_NomeFantasia"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_NomeFantasia)} fullWidth>
                                                <InputLabel>Nome Fantasia</InputLabel>
                                                <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                                                {errors.ds_NomeFantasia ? <FormHelperText>{errors.ds_NomeFantasia.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Email"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Email)} fullWidth>
                                                <InputLabel>E-mail</InputLabel>
                                                <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                                                {errors.ds_NomeFantasia ? <FormHelperText>{errors.ds_Email.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6}></Grid>
                                <Grid md={3} xs={12}>
                                    <Controller
                                        control={control}
                                        name="cd_CEP"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.cd_CEP)} fullWidth>
                                                <InputLabel>CEP</InputLabel>
                                                <MaskedInput
                                                    value={field.value}
                                                    mask={maskCep}
                                                    keepCharPositions={true}
                                                    guide={false}
                                                    render={(ref, props) => (<OutlinedInput
                                                        inputRef={ref}
                                                        ref={field.ref}
                                                        sx={{ paddingRight: 0 }}
                                                        endAdornment={<IconButton tabIndex={-1} onClick={handleCep}><SearchIcon /></IconButton>}
                                                        {...props}
                                                    />
                                                    )}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                    onBlur={(event: any) => {
                                                        field.onBlur();
                                                    }}
                                                    onKeyDown={(ev) => {
                                                        if (ev.key === 'Enter') {
                                                            ev.preventDefault();
                                                            handleCep(ev);
                                                        }
                                                    }}
                                                />
                                                {errors.cd_CEP ? <FormHelperText>{errors.cd_CEP.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={7} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Endereco"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Endereco)} fullWidth>
                                                <InputLabel>Endereço</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                                    {...field} />
                                                {errors.ds_Endereco ? <FormHelperText>{errors.ds_Endereco.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={2} xs={12}>
                                    <Controller
                                        control={control}
                                        name="nr_Endereco"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.nr_Endereco)} fullWidth>
                                                <InputLabel>N°</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                                    {...field}
                                                />
                                                {errors.nr_Endereco ? <FormHelperText>{errors.nr_Endereco.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Bairro"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Bairro)} fullWidth>
                                                <InputLabel>Bairro</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                                    {...field} />
                                                {errors.ds_Bairro ? <FormHelperText>{errors.ds_Bairro.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Complemento"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Complemento)} fullWidth>
                                                <InputLabel>Complemento</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                                    {...field} />
                                                {errors.ds_Complemento ? <FormHelperText>{errors.ds_Complemento.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Cidade"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Cidade)} fullWidth>
                                                <InputLabel>Cidade</InputLabel>
                                                <AutoCompleteCidades
                                                    options={[]}
                                                    value={field.value}
                                                    onChange={(event, value: any) => {
                                                        setValue("ds_Cidade", value)
                                                        setValue("cd_UF", value.uf)
                                                    }}
                                                />
                                                {/* {errors.ds_Cidade ? <FormHelperText>{errors.ds_Cidade.message}</FormHelperText> : null} */}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={2} xs={12}>
                                    <Controller
                                        control={control}
                                        name="cd_UF"
                                        rules={{ maxLength: 2 }}
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.cd_UF)} fullWidth>
                                                <InputLabel>UF</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ maxLength: 2, style: { textTransform: 'uppercase' } }}
                                                    {...field} />
                                                {errors.cd_UF ? <FormHelperText>{errors.cd_UF.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid md={4} xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid xs>
                                            <Controller
                                                control={control}
                                                name="nr_Celular"
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.nr_Celular)} fullWidth>
                                                        <InputLabel>Celular</InputLabel>
                                                        <MaskedInput
                                                            value={field.value}
                                                            mask={maskTelefone}
                                                            keepCharPositions={true}
                                                            guide={false}
                                                            render={(ref, props) => (<OutlinedInput
                                                                inputRef={ref}
                                                                ref={field.ref}
                                                                {...props}
                                                            />)
                                                            }
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                            }}
                                                        />
                                                        {errors.nr_Celular ? <FormHelperText>{errors.nr_Celular.message}</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid md={4} xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid xs>
                                            <Controller
                                                control={control}
                                                name="nr_Telefone"
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.nr_Telefone)} fullWidth>
                                                        <InputLabel>Telefone</InputLabel>
                                                        <MaskedInput
                                                            value={field.value}
                                                            mask={maskTelefone}
                                                            keepCharPositions={true}
                                                            guide={false}
                                                            render={(ref, props) => (<OutlinedInput
                                                                inputRef={ref}
                                                                ref={field.ref}
                                                                {...props}
                                                            />)
                                                            }
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                            }}
                                                        />
                                                        {errors.nr_Telefone ? <FormHelperText>{errors.nr_Telefone.message}</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid md={4} xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid xs>
                                            <Controller
                                                control={control}
                                                name="nr_Contato"
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.nr_Contato)} fullWidth>
                                                        <InputLabel>Contato</InputLabel>
                                                        <MaskedInput
                                                            value={field.value}
                                                            mask={maskTelefone}
                                                            keepCharPositions={true}
                                                            guide={false}
                                                            render={(ref, props) => (<OutlinedInput
                                                                inputRef={ref}
                                                                ref={field.ref}
                                                                {...props}
                                                            />)
                                                            }
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                            }}
                                                        />
                                                        {errors.nr_Contato ? <FormHelperText>{errors.nr_Contato.message}</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button color="secondary" component={RouterLink}
                        onClick={() => {
                            navigate(paths.dashboard.cadastros.clientes.listar)
                        }}
                    >
                        Cancelar
                    </Button>
                    <LoadingButton type="submit"
                        loadingIndicator="Salvando..."
                        loading={isSubmitting} variant="outlined">
                        Cadastrar Cliente
                    </LoadingButton>
                </CardActions>
            </Card>
        </form>
    )

}
