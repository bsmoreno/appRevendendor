import { authProvider } from '@/lib/provider';
import * as z from 'zod';
import validator from '@/lib/validateCPFCNPJ';

// Função assíncrona para verificar o e-mail
export const verificarEmail = async (email: string) => {
    try {
        const response = await authProvider.get(`/Clientes/v1/VerificarEmail?ds_Email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        return false;
    }
}

// Função assíncrona para verificar o CPF/CNPJ
export const verificarCpfCnpj = async (cdCpfCnpj: string) => {
    try {
        cdCpfCnpj = cdCpfCnpj.replace(/[\D]/g, '');
        if (cdCpfCnpj === "00000000000") return true;
        if (cdCpfCnpj === "00000000000000") return true;
        const response = await authProvider.get(`/Clientes/v1/VerificarCpfCnpj?cd_CpfCnpj=${cdCpfCnpj}`);
        return response.data;
    } catch (error) {
        console.log('Valida CPF/CNPJ Erro', error);
        return false;
    }
}

const verificarTelefone = (input: string | null | undefined) => {
    if (input === null || input === undefined)
        return true;
    var s = input.replace(/[\D]/g, '');
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
const schemaIE = z.string()
    .superRefine((input, ctx) => {
        input = input.replace(/[\D]/g, '');
        if (input === "") return true
        if (input === "0".repeat(input.length)) return true;
    }).optional();
const schemaEmail = z.string({ required_error: 'Informe o E-mail' })
    .min(1, 'Informe o E-mail')
    .max(255, 'Máximo de 255 Caracteres')
    .email('E-mail Inválido')
    .toLowerCase().optional();
export const schemaFornecedor = z.object({
    cd_CpfCnpj: schemaCpfCnpj,
    cd_IE: schemaIE,
    ds_RazaoSocial: z.string({ required_error: 'Informe a Razão Social' }).min(1, 'Informe a Razão Social').max(255, 'Máximo de 255 Caracteres').toUpperCase(),
    ds_NomeFantasia: z.string({ required_error: 'Informe o Nome Fantasia' }).min(1, 'Informe o Nome Fantasia').max(255, 'Máximo de 255 Caracteres').toUpperCase(),
    ds_Email: schemaEmail,
    cd_CEP: z.optional(z.string().min(8, "Cep Inválido").toUpperCase()),
    ds_Endereco: z.optional(z.string().max(255, 'Máximo de 255 Caracteres').toUpperCase()),
    nr_Endereco: z.optional(z.string().max(255, 'Máximo de 255 Caracteres').toUpperCase()),
    ds_Bairro: z.optional(z.string().max(255, 'Máximo de 255 Caracteres').toUpperCase()),
    ds_Complemento: z.optional(z.string().max(255, 'Máximo de 255 Caracteres').toUpperCase()),
    ds_Cidade: z.optional(z.unknown().transform((input:any) => {
        return input.cidade.toUpperCase();
    })),
    cd_UF: z.optional(z.string().max(255, 'Máximo de 255 Caracteres').toUpperCase()),
    nr_Telefone: z.string().refine((input) => verificarTelefone(input), 'Telefone Inválido').optional(),
    nr_Celular: z.string().refine((input) => verificarTelefone(input), 'Celular Inválido').optional(),
    nr_Contato: z.string().refine((input) => verificarTelefone(input), 'Contato Inválido').optional(),
}).superRefine(async (data: any, ctx: any) => {
    if ((await schemaCpfCnpj.safeParseAsync(data.cd_CpfCnpj)).success) {
        if (!await verificarCpfCnpj(data.cd_CpfCnpj)) {
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


export type schemaFornecedorRules = z.infer<typeof schemaFornecedor>; 
