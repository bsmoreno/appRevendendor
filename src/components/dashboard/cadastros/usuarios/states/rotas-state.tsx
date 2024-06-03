import { atom } from "recoil";
import { Rotas } from "../criar/hooks/usuarios-criar-form-hooks";
export const rotasState = atom<Rotas[]>({
    key: 'rotasState',
    default: []
});