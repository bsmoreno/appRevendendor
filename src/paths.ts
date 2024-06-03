export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    home: '/dashboard',
    settings: {
      account: '/dashboard/settings/account',
      notifications: '/dashboard/settings/notifications',
      security: '/dashboard/settings/security',
    },
    cadastros: {
      usuarios: {
        listar: '/dashboard/cadastros/usuarios/listar',
        criar: '/dashboard/cadastros/usuarios/criar',
        editar: (id: string) => `/dashboard/cadastros/usuarios/editar/${id}`,
        visualizar: (id: string) => `/dashboard/cadastros/usuarios/${id}`
      },
      produtos: {
        listar: '/dashboard/cadastros/produtos/listar',
        criar: '/dashboard/cadastros/produtos/criar',
        editar: (id: string) => `/dashboard/cadastros/produtos/editar/${id}`,
        visualizar: (id: string) => `/dashboard/cadastros/produtos/${id}`
      },
      clientes: {
        listar: '/dashboard/cadastros/clientes/listar',
        criar: '/dashboard/cadastros/clientes/criar',
        editar: (id: string) => `/dashboard/cadastros/clientes/editar/${id}`,
        visualizar: (id: string) => `/dashboard/cadastros/clientes/${id}`
      },
      fornecedores: {
        listar: '/dashboard/cadastros/fornecedores/listar',
        criar: '/dashboard/cadastros/fornecedores/criar',
        editar: (id: string) => `/dashboard/cadastros/fornecedores/editar/${id}`,
        visualizar: (id: string) => `/dashboard/cadastros/fornecedores/${id}`
      }
    },
    gestao: {
      compras: {
        listar: '/dashboard/gestao/compras/listar',
        criar: '/dashboard/gestao/compras/criar',
        editar: (id: string) => `/dashboard/gestao/compras/editar/${id}`,
        visualizar: (id: string) => `/dashboard/gestao/compras/${id}`
      },
    }
  },
  notAuthorized: '/errors/not-authorized',
  notFound: '/errors/not-found',
  internalServerError: '/errors/internal-server-error'
} as const;
