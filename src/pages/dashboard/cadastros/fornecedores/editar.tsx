import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { useNavigate, useParams } from 'react-router-dom';
import { ProdutosEditarForm } from '@/components/dashboard/cadastros/produtos/editar/produtos-editar-form';
import { FornecedoresEditarFrom } from '@/components/dashboard/cadastros/fornecedores/editar/fornecedores-editar-form';

const metadata = { title: `Details | Products | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  var { id } = useParams();
  const navigate = useNavigate();
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
          <Stack spacing={3}>
            <div>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.cadastros.fornecedores.listar}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Fornecedores
              </Link>
            </div>
            <div>
              <Typography variant="h4">Editar Fornecedor</Typography>
            </div>
          </Stack>
          <FornecedoresEditarFrom id_Fornecedor={id as string} />
          {/* <ProdutosEditarForm id_Produto={id as string} /> */}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
