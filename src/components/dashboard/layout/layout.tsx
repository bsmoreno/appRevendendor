import * as React from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';
import { DynamicLayout } from '@/components/dashboard/layout/dynamic-layout';
import { createGlobalState } from 'react-use';
import { ProdutoDetalhesModal } from '../cadastros/produtos/produtos-detalhes-modal';

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps): React.JSX.Element {
  
  return (
    <AuthGuard>
      <DynamicLayout>{children}</DynamicLayout>
    </AuthGuard>
  );
}
