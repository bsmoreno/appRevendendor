import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Page as HomePage } from '@/pages/dashboard/home';
import { Page as NotFoundPage } from '@/pages/not-found'; 
import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';

import { route as authRoute } from './auth'; 
import { route as dashboardRoute } from './dashboard';

export const routes: RouteObject[] = [
  {
    
    path: '',
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
  {
    path: 'errors',
    children: [
      {
        path: 'internal-server-error',
        lazy: async () => {
          const { Page } = await import('@/pages/errors/internal-server-error');
          return { Component: Page };
        },
      },
      {
        path: 'not-authorized',
        lazy: async () => {
          const { Page } = await import('@/pages/errors/not-authorized');
          return { Component: Page };
        },
      },
      {
        path: 'not-found',
        lazy: async () => {
          const { Page } = await import('@/pages/errors/not-found');
          return { Component: Page };
        },
      },
    ],
  }, 
  authRoute,
  dashboardRoute,
  { path: '*', element: <NotFoundPage /> },
];
