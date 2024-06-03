import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { ProdutoDetalhesModal, useModalDetalhes } from '@/components/dashboard/cadastros/produtos/produtos-detalhes-modal';
import { ProdutosTable } from '@/components/dashboard/cadastros/produtos/listar/produtos-table';
const metadata = { title: `Gestão de Produtos | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  const [idProdutoDetalhe] = useModalDetalhes();
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Gestão de Produtos</Typography>
            </Box>
            <div>
              <Button
                component={RouterLink}
                href={paths.dashboard.cadastros.produtos.criar}
                startIcon={<PlusIcon />}
                variant="outlined"
              >
                Novo
              </Button>
            </div>
          </Stack>
          <Card>
            <ProdutosTable />
          </Card>
        </Stack>
      </Box>
      <ProdutoDetalhesModal />
    </React.Fragment>
  );
}


