import React from 'react';
import CustomStore from 'devextreme/data/custom_store';

import { authProvider } from '@/lib/provider';
import { useQuery } from '@tanstack/react-query';
export const customStore = () => {

    const isNotEmpty = (value: any) => value !== undefined && value !== null && value !== '';

    const customDataSource = new CustomStore({
        key: 'id_Produto',
        load: async (loadOptions: any) => {
            const response = await authProvider.post(`Produtos/v1/Tabela`, loadOptions);
            if (response.status === 200) {
                return response.data
            }
        },
        byKey: async (id) => {
            const response = await authProvider.get(`Produtos/v1/Buscar`, {
                params: {
                    id_Produto: id
                }
            });
            return response.data;
        }
    });

    return {
        customDataSource
    }
}


export const customStoreV2 = new CustomStore({
    key: 'id_Produto',
    async load(loadOptions: any) {

        try {
            const response = await authProvider.post(`Produtos/v1/Tabela`, loadOptions);
            if (response.status === 200) {
                return response.data
            }
        } catch (err) {
            throw new Error('Data Loading Error');
        }
    },
});