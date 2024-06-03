
import React, { useState } from "react";
import { TiposCriar } from "./tipos-criar";
import { TiposEditar } from "./tipos-editar";

export interface TiposModalProps {
    ds_Tipo: string
    handleCloseModal: () => void;

}

export function TiposModal({ ds_Tipo, handleCloseModal }: TiposModalProps): React.JSX.Element { 
    if (ds_Tipo === 'novo') {
        return (<TiposCriar tp_Novo={true} handleCloseModal={handleCloseModal} />)
    }
    else {
        return (<TiposEditar ds_Tipo={ds_Tipo} handleCloseModal={handleCloseModal} />)
    }
} 