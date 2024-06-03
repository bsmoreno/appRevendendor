import React from 'react';
import CustomStore from 'devextreme/data/custom_store';

import { authProvider } from '@/lib/provider';
export const customStore = () => {

    const isNotEmpty = (value: any) => value !== undefined && value !== null && value !== '';
 
    const customDataSource = new CustomStore({
        key: 'id_Fornecedor', 
        load: async (loadOptions: any) => { 
            const response = await authProvider.post(`Fornecedores/v1/Tabela`, loadOptions);
            if (response.status === 200) {
                return response.data
            }
        },  
        byKey: async (id) => {
            const response = await authProvider.get(`Fornecedores/v1/Buscar`, {params:{
                id_Cliente: id
            }});
            return response.data;
        }  
    });


    return {
        customDataSource
    }

}