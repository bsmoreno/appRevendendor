'use client';

import * as React from 'react';
import Storage from '@/contexts/database'
import type { Usuario } from '@/types/user';
import { authClient, dtExpiracao } from '@/lib/auth/authClient';
import { logger } from '@/lib/default-logger';
import dayjs from 'dayjs';

import type { UserContextValue } from './types';
import { toast } from "@/components/core/toaster";

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);
export const RolesPermissao = {
  admin: 0,
  leitura: 1,
  gravar: 2,
  atualizar: 3,
  excluir: 4
} as const;
export interface UserProviderProps {
  children: React.ReactNode;
}

const storage = new Storage("usuario")
export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{ user: Usuario | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      let dtExp = localStorage.getItem(dtExpiracao);
      if (dayjs().isAfter(dayjs(dtExp, 'DD/MM/YYYY HH:mm:ss'))) {
        authClient.signOut();
        toast.warning('Sessão Expirada');
        setState((prev) => ({ ...prev, user: null, error: null, isLoading: false }));
        return;
      }

      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: error, isLoading: false }));
        return;
      }
      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err:any) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: err.message, isLoading: false }));
    }
  }, []);

  const getAccessLevel = React.useCallback(async (pathName: string): Promise<number> => {
    try {

      const { data, error } = await authClient.getUser();
      if (error) {
        logger.error(error);
        return -1;
      }
      if (data.js_Roles.hasOwnProperty(pathName)) {
        return data.js_Roles[pathName];
      }

      if (data.js_Roles.hasOwnProperty('*')) {
        return data.js_Roles['*'];
      }

      return -1;
    } catch (err) {
      logger.error(err);
      return -1;
    }
  }, []);
  const setTrocaPassword = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser(true);
      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: error, isLoading: false }));
        return;
      }
      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err:any) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: err.message, isLoading: false }));
    }
  }, [])
  React.useEffect(() => {
    checkSession().catch((err) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession, getAccessLevel, setTrocaPassword }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
