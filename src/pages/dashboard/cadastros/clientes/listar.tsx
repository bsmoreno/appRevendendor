  'use client';  
  import React from 'react';   
  import { Helmet } from 'react-helmet-async';  
  import { config } from '@/config';  
  import { Metadata } from '@/types/metadata';  
  import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';  
  import { paths } from '@/paths';  
  import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';  
  import { RouterLink } from '@/components/core/link';   
import { ClientesTable } from '@/components/dashboard/cadastros/clientes/listar/clientes-table';
  const metadata = { title: `Clientes | Cadastro | Dashboard | ${config.site.name}` } satisfies Metadata;  
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
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ alignItems: 'flex-start' }}>  
                          <Box sx={{ flex: '1 1 auto' }}>  
                              <Typography variant="h4">Gestão de Clientes</Typography>  
                          </Box>  
                          <Box>  
                              <Button  
                                  component={RouterLink}  
                                  href={paths.dashboard.cadastros.clientes.criar}  
                                  startIcon={<PlusIcon />}  
                                  variant="outlined"  
                              >  
                                  Novo  
                              </Button>  
                          </Box>  
                      </Stack>  
                      <Card>  
                          <Divider />  
                          <Box sx={{ overflowX: 'auto' }}>  
                              <ClientesTable />
                          </Box>  
                          <Divider />  
                      </Card>  
                  </Stack>  
              </Box>  
          </React.Fragment>  
      );  
  }  
    