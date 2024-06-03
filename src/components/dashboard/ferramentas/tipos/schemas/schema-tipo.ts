import { authProvider } from '@/lib/provider';
import * as z from 'zod';


export const schemaTipo = z.object({
    id: z.string().uuid(),
    text: z.string().min(1, "Informe o Texto").toUpperCase(),
    detail: z.string().toUpperCase().optional(),
    status: z.boolean()
});

export const schemaArrayTipos = z.array(schemaTipo).nonempty(`Inclua um Texto para Prosseguir`).superRefine((items, ctx) => {
    const uniqueValues = new Map<string, number>()
    items.forEach((item, idx) => {
        if (item.status === false) return;
        const firstAppearanceIndex = uniqueValues.get(item.text.toUpperCase())
        if (firstAppearanceIndex !== undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `O Texto está duplicado`,
                path: [idx, 'text'],
            })
            return
        }
        uniqueValues.set(item.text.toUpperCase(), idx)
    })
})

export const schemaTipos = z.object({
    id_Tipo: z.string().uuid(),
    ds_Tipo: z.string().min(1, "Informe o Tipo").toLowerCase(),
    js_Tipo: schemaArrayTipos
})
    .superRefine((items, ctx) => {
        if (items.js_Tipo.filter(x => x.status === true).length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Inclua um Texto para Prosseguir`,
                path: ['js_Tipo'],
            })
            return
        }
    })
 
export const schemaCriarTipos = z.object({ 
    ds_Tipo: z.string().min(1, "Informe o Tipo").toLowerCase(), 
})
    .superRefine(async (items, ctx) => { 
        const result = await authProvider.get(`Ferramentas/Tipos/v1/TipoExiste`, { params: { ds_Tipo: items.ds_Tipo } });
        if(result.status === 200){
            if(!result.data){
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Tipo já cadastrado`,
                    path: ['ds_Tipo'],
                })
            }
        } 
        else{
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Falha ao Verificar Tipo`,
                path: ['ds_Tipo'],
            })
        }
    })
export type schemaEditarTipoRules = z.infer<typeof schemaTipos>;
export type schemaCriarTipoRules = z.infer<typeof schemaCriarTipos>;
