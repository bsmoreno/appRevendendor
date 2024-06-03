export interface Clientes {
    id_Cliente: string;
    nr_Cliente: number;
    cd_CpfCnpj: string;
    ds_Nome: string;
    ds_Sobrenome: string;
    ds_Apelido: string | null;
    ds_Email: string | null;
    nr_Telefone: string | null;
    tp_TelefoneWhatsApp: boolean;
    nr_Celular: string | null;
    tp_CelularWhatsApp: boolean;
    nr_Contato: string | null;
    tp_ContatoWhatsApp: boolean;
    vl_Credito: number;
    tp_Status: boolean;
    dt_Inclusao: string;
    id_UsuarioInclusao: string;
    dt_Atualizacao: string | null;
    id_UsuarioAtualizacao: string | null;
}