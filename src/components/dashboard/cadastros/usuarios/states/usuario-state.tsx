import { atom } from "recoil";

export const usuarioState = atom({
    key: 'usuarioState', // unique ID (with respect to other atoms/selectors)
    default: {
        usuario: null, novoUsuario: false
    },
});