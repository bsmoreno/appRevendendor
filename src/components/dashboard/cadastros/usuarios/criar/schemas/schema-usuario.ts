import { authProvider } from '@/lib/provider';
import * as v from 'valibot';

export const verificarEmail = async (email: string) => {
    try {
        const result = v.safeParse(v.string([v.email("E-mail Inválido")]), email);
        if (result.success) {
            const response = await authProvider.get(`/Usuarios/v1/VerificarEmail?ds_Email=${encodeURIComponent(email)}`);
            return response.data ;
        }
        else {
            return false
        }
    } catch (error) {
        return false;
    }
}

export const schemaUsuario = v.objectAsync(
    {
        ds_Nome: v.string([
            v.minLength(1, 'Informe o Nome'),
            v.maxLength(255, 'Máximo de 255 Caracteres'),
            v.toUpperCase(),
            v.toTrimmed()
        ]),
        ds_Sobrenome: v.string([
            v.minLength(1, 'Informe o Sobrenome'),
            v.maxLength(255, 'Máximo de 255 Caracteres'),
            v.toUpperCase(),
            v.toTrimmed()
        ]),
        ds_Email: v.stringAsync([
            v.minLength(1, 'Informe o E-mail'),
            v.email('E-mail Inválido'),
            v.maxLength(255, 'Máximo de 255 Caracteres'),
            v.customAsync(async (input) => {
                return await verificarEmail(input)
            }, "E-mail já cadastrado"),
            v.toLowerCase()
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
        tp_Admin: v.boolean("Informe o Admin"),
        tp_Status: v.boolean("Informe o Status"),
        js_Roles: v.transform(v.array(v.union([v.string(), v.unknown()])), (input: any) => { 
            return input.filter(x => x.type !== undefined).filter(x => parseInt(x.type.split('_')[1]) >= 0).map(x => x.type)
        })
    }
);



// export const schemaUsuario = v.objectAsync(
//     {
//         ds_Nome: v.string([
//             v.minLength(1, 'Informe o Nome'),
//             v.maxLength(255, 'Máximo de 255 Caracteres'),
//             v.toUpperCase(),
//             v.toTrimmed()
//         ]),
//         ds_Sobrenome: v.string([
//             v.minLength(1, 'Informe o Sobrenome'),
//             v.maxLength(255, 'Máximo de 255 Caracteres'),
//             v.toUpperCase(),
//             v.toTrimmed()
//         ]),
//         ds_Email: v.string([
//             v.minLength(1, 'Informe o E-mail'),
//             v.email('E-mail Inválido'),
//             v.maxLength(255, 'Máximo de 255 Caracteres'),
//             // v.customAsync(async (input) => {
//             //     return await verificarEmail(input)
//             // }, "E-mail já cadastrado"),
//             v.toLowerCase()
//         ]),
//         nr_Celular: v.string([
//             v.custom((input: string) => {
//                 var s = input.replace(/[\D]/g, '');
//                 if (s === '')
//                     return true;
//                 if (s.length != 13) {
//                     return false;
//                 }
//                 if (s.substr(2).length != 11) {
//                     return false;
//                 }
//                 else
//                     return true;
//             }, "Celular Inválido")
//         ]),
//         tp_Admin: v.boolean("Informe o Admin"),
//         tp_Status: v.boolean("Informe o Status"),
//         // js_Roles: v.transform(v.array(v.union([v.string(), v.unknown()])), (input: any) => {
//         //     let roles = input.filter((x: string) => x !== null)
//         //     return roles.filter(x => parseInt(x.split('_')[1]) > -1);
//         // })
//     },
//     [
//         v.forward(
//             v.custom(
//                 (input) => { console.log(input.ds_Email); return true; },//await verificarEmail(input.ds_Email),
//                 "E-mail já cadastrado"
//             ),
//             ['ds_Email']

//         ),
//     ]
// );
export type schemaUsuarioRules = v.Output<typeof schemaUsuario>;