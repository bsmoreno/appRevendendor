export interface Tipos {
    id_Tipo: string;
    ds_Tipo: string;
    js_Tipo: Tipo[];
}

export interface Tipo {
    id: string;
    text: string;
    detail?: string;
    status: boolean;
}