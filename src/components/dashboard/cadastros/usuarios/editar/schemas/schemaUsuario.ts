import { authProvider } from '@/lib/provider';
import * as v from 'valibot';

export const schemaUsuario = v.objectAsync(
    {
        id_Usuario: v.string("Id Inválido", [v.uuid("Id Inválido")]),
        ds_Nome: v.string([
            v.minLength(1, 'Informe o Nome'),
            v.maxLength(255, 'Máximo de 255 Caracteres'),
            v.toUpperCase(),
            v.toTrimmed()
        ]),
        ds_Email: v.optional(v.string()),
        ds_Sobrenome: v.string([
            v.minLength(1, 'Informe o Sobrenome'),
            v.maxLength(255, 'Máximo de 255 Caracteres'),
            v.toUpperCase(),
            v.toTrimmed()
        ]),
        nr_Celular: v.string([
            v.custom((input: string) => {
                var s = input.replace(/[\D]/g, '');
                if (s === '')
                    return true;
                if (s.length != 13) {
                    return false;
                }
                if (s.substr(2).length != 11) {
                    return false;
                }
                else
                    return true;
            }, "Celular Inválido")
        ]),
        tp_Admin: v.boolean("Informe o Admin", []),
        tp_Status: v.boolean("Informe o Status", []),
        js_Roles: v.transform(v.array(v.union([v.string(), v.unknown()])), (input: any) => {  
            return input.filter(x => x.type !== undefined).filter(x => parseInt(x.type.split('_')[1]) >= 0).map(x => x.type)
        })
    }
);

export type schemaUsuarioRules = v.Output<typeof schemaUsuario>;