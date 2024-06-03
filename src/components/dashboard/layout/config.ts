import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

// NOTE: We did not use React Components for Icons, because
//  you may one to get the config from the server.

// NOTE: First level elements are groups.

export interface LayoutConfig {
  navItems: NavItemConfig[];
}

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboard',
      title: 'Dashboards',
      items: [
        { key: 'home', title: 'Home', href: paths.dashboard.home, icon: 'house' },
      ],
    },
    {
      key: 'cadastros',
      title: 'Cadastros',
      items: [ 
        {
          key: 'usuarios',
          title: 'Usuarios',
          icon: 'users',
          items: [
            { key: 'usuarios', title: 'Listar', href: paths.dashboard.cadastros.usuarios.listar }, 
            { key: 'usuarios', title: 'Novo', href: paths.dashboard.cadastros.usuarios.criar }, 
          ],
        },
        {
          key: 'clientes',
          title: 'Clientes',
          icon: 'clientes',
          items: [
            { key: 'clientes', title: 'Listar', href: paths.dashboard.cadastros.clientes.listar }, 
            { key: 'clientes', title: 'Novo', href: paths.dashboard.cadastros.clientes.criar }, 
          ],
        },
        {
          key: 'fornecedores',
          title: 'Fornecedores',
          icon: 'fornecedores',
          items: [
            { key: 'fornecedores', title: 'Listar', href: paths.dashboard.cadastros.fornecedores.listar }, 
            { key: 'fornecedores', title: 'Novo', href: paths.dashboard.cadastros.fornecedores.criar }, 
          ],
        },
        {
          key: 'produtos',
          title: 'Produtos',
          icon: 'barcode',
          items: [
            { key: 'produtos', title: 'Listar', href: paths.dashboard.cadastros.produtos.listar }, 
            { key: 'produtos', title: 'Novo', href: paths.dashboard.cadastros.produtos.criar }, 
          ],
        },
      ]
    } ,
    {
      key: 'gestao',
      title: 'Gestão',
      items: [ 
        {
          key: 'compras',
          title: 'Compras',
          icon: 'money',
          items: [
            { key: 'compras', title: 'Listar', href: paths.dashboard.gestao.compras.listar }, 
            { key: 'compras', title: 'Novo', href: paths.dashboard.gestao.compras.criar }, 
          ],
        } 
      ]
    } 
  ],
} satisfies LayoutConfig;
