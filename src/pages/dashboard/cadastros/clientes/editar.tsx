'use client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { config } from '@/config';
import { Metadata } from '@/types/metadata';
import { Box, Link, Stack, Typography } from '@mui/material';
import { paths } from '@/paths';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientesEditarForm } from '@/components/dashboard/cadastros/clientes/editar/clientes-editar-form';

const metadata = { title: `Clientes | Dashboard | ${config.site.name}` } satisfies Metadata;

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
            <Box>
              <Link
                color="text.primary"
                onClick={() => {
                  navigate(paths.dashboard.cadastros.clientes.listar);
                }}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Clientes
              </Link>
            </Box>
            <Box>
              <Typography variant="h4">Editar Usuário</Typography>
            </Box>
            <ClientesEditarForm id_Cliente={id as string} />
          </Stack>
        </Stack>
      </Box>
    </React.Fragment >
  );
}    