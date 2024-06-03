'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import type { EditorEvents } from '@tiptap/react';
import { v4 as uuidV4 } from 'uuid';
import { z as zod } from 'zod';
import { PlusSquare as PlusSquereIcon } from '@phosphor-icons/react';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { toast } from '@/components/core/toaster';
import { TiposModal } from '../../../ferramentas/tipos/tipos-modal';
import { Tipo } from '@/types/ferramentas/tipo';
import { ButtonGroup, FormGroup, IconButton, Tooltip } from '@mui/material';
import SelectTipos from '@/components/widgets/select/select-tipos';
import { width } from '@mui/system';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { BlockUI } from '@/components/widgets/blockUi';
import LoadingButton from '@mui/lab/LoadingButton';
import { ProdutosEditarHooks } from './hooks/produtos-editar-hooks';
export interface ProdutosEditarProps {
  id_Produto: string
}
export function ProdutosEditarForm({ id_Produto }: ProdutosEditarProps): React.JSX.Element {

  const {
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    control,
    errors,
    isLoading,
    isSubmitting,
    navigate,
  } = ProdutosEditarHooks(id_Produto);

  const [selectedTipo, setSelectedTipo] = React.useState<string | null>(null);
  const [updateFlags, setTipoUpdateFlags] = React.useState({
    produto_marca: 0,
    produto_submarca: 0,
    produto_linha: 0,
    produto_classificacao: 0,
    produto_caracteristica: 0,
    produto_tipo: 0,
  });

  const handleEditarCategoria = (tipo: string): void => {
    setSelectedTipo(tipo);
    console.log('handleEditarCategoria', selectedTipo)
  };

  const handleCloseModal = (): void => {
    if (selectedTipo) {
      setTipoUpdateFlags((prev) => ({
        ...prev,
        [selectedTipo]: prev[selectedTipo] + 1
      }));
      setSelectedTipo(null);
    }
  };

  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack divider={<Divider />} spacing={4}>
              <Stack spacing={3}>
                <Typography variant="h6">Informações do Produto</Typography>
                <Grid container spacing={3}>
                  <Grid md={6} xs={12}>
                    <Controller
                      control={control}
                      name="ds_Produto"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.ds_Produto)} fullWidth>
                          <InputLabel required>Nome:</InputLabel>
                          <OutlinedInput
                            {...field}
                            inputProps={{ style: { textTransform: 'uppercase' } }} />
                          {errors.ds_Produto ? <FormHelperText>{errors.ds_Produto.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Controller
                      control={control}
                      name="cd_Produto"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.cd_Produto)} fullWidth>
                          <InputLabel required>Cod. Produto:</InputLabel>
                          <OutlinedInput {...field} />
                          {errors.cd_Produto ? <FormHelperText>{errors.cd_Produto.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Controller
                      control={control}
                      name="cd_EAN"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.cd_EAN)} fullWidth>
                          <InputLabel>EAN</InputLabel>
                          <OutlinedInput {...field} />
                          {errors.cd_EAN ? <FormHelperText>{errors.cd_EAN.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Controller
                      control={control}
                      name="vl_Venda"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.vl_Venda)} fullWidth>
                          <InputLabel>Valor de Venda</InputLabel>
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
                          {errors.vl_Venda ? <FormHelperText>{errors.vl_Venda.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid md={3} xs={12}>
                    <Controller
                      control={control}
                      name="id_Marca"
                      render={({ field }) => {
                        return (
                          <FormControl error={Boolean(errors.id_Marca)} fullWidth>
                            <InputLabel>Marca</InputLabel>
                            <ButtonGroup fullWidth variant='outlined' size='small' sx={{ mt: 1 }}>
                              <SelectTipos variant='outlined' dsTipo='produto_marca' placeholder="Selecione a Marca" updateFlag={updateFlags.produto_marca} {...field} />
                              <Tooltip title="Nova Marca">
                                <IconButton onClick={() => handleEditarCategoria('produto_marca')} >
                                  <PlusSquereIcon />
                                </IconButton>
                              </Tooltip>
                            </ButtonGroup>
                            {errors.id_Marca ? <FormHelperText error>{errors.id_Marca.message}</FormHelperText> : null}
                          </FormControl>
                        );
                      }}
                    />
                  </Grid>
                  <Grid md={3} xs={12}>
                    <Controller
                      control={control}
                      name="id_SubMarca"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.id_SubMarca)} fullWidth>
                          <InputLabel>SubMarca</InputLabel>
                          <ButtonGroup fullWidth variant='outlined' size='small' sx={{ mt: 1 }}>
                            <SelectTipos variant='outlined' dsTipo='produto_submarca' placeholder="Selecione a SubMarca" updateFlag={updateFlags.produto_submarca} {...field} />
                            <Tooltip title="Nova SubMarca">
                              <IconButton onClick={() => handleEditarCategoria('produto_submarca')} >
                                <PlusSquereIcon />
                              </IconButton>
                            </Tooltip>
                          </ButtonGroup>
                          {/* {errors.id_SubMarca ? <FormHelperText error>{errors.id_SubMarca.message}</FormHelperText> : null} */}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid md={3} xs={12}>
                    <Controller
                      control={control}
                      name="id_Linha"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.id_Linha)} fullWidth>
                          <InputLabel>Linha</InputLabel>
                          <ButtonGroup fullWidth variant='outlined' size='small' sx={{ mt: 1 }}>
                            <SelectTipos variant='outlined' dsTipo='produto_linha' placeholder="Selecione a Linha" updateFlag={updateFlags.produto_linha} {...field} />
                            <Tooltip title="Nova Linha">
                              <IconButton onClick={() => handleEditarCategoria('produto_linha')} >
                                <PlusSquereIcon />
                              </IconButton>
                            </Tooltip>
                          </ButtonGroup>
                          {/* {errors.id_Linha ? <FormHelperText error>{errors.id_Linha.message}</FormHelperText> : null} */}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid md={3} xs={12}>
                    <Controller
                      control={control}
                      name="id_Classificacao"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.id_Linha)} fullWidth>
                          <InputLabel>Classificação</InputLabel>
                          <ButtonGroup fullWidth variant='outlined' size='small' sx={{ mt: 1 }}>
                            <SelectTipos variant='outlined' dsTipo='produto_classificacao' placeholder="Selecione a Classificação" updateFlag={updateFlags.produto_classificacao} {...field} />
                            <Tooltip title="Nova Classificação">
                              <IconButton onClick={() => handleEditarCategoria('produto_classificacao')} >
                                <PlusSquereIcon />
                              </IconButton>
                            </Tooltip>
                          </ButtonGroup>
                          {/* {errors.id_Classificacao ? <FormHelperText error>{errors.id_Classificacao.message}</FormHelperText> : null} */}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid md={3} xs={12}>
                    <Controller
                      control={control}
                      name="id_Caracteristica"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.id_Linha)} fullWidth>
                          <InputLabel>Caracteristica</InputLabel>
                          <ButtonGroup fullWidth variant='outlined' size='small' sx={{ mt: 1 }}>
                            <SelectTipos variant='outlined' dsTipo='produto_caracteristica' placeholder="Selecione a Caracteristica" updateFlag={updateFlags.produto_caracteristica} {...field} />
                            <Tooltip title="Nova Caracteristica">
                              <IconButton onClick={() => handleEditarCategoria('produto_caracteristica')} >
                                <PlusSquereIcon />
                              </IconButton>
                            </Tooltip>
                          </ButtonGroup>
                          {/* {errors.id_Caracteristica ? <FormHelperText error>{errors.id_Caracteristica?.message}</FormHelperText> : null} */}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid md={3} xs={12}>
                    <Controller
                      control={control}
                      name="id_Tipo"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.id_Linha)} fullWidth>
                          <InputLabel>Tipo</InputLabel>
                          <ButtonGroup fullWidth variant='outlined' size='small' sx={{ mt: 1 }}>
                            <SelectTipos variant='outlined' dsTipo='produto_tipo' placeholder="Selecione o Tipo" updateFlag={updateFlags.produto_tipo} {...field} />
                            <Tooltip title="Novo Tipo">
                              <IconButton onClick={() => handleEditarCategoria('produto_tipo')} >
                                <PlusSquereIcon />
                              </IconButton>
                            </Tooltip>
                          </ButtonGroup>
                          {/* {errors.id_Tipo ? <FormHelperText error>{errors.id_Tipo?.message}</FormHelperText> : null} */}
                        </FormControl>
                      )}
                    />

                  </Grid>

                  <Grid md={3} xs={12}>
                    {/* <Controller
                      control={control}
                      name="tp_Kit"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.tp_Kit)} fullWidth>
                          <InputLabel>Kit</InputLabel> 
                          <Select variant='outlined'{...field}>
                            <Option value={''} disabled>Selecione se é um Kit</Option>
                            <Option value={true}>Sim</Option>
                            <Option value={false}>Não</Option>
                          </Select>
                          {errors.tp_Kit ? <FormHelperText error>{errors.tp_Kit.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    /> */}
                  </Grid>
                  <Grid md={3} xs={12}>
                    {/* <Controller
                      control={control}
                      name="tp_Status"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.tp_Status)} fullWidth>
                          <InputLabel>Status</InputLabel> 
                          <Select variant='outlined'{...field}>
                            <Option value={''} disabled>Selecione se é um Kit</Option>
                            <Option value={true}>Ativo</Option>
                            <Option value={false}>Inativo</Option>
                          </Select>
                          {errors.tp_Status ? <FormHelperText error>{errors.tp_Status.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    /> */}
                  </Grid>
                  <Grid xs={12}>
                    {/* <Controller
                      control={control}
                      name="ds_Descricao"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.ds_Descricao)} fullWidth>
                          <InputLabel>Descrição</InputLabel>
                          <Box sx={{ mt: '8px', '& .tiptap-container': { height: '400px' } }}>
                            <TextEditor
                              content={field.value ?? ''}
                              onUpdate={({ editor }: EditorEvents['update']) => {
                                field.onChange(editor.getText());
                              }}
                              placeholder="Detalhes do Produto"
                            />
                          </Box>
                          {errors.ds_Descricao ? (
                            <FormHelperText error>{errors.ds_Descricao.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    /> */}
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button color="secondary" component={RouterLink} href={paths.dashboard.cadastros.produtos.listar}>
              Cancel
            </Button>
            <LoadingButton type="submit"
              loadingIndicator="Salvando..."
              loading={isSubmitting} variant="outlined">
              Cadastrar Produto
            </LoadingButton>
          </CardActions>
        </Card>
      </form >

      {selectedTipo && <TiposModal ds_Tipo={selectedTipo} handleCloseModal={handleCloseModal} />}
    </>
  );
}
