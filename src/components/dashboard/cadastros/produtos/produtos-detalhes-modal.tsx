'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon, XCircle as XCircleIcon, PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { createGlobalState, useToggle } from 'react-use';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/core/toaster';
import { authProvider } from '@/lib/provider';
import { BlockUI, useBlockUI } from '@/components/widgets/blockUi';
import { Produtos } from '@/types/produtos';

interface Image {
  id: string;
  url: string;
  fileName: string;
  primary?: boolean;
}

const imageColumns = [
  {
    formatter: (row): React.JSX.Element => {
      return (
        <Box
          sx={{
            backgroundImage: `url(${row.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            bgcolor: 'var(--mui-palette-background-level2)',
            borderRadius: 1,
            flex: '0 0 auto',
            height: '40px',
            width: '40px',
          }}
        />
      );
    },
    name: 'Image',
    width: '100px',
  },
  { field: 'fileName', name: 'File name', width: '300px' },
  {
    formatter: (row): React.JSX.Element => {
      return row.primary ? <Chip color="secondary" label="Primary" size="small" variant="soft" /> : <span />;
    },
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Image>[];

const images = [
  { id: 'IMG-001', url: '/assets/product-1.png', fileName: 'product-1.png', primary: true },
] satisfies Image[];

export const useModalDetalhes = createGlobalState<string | null>(null);
export function ProdutoDetalhesModal(): React.JSX.Element | null {
  const [idProdutoDetalhe, setIdProdutoDetalhe] = useModalDetalhes();
  const [BlockUI, setBlockUI] = useBlockUI();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useToggle(false);
  const feachBuscaProduto = async ({ queryKey: [key, idProduto] }: any): Promise<Produtos | null> => {
    try {
      const result = await authProvider.get(`Produtos/v1/Buscar`, { params: { id_Produto: idProduto } });
      if (result.status === 200) {
        setOpen(true);
        return result.data as Produtos;
      } else {
        toast.error("Produto não encontrado");
        handleClose();
        return null;
      }
    } catch (err) {
      toast.error("Erro ao buscar Produto");
      handleClose();
      return null;
    }
  }
  const { data: produto, isLoading } = useQuery({
    queryKey: ['ProdutosDetalhes', idProdutoDetalhe],
    queryFn: feachBuscaProduto,
    enabled: !!idProdutoDetalhe
  })
  React.useEffect(() => {
    setBlockUI(isLoading);
  }, [isLoading])
  const handleClose = React.useCallback(() => {
    setOpen(false);
    setIdProdutoDetalhe(null);
    queryClient.removeQueries({ queryKey: ['ProdutosDetalhes', idProdutoDetalhe], exact: true });
  }, [navigate]);
  return (
    <>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={open}
        sx={{
          '& .MuiDialog-container': { justifyContent: 'flex-end' },
          '& .MuiDialog-paper': { height: '100%', width: '100%' },
        }}
      >
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
            <Typography variant="h6">{produto?.nr_Produto} - {produto?.ds_Produto}</Typography>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Stack spacing={3} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Detalhes</Typography>
                <Button
                  color="secondary"
                  component={RouterLink}
                  href={paths.dashboard.cadastros.produtos.editar(idProdutoDetalhe as string)}
                  startIcon={<PencilSimpleIcon />}
                >
                  Editar
                </Button>
              </Stack>
              <Card sx={{ borderRadius: 1 }} variant="outlined">
                <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                  {(
                    [
                      { key: 'N°', value: produto?.nr_Produto },
                      { key: 'Cod. Produto', value: produto?.cd_Produto },
                      { key: 'Nome', value: produto?.ds_Produto },
                      { key: 'EAN', value: produto?.cd_EAN },
                      { key: 'Valor de Venda', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto?.vl_Venda) },
                      { key: 'Marca', value: produto?.ds_Marca },
                      { key: 'SubMarca', value: produto?.ds_SubMarca },
                      { key: 'Linha', value: produto?.ds_Linha },
                      { key: 'Classificação', value: produto?.ds_Classificacao },
                      { key: 'Caracteristica', value: produto?.ds_Caracteristica },
                      {
                        key: 'Kit',
                        value: (
                          <Chip
                            icon={produto?.tp_Kit ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> : <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" />}
                            label={produto?.tp_Kit ? "Sim" : "Não"}
                            size="small"
                            variant="outlined"
                          />
                        ),
                      },
                      { key: 'Tipo', value: produto?.ds_Tipo },
                      {
                        key: 'Status',
                        value: (
                          <Chip
                            icon={produto?.tp_Status ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> : <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" />}
                            label={produto?.tp_Status ? "Ativo" : "Inativo"}
                            size="small"
                            variant="outlined"
                          />
                        ),
                      },
                      {
                        key: 'Data Inclusão',
                        value: dayjs(produto?.dt_Inclusao).subtract(3, 'hour').subtract(5, 'day').format('DD/MM/YYYY HH:mm'),
                      },
                      {
                        key: 'Data Atualização',
                        value: produto?.dt_Atualizacao ? dayjs(produto?.dt_Atualizacao).subtract(3, 'hour').subtract(5, 'day').format('DD/MM/YYYY HH:mm') : null,
                      },
                    ] satisfies { key: string; value: React.ReactNode }[]
                  ).map(
                    (item): React.JSX.Element => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    )
                  )}
                </PropertyList>
              </Card>
              <Stack spacing={3}>
                <Typography variant="h6">Estoque</Typography>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                  <Box sx={{ overflowX: 'auto' }}>
                    <DataTable<Image> columns={imageColumns} rows={images} />
                  </Box>
                </Card>
              </Stack>
              <Stack spacing={3}>
                <Typography variant="h6">Vendas</Typography>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                  <Box sx={{ overflowX: 'auto' }}>
                    <DataTable<Image> columns={imageColumns} rows={images} />
                  </Box>
                </Card>
              </Stack>
              <Stack spacing={3}>
                <Typography variant="h6">Compras</Typography>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                  <Box sx={{ overflowX: 'auto' }}>
                    <DataTable<Image> columns={imageColumns} rows={images} />
                  </Box>
                </Card>
              </Stack>
              {/* <Stack spacing={3}>
                <Typography variant="h6">Stock & invetory</Typography>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                  <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                    {(
                      [
                        { key: 'SKU', value: '401_1BBXBK' },
                        { key: 'Barcode', value: '' },
                        { key: 'Quantity', value: 10 },
                        { key: 'Height', value: '25 cm' },
                        { key: 'Width', value: '15 cm' },
                        { key: 'Length', value: '5 cm' },
                        { key: 'Weight', value: '0.25 kg' },
                      ] satisfies { key: string; value: React.ReactNode }[]
                    ).map(
                      (item): React.JSX.Element => (
                        <PropertyItem key={item.key} name={item.key} value={item.value} />
                      )
                    )}
                  </PropertyList>
                </Card>
              </Stack> */}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>

  );
}
