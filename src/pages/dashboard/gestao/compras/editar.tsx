import { RouterLink } from '@/components/core/link';
import { UsuariosEditarForm } from '@/components/dashboard/cadastros/usuarios/editar/usuarios-editar-form';
import { rotasState } from '@/components/dashboard/cadastros/usuarios/states/rotas-state';
import { usuarioEditarState } from '@/components/dashboard/cadastros/usuarios/states/usuario-editar-state';
import { usuarioState } from '@/components/dashboard/cadastros/usuarios/states/usuario-state';
import { config } from '@/config';
import { paths } from '@/paths';
import { Metadata } from '@/types/metadata';
import { Box, Link, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';

const metadata = { title: `Detalhes | Usuários | Dashboard | ${config.site.name}` } satisfies Metadata;

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
                    //navigate(paths.dashboard.cadastros.usuarios.listar);
                  }}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Gestão de Compras
                </Link>
              </Box>
              <Box>
                <Typography variant="h4">Editar Compra</Typography>
              </Box>
            </Stack>
            {/* <UsuariosEditarForm id_Usuario={id} />  */}
        </Stack>
      </Box>
    </React.Fragment >
  );
}
