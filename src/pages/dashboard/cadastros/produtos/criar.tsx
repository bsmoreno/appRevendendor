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
import { ProdutosCriarForm } from '@/components/dashboard/cadastros/produtos/criar/produtos-criar-form';

const metadata = { title: `Create |  | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
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
                href={paths.dashboard.cadastros.produtos.listar}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Produtos
              </Link>
            </div>
            <div>
              <Typography variant="h4">Criar Novo Produto</Typography>
            </div>
          </Stack>
          <ProdutosCriarForm />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
