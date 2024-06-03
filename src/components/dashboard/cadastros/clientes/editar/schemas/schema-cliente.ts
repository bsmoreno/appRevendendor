import { authProvider } from '@/lib/provider';
import * as z from 'zod';
import validator from '@/lib/validateCPFCNPJ'; 
import {useDebounce} from 'react-use'

// Função assíncrona para verificar o e-mail
export const verificarEmail = async (email: string, idCliente?: string) => {
    try { 
        const response = await authProvider.get(`/Clientes/v1/VerificarEmail?ds_Email=${encodeURIComponent(email)}&id_Cliente=${idCliente}`);
        return response.data;
    } catch (error) {
        console.log('Valida E-mail Erro', error);
        return false;
    }
}

// Função assíncrona para verificar o CPF/CNPJ
export const verificarCpfCnpj = async (cdCpfCnpj: string, idCliente?: string) => {
    try {
        cdCpfCnpj = cdCpfCnpj.replace(/[\D]/g, '');
        if (cdCpfCnpj === "00000000000") return true;
        if (cdCpfCnpj === "00000000000000") return true;
        const response = await authProvider.get(`/Clientes/v1/VerificarCpfCnpj?cd_CpfCnpj=${cdCpfCnpj}&id_Cliente=${idCliente}`);
        return response.data;
    } catch (error) {
        console.log('Valida CPF/CNPJ Erro', error);
        return false;
    }
}

const verificarTelefone = (input: string | null | undefined) => {
    if (input === null || input === undefined)
        return true;
    let s = input.replace(/[\D]/g, '');
    if (s === '')
        return true;
    if (s.length < 10 || s.length > 11) {
        return false;
    }
    else
        return true;
};


const schemaCpfCnpj = z.string()
    .min(11, "CPF Inválido")
    .superRefine((input, ctx) => {
        input = input.replace(/[\D]/g, '');
        if (input === "00000000000" || input === "00000000000000") return true;
        if (input.length < 11) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CPF Inválido",
            });
        } else if (input.length == 11) {
            if (!validator.isCPF(input)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "CPF Incorreto",
                });
            }
        } else if (input.length > 11 && input.length < 14) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CNPJ Inválido",
            });
        } else if (input.length == 14) {
            if (!validator.isCNPJ(input)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "CNPJ Incorreto",
                });
            }
        } else {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CPF/CNPJ Inválido",
            });
        }
    });
const schemaEmail = z.string({ required_error: 'Informe o E-mail' })
    .min(1, 'Informe o E-mail')
    .max(255, 'Máximo de 255 Caracteres')
    .email('E-mail Inválido')
    .toLowerCase();
export const schemaCliente = z.object({
    id_Cliente: z.string().uuid(),
    cd_CpfCnpj: schemaCpfCnpj,
    ds_Nome: z.string().min(1, 'Informe o Nome').max(255, 'Máximo de 255 Caracteres').toUpperCase(),
    ds_Sobrenome: z.string().min(1, 'Informe o Nome').max(255, 'Máximo de 255 Caracteres').toUpperCase(),
    ds_Apelido: z.string().min(1, 'Informe o Nome').max(255, 'Máximo de 255 Caracteres').toUpperCase().optional(),
    ds_Email: schemaEmail,
    nr_Telefone: z.string().refine((input) => verificarTelefone(input), 'Telefone Inválido').optional(),
    tp_TelefoneWhatsApp: z.boolean().optional(),
    nr_Celular: z.string().refine((input) => verificarTelefone(input), 'Celular Inválido').optional(),
    tp_CelularWhatsApp: z.boolean().optional(),
    nr_Contato: z.string().refine((input) => verificarTelefone(input), 'Contato Inválido').optional(),
    tp_ContatoWhatsApp: z.boolean().optional(),
    vl_Credito: z.number().positive().min(0.01, 'Valor Minimo de R$ 0,00').finite(),
    tp_Status: z.boolean({required_error: "Informe o Status"})
}).superRefine(async (data: any, ctx: any) => {
    if ((await schemaEmail.safeParseAsync(data.ds_Email)).success) { 
        if (!await verificarEmail(data.ds_Email, data.id_Cliente)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'E-mail já cadastrado!',
                path: ['ds_Email'],
            });
        }
    }
    if ((await schemaCpfCnpj.safeParseAsync(data.cd_CpfCnpj)).success) {
        if (!await verificarCpfCnpj(data.cd_CpfCnpj, data.id_Cliente)) {
            let cdCpfCnpj = data.cd_CpfCnpj.replace(/[\D]/g, '');
            let tipo = cdCpfCnpj.length <= 11 ? 'CPF' : 'CNPJ' 
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${tipo} já cadastrado!`,
                path: ['cd_CpfCnpj'],
            });
        }
    }
});

export type schemaClienteRules = z.infer<typeof schemaCliente>; 
 

