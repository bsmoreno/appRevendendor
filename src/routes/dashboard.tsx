import * as React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';
import { Layout as SettingsLayout } from '@/components/dashboard/settings/layout';
import { Page as NotFoundPage } from '@/pages/errors/not-found'
import { paths } from '@/paths'
import { useUser } from '@/hooks/use-user';
import ProtectedRoute from './protectedRoute';
export const route: RouteObject = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    //Home
    {
      index: true,
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/home');
        return { Component: Page };
      },
    },
    {
      path: 'cadastros',
      children: [
        //Usuários
        {
          path: 'usuarios',
          children: [
            {
              index: true,
              path: '',
              element: <Navigate to="listar" replace />
            },
            {
              index: true,
              path: 'listar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/usuarios/listar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/usuarios/listar`, level: 1 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'criar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/usuarios/criar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/usuarios/criar`, level: 2 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'editar/:id',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/usuarios/editar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/usuarios/editar`, level: 3 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
          ]
        },
        //Produtos
        {
          path: 'produtos',
          children: [
            {
              index: true,
              path: '',
              element: <Navigate to="listar" replace />
            },
            {
              index: true,
              path: 'listar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/produtos/listar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/produtos/listar`, level: 1 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              path: 'criar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/produtos/criar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/produtos/criar`, level: 2 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              path: 'editar/:id',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/produtos/editar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/produtos/editar`, level: 3 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
          ],
        },
        //Clientes
        {
          path: 'clientes',
          children: [
            {
              index: true,
              path: '',
              element: <Navigate to="listar" replace />
            },
            {
              index: true,
              path: 'listar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/clientes/listar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/clientes/listar`, level: 1 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'criar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/clientes/criar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/clientes/criar`, level: 2 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'editar/:id',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/clientes/editar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/clientes/editar`, level: 3 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
          ]
        },
        //Clientes
        {
          path: 'fornecedores',
          children: [
            {
              index: true,
              path: '',
              element: <Navigate to="listar" replace />
            },
            {
              index: true,
              path: 'listar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/fornecedores/listar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/fornecedores/listar`, level: 1 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'criar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/fornecedores/criar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/fornecedores/criar`, level: 2 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'editar/:id',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/fornecedores/editar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/fornecedores/editar`, level: 3 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
          ]
        },
      ]
    },
    {
      path: 'gestao',
      children: [
        {
          path: 'compras',
          children: [
            {
              index: true,
              path: '',
              element: <Navigate to="listar" replace />
            },
            {
              index: true,
              path: 'listar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/gestao/compras/listar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/gestao/compras/listar`, level: 1 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'criar',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/gestao/compras/criar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/gestao/compras/criar`, level: 2 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
            {
              index: false,
              path: 'editar/:id',
              lazy: async () => {
                const { Page } = await import(`@/pages/dashboard/cadastros/usuarios/editar`);
                return {
                  Component: () => {
                    return (
                      <ProtectedRoute requiredPermissions={[{ route: `/dashboard/cadastros/usuarios/editar`, level: 3 }]} >
                        {Page()}
                      </ProtectedRoute>
                    )
                  }
                };
              },
            },
          ]
        },
      ]
    },
    {
      path: 'settings',
      element: (
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      ),
      children: [
        {
          path: 'account',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/account');
            return { Component: Page };
          },
        },
        {
          path: 'notifications',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/notifications');
            return { Component: Page };
          },
        },
        {
          path: 'security',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/security');
            return { Component: Page };
          },
        },
      ],
    },
  ],
};

type RouteConfig = {
  [key: string]: string | RouteConfig;
};
const extractRoutes = (config: RouteConfig, parentPath: string = ''): string[] => {
  let routes: string[] = [];
  Object.keys(config).forEach(key => {
    const value = config[key];
    if (typeof value === 'string' || typeof value === 'function') {
      var route = `${parentPath}/${key}`
      if (route.toLowerCase().includes(`dashboard`))
        routes.push(route);
    } else {
      routes = routes.concat(extractRoutes(value, `${parentPath}/${key}`));
    }
  });

  return routes;
};
export const rotasDashboard = extractRoutes(paths as any);