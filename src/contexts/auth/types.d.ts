import type { Usuario } from '@/types/user';

export interface UserContextValue {
  user: Usuario | null;
  error: string | null;
  isLoading: boolean; 
  checkSession?: () => Promise<void>;
  getAccessLevel: (pathName:string) => Promise<number>;
  setTrocaPassword: () => Promise<void>;
}
