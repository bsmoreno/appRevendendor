import { z } from "zod";

export const schemaCriarProdutos = z.object({
    cd_Produto: z.string().optional(),
    cd_EAN: z.string().optional(),
    ds_Produto: z.string().min(1, "Informe o Nome do Produto").toUpperCase(),
    ds_Descricao: z.string().toUpperCase().optional(),
    tp_Kit: z.boolean({required_error: "Informe se o produto é um Kit"}),
    id_Marca: z.string().uuid("Informe a Marca"), //z.string().uuid().optional(),
    id_SubMarca: z.string().uuid("Informe a SubMarca").or(z.literal('')).nullish().transform((value => {
        if(value === '')
            return null
    })),
    id_Linha: z.string().uuid("Informe a Linha").or(z.literal('')).nullish().transform((value => {
        if(value === '')
            return null
    })),
    id_Classificacao: z.nullable(z.string().uuid("Informe a Classificação")).or(z.literal('')).nullish().transform((value => {
        if(value === '')
            return null
    })),
    id_Caracteristica: z.nullable(z.string().uuid("Informe a Caracteristica")).or(z.literal('')).nullish().transform((value => {
        if(value === '')
            return null
    })),
    id_Tipo: z.nullable(z.string().uuid("Informe a Tipo")).or(z.literal('')).nullish().transform((value => {
        if(value === '')
            return null
    })),
    vl_Venda: z.number().min(0.01, "Informe o Valor de Venda do Produto")
});
 
export type schemaCriarProdutosRules = z.infer<typeof schemaCriarProdutos>; 