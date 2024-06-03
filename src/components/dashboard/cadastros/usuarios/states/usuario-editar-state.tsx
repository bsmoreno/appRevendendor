import { atom } from "recoil";
import { Usuario } from '@/types/user';
export const usuarioEditarState = atom<Usuario>({
    key: 'usuarioEditarState',
    default: undefined,
});