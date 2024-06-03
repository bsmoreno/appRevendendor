'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { PatternFormat } from 'react-number-format';
import { schemaUsuario, schemaUsuarioRules } from './schemas/schema-usuario';
import { UsuarioCriarFrom } from './hooks/usuarios-criar-form-hooks';
import { BlockUI } from '@/components/widgets/blockUi';
import {
  useRecoilValue
} from 'recoil';
import { rotasState } from '../states/rotas-state';

export function UsuariosCriarForm(): React.JSX.Element {
  //const navigate = useNavigate(); 
  var {
    Controller,
    register,
    handleSubmit,
    handleEmailBlur,
    setValue,
    onSubmit,
    errors,
    control,
    isSubmitting,
    resetNovoUsuario,
    resetRotas,
    novoUsuario,
    setNovoUsuario,
    rotas,
    setRotas,
    navigate,
    isChecking,
    setIsChecking
  } = UsuarioCriarFrom();
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Informações Basicas</Typography>
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
                        <OutlinedInput inputProps={{ style: { textTransform: 'uppercase' } }} {...field} />
                        {errors.ds_Sobrenome ? <FormHelperText>{errors.ds_Sobrenome.message}</FormHelperText> : null}
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
                          onBlur={(event: any) => {
                            field.onBlur(); // chama primeiro o onBlur do react-hook-form
                            //@ts-ignore
                            handleEmailBlur(event); // depois o seu customizado
                          }}
                        />
                        {errors.ds_Email ? <FormHelperText>{errors.ds_Email.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />

                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="nr_Celular"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.nr_Celular)} fullWidth>
                        <InputLabel required>Celular</InputLabel>
                        <PatternFormat
                          name="nr_Celular"
                          format="+55 (##) #.####-####"
                          aria-label='Telefone'
                          type='tel'
                          onChange={(event) => {
                            setValue('nr_Celular', event.target.value)
                          }}
                          customInput={OutlinedInput} />
                        {errors.nr_Celular ? <FormHelperText>{errors.nr_Celular.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="tp_Admin"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.tp_Admin)} fullWidth>
                        <InputLabel>Admin</InputLabel>
                        <Select {...field}>
                          <Option value={''}>---</Option>
                          <Option value={'true'}>Sim</Option>
                          <Option value={'false'}>Não</Option>
                        </Select>
                        {errors.tp_Admin ? <FormHelperText error>{errors.tp_Admin.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="tp_Status"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.tp_Status)} fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select {...field}>
                          <Option value={''}>---</Option>
                          <Option value={'true'}>Sim</Option>
                          <Option value={'false'}>Não</Option>
                        </Select>
                        {errors.tp_Status ? <FormHelperText error>{errors.tp_Status.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={12} xs={12}>

                  <FormControl error={Boolean(errors.js_Roles)} fullWidth>
                    <Typography variant='h3' sx={{ marginBottom: '1%' }} >Permissões</Typography>
                    <Divider sx={{ marginBottom: '2%' }} />
                    {rotas.map((row, index) => {
                      return (
                        <Grid key={index} container spacing={2} mb={2}>
                          <Grid md={6} xs={6}>
                            <Typography>
                              {row.id.substring(1).replaceAll('/', ' > ').toLocaleUpperCase()}
                            </Typography>
                          </Grid>
                          <Grid md={6} xs={6}>
                            <Controller
                              control={control}
                              name={`js_Roles.[${index}].type`}
                              render={({ field }) => {
                                if (field.value === undefined)
                                  field.value = `${row.id}_-1`
                                return (
                                  <RadioGroup row {...field} >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value={`${row.id}_-1`}
                                      label="SEM ACESSO"
                                    />
                                    {row.permissoes.map((permissao, pIndex) => {
                                      return (
                                        <FormControlLabel
                                          key={pIndex}
                                          control={<Radio />}
                                          value={`${row.id}_${permissao[1]}`}
                                          label={permissao[2].toString()?.toLocaleUpperCase()}
                                        />
                                      )
                                    })}
                                  </RadioGroup>
                                )
                              }} />
                          </Grid>
                        </Grid>)

                    })}
                  </FormControl>


                </Grid>
                {/* <Grid md={12} xs={12}> 
                  <Controller
                    control={control}
                    name="js_Roles"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.js_Roles)} fullWidth>
                        <Typography variant='h3' sx={{ marginBottom: '1%' }} >Permissões</Typography>
                        <Divider sx={{ marginBottom: '2%' }} />
                        {rotas.map((row, index) => (
                          <Grid key={index} container spacing={2} mb={2}>
                            <Grid md={6} xs={6}>
                              <Typography>
                                {row.id.substring(1).replaceAll('/', ' > ').toLocaleUpperCase()}
                              </Typography>
                            </Grid>
                            <Grid md={6} xs={6}>
                              <RadioGroup
                                key={`${row.id}_${index}`}
                                row
                                defaultChecked
                                defaultValue={`${row.id}_-1`}
                              >
                                <FormControlLabel
                                  key={`${row.id}_${index}_-1`}
                                  {...register(`js_Roles.-1`)}
                                  value={`${row.id}_-1`}
                                  control={<Radio />}
                                  label="SEM ACESSO"
                                />
                                {row.permissoes.map((permissao, pIndex) => (
                                  <FormControlLabel
                                    key={`${row.id}_${index}_${pIndex}`}
                                    value={`${row.id}_${permissao[1]}`}
                                    {...register(`js_Roles.${pIndex}`)}
                                    control={<Radio />}
                                    label={permissao[2].toString()?.toLocaleUpperCase()}
                                  />
                                ))}
                              </RadioGroup>
                            </Grid>
                          </Grid>
                        ))} 
                      </FormControl>
                    )}
                  />
                </Grid> */}
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink}
            onClick={() => {
              resetNovoUsuario();
              resetRotas();
              navigate(paths.dashboard.cadastros.usuarios.listar)
            }}
          >
            Cancelar
          </Button>
          <LoadingButton type="submit"
            loadingIndicator="Salvando..."
            loading={isSubmitting} variant="outlined">
            Cadastrar Usuário
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
}
