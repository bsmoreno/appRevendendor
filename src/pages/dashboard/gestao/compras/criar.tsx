import { Box, Button, FormControl, Grid, InputLabel, Link, OutlinedInput, Select, Stack, Switch, Typography } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { config } from '@/config';
import { Metadata } from '@/types/metadata';
import { RouterLink } from '@/components/core/link';
import { paths } from '@/paths'; 
import { useResetRecoilState } from 'recoil';
import { usuarioState } from '@/components/dashboard/cadastros/usuarios/states/usuario-state';
import { rotasState } from '@/components/dashboard/cadastros/usuarios/states/rotas-state';
import { useNavigate } from 'react-router-dom';

const metadata = { title: `Criar | Compras | Gestão | Dashboard | ${config.site.name}` } satisfies Metadata;
export function Page(): React.JSX.Element {
  const navigate = useNavigate();
  const resetNovoUsuario = useResetRecoilState(usuarioState);
  const resetRotas = useResetRecoilState(rotasState);
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
                  navigate(paths.dashboard.cadastros.usuarios.listar);
                }}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Gestão de Compras
              </Link>
            </Box>
            <Box>
              <Typography variant="h4">Criar Nova Compra</Typography>
            </Box>
          </Stack>
          {/* <UsuariosCriarForm /> */}
        </Stack>
      </Box>
    </React.Fragment>
  );

}
