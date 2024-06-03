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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { NumericFormat } from 'react-number-format'; 
import { ClientesCriarFromHooks } from './hooks/clientes-criar-form-hooks';
import MaskedInput from 'react-text-mask'
import { WhatsappLogo } from '@phosphor-icons/react';

export function ClientesCriarForm(): React.JSX.Element {
    var {
        Controller,
        handleSubmit, 
        setValue,
        onSubmit,
        watch, 
        errors,
        control,
        isSubmitting,
        navigate,
        maskTelefone,
        maskCpfCnpj
    } = ClientesCriarFromHooks();

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
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Nome"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Nome)} fullWidth>
                                                <InputLabel required>Nome</InputLabel>
                                                <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                                                {errors.ds_Nome ? <FormHelperText>{errors.ds_Nome.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Sobrenome"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Sobrenome)} fullWidth>
                                                <InputLabel required>Sobrenome</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                                    {...field}  />
                                                {errors.ds_Sobrenome ? <FormHelperText>{errors.ds_Sobrenome.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="ds_Apelido"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.ds_Apelido)} fullWidth>
                                                <InputLabel>Apelido</InputLabel>
                                                <OutlinedInput
                                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                                    {...field} />
                                                {errors.ds_Apelido ? <FormHelperText>{errors.ds_Apelido.message}</FormHelperText> : null}
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
                                                <InputLabel required>E-mail</InputLabel>
                                                <OutlinedInput
                                                    {...field}
                                                    inputProps={{ style: { textTransform: 'lowercase' } }}
                                                    onChange={(e) => {
                                                        field.onChange(e); 
                                                    }}
                                                />
                                                {errors.ds_Email ? <FormHelperText>{errors.ds_Email.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />

                                </Grid>
                                <Grid md={6} xs={12}>
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
                                                                if (e?.target?.value.length === 0)
                                                                    setValue('tp_CelularWhatsApp', false); 
                                                            }}
                                                        />
                                                        {errors.nr_Celular ? <FormHelperText>{errors.nr_Celular.message}</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid xs={6} sx={{ display: "flex", alignContent: "end", alignItems: 'end' }}>
                                            <Controller
                                                control={control}
                                                name="tp_CelularWhatsApp"
                                                render={({ field }) => {
                                                    return (
                                                        <FormControl error={Boolean(errors.tp_CelularWhatsApp)} fullWidth>
                                                            <ToggleButton
                                                                {...field}
                                                                color="success"
                                                                disabled={watch("nr_Celular")?.length == 0}
                                                                selected={(watch("nr_Celular")?.length == 0 ? false : field.value)}
                                                                onChange={(value: any) => {
                                                                    field.onChange(value);
                                                                    setValue(field.name, !field.value);
                                                                }}
                                                            >
                                                                <WhatsappLogo color="green" size={27} />
                                                            </ToggleButton>
                                                            {errors.nr_Celular ? <FormHelperText>&nbsp;</FormHelperText> : null}                                                        </FormControl>
                                                    );
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid md={6} xs={12}>
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
                                                                if (e?.target?.value.length === 0)
                                                                    setValue('tp_TelefoneWhatsApp', false); 
                                                            }}
                                                        />
                                                        {errors.nr_Telefone ? <FormHelperText>{errors.nr_Telefone.message}</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid xs={6} sx={{ display: "flex", alignContent: "end", alignItems: 'end' }}>
                                            <Controller
                                                control={control}
                                                name="tp_TelefoneWhatsApp"
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.tp_TelefoneWhatsApp)} fullWidth>
                                                        <ToggleButton
                                                            {...field}
                                                            color="success"
                                                            disabled={watch("nr_Telefone")?.length == 0}
                                                            selected={(watch("nr_Telefone")?.length == 0 ? false : field.value)}
                                                            onChange={(value: any) => {
                                                                field.onChange(value); 
                                                                setValue(field.name, !field.value)
                                                            }}
                                                        >
                                                            <WhatsappLogo color="green" size={27} />
                                                        </ToggleButton>
                                                        {errors.nr_Telefone ? <FormHelperText>&nbsp;</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid md={6} xs={12}>
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
                                                                if (e?.target?.value.length === 0)
                                                                    setValue('tp_ContatoWhatsApp', false); 
                                                            }}
                                                        />
                                                        {errors.nr_Contato ? <FormHelperText>{errors.nr_Contato.message}</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid xs={6} sx={{ display: "flex", alignContent: "end", alignItems: 'end' }}>
                                            <Controller
                                                control={control}
                                                name="tp_ContatoWhatsApp"
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.tp_ContatoWhatsApp)} fullWidth>
                                                        <ToggleButton
                                                            {...field}
                                                            color="success"
                                                            disabled={watch("nr_Contato")?.length == 0}
                                                            selected={(watch("nr_Contato")?.length == 0 ? false : field.value)}
                                                            onChange={(value:any) => {
                                                                field.onChange(value);
                                                                setValue(field.name, !field.value)
                                                            }}
                                                        >
                                                            <WhatsappLogo color="green" size={27} />
                                                        </ToggleButton>
                                                        {errors.nr_Contato ? <FormHelperText>&nbsp;</FormHelperText> : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="vl_Credito"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.vl_Credito)} fullWidth>
                                                <InputLabel>Crédito</InputLabel>
                                                <NumericFormat
                                                    decimalScale={2}
                                                    prefix='R$ '
                                                    fixedDecimalScale={true}
                                                    allowNegative={false}
                                                    aria-label='vl_Credito'
                                                    thousandSeparator='.'
                                                    decimalSeparator=','
                                                    customInput={OutlinedInput}
                                                    value={field.value}
                                                    onValueChange={({ value: v }) => {
                                                        field.onChange(parseFloat(v)); 
                                                    }}
                                                />
                                                {errors.vl_Credito ? <FormHelperText>{errors.vl_Credito.message}</FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
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
