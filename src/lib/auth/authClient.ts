'use client';
import Storage from '@/contexts/database'
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'
import { authProvider, baseProvider } from '../provider';
export const lsToken = 'portal-revendedor-token';
export const lsRToken = 'portal-revendedor-rToken';
export const lsIdUsuario = 'portal-revendedor-id';
export const dtToken = 'portal-revendedor-dtToken';
export const dtExpiracao = 'portal-revendedor-dtExpiracao';

export interface AuthParams {
  email: string;
  password: string;
}
export interface AuthUser {
  id_Usuario: string;
  cd_Token: string
  cd_RefreshToken: string;
  dt_Token: Date;
};
export interface ResetPasswordParams {
  email: string;
}
interface RefreshIntefaceParms {
  cd_RefreshToken: string;
}
const storage = new Storage("usuario")
class AuthClient {
  async singIn(auth: any): Promise<{ token?: string; error?: string }> {
    try {
      const { data, status } = await baseProvider.post("/Auth/v1/SingIn", auth);
      if (status == 200) {
        localStorage.setItem(lsToken, data.cd_Token);
        localStorage.setItem(lsIdUsuario, data.id_Usuario);
        localStorage.setItem(lsRToken, data.cd_RefreshToken);
        localStorage.setItem(dtToken, dayjs(data.dt_Expiracao).format('DD/MM/YYYY HH:mm:ss'));
        localStorage.setItem(dtExpiracao, dayjs(data.dt_Expiracao).add(8, 'hour').format('DD/MM/YYYY HH:mm:ss'));
        return { token: data.cd_RefreshToken };
      }
      else if (status == 500) {
        debugger;
      }
      throw new Error('Falha na requisição erro: ' + status)
    }
    catch (e: any) {
      localStorage.removeItem(lsToken);
      localStorage.removeItem(lsIdUsuario);
      localStorage.removeItem(lsRToken);
      localStorage.removeItem(dtToken);
      localStorage.removeItem(dtExpiracao);
      if (e?.code == "ERR_BAD_RESPONSE") {
        return { error: e?.response?.data };
      }
      else {
        return { error: e?.message };
      }
    }
  }
  async getUser(tp_Force: boolean = false): Promise<{ data?: any | null; error?: string }> {

    const idUsuario = localStorage.getItem(lsIdUsuario) as string;
    try {
      if (idUsuario === null || idUsuario === undefined)
        throw new Error("Sessão Encerrada!")
      var usuario = await storage.getItem(idUsuario)
      if (!tp_Force && usuario !== null && usuario !== undefined)
        return { data: usuario };

      const { data, status } = await authProvider.get("/Auth/v1/BuscaUsuario", { params: { id_Usuario: idUsuario } });
      if (status === 200) {
        await storage.setItem(idUsuario, data)
        return { data }
      }
      else
        throw new Error('Falha ao Buscar Usuário')
    }
    catch (e) {
      localStorage.removeItem(lsToken);
      localStorage.removeItem(lsIdUsuario);
      localStorage.removeItem(lsRToken);
      localStorage.removeItem(dtToken);
      localStorage.removeItem(dtExpiracao);
      if (idUsuario !== null && idUsuario !== undefined)
        await storage.removeItem(idUsuario)
      return { data: null }
    }
  }

  async signOut(): Promise<{ error?: string }> {
    const idUsuario = localStorage.getItem(lsIdUsuario) as string;
    if (idUsuario !== null && idUsuario !== undefined)
      await storage.removeItem(idUsuario)
    localStorage.removeItem(lsToken);
    localStorage.removeItem(lsIdUsuario);
    localStorage.removeItem(lsRToken);
    localStorage.removeItem(dtToken);
    localStorage.removeItem(dtExpiracao);
    return {};
  }
  async refreshToken(refreshToken: RefreshIntefaceParms): Promise<{ data?: any | null; error?: string }> {
    try {
      const { data, status } = await baseProvider.post("/Auth/v1/RefreshToken", refreshToken.cd_RefreshToken);
      if (status == 200) {
        localStorage.setItem(lsToken, data.cd_Token);
        localStorage.setItem(lsIdUsuario, data.id_Usuario);
        localStorage.setItem(lsRToken, data.cd_RefreshToken);
        localStorage.setItem(dtToken, data.dt_Expiracao);
        return { data };
      }
      throw new Error('Falha na requisição erro: ' + status)
    }
    catch (e) {
      throw { error: e };
    }
  }

}


export const authClient = new AuthClient();
