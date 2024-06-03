export interface Produtos {
    id_Produto: string;
    nr_Produto: number;
    cd_Produto: string | null;
    cd_EAN: string | null;
    ds_Produto: string;
    ds_Descricao: string | null;
    tp_Kit: boolean;
    id_Marca: string | null;
    ds_Marca: string | null;
    id_SubMarca: string | null;
    ds_SubMarca: string | null;
    id_Linha: string | null;
    ds_Linha: string | null;
    id_Classificacao: string | null;
    ds_Classificacao: string | null;
    id_Caracteristica: string | null;
    ds_Caracteristica: string | null;
    id_Tipo: string | null;
    ds_Tipo: string | null;
    vl_Venda: number;
    tp_Status: boolean;
    dt_Inclusao: string;
    id_UsuarioInclusao: string;
    dt_Atualizacao: string | null;
    id_UsuarioAtualizacao: string | null;
}