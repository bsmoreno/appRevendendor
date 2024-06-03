import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { schemaCriarProdutos, schemaCriarProdutosRules } from "../schemas/schema-criar-produtos";
import { paths } from "@/paths";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBlockUI } from "@/components/widgets/blockUi";

export const ClientesCriarFromHooks = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const [openState, setBlockUI] = useBlockUI();
    const defaultValues = {
        cd_Produto: undefined,
        cd_EAN: undefined,
        ds_Produto: '',
        ds_Descricao: undefined,
        tp_Kit: false,
        id_Marca: '',
        id_SubMarca: null,
        id_Linha: null,
        id_Classificacao: null,
        id_Caracteristica: null,
        id_Tipo: null,
        vl_Venda: 0
    } satisfies schemaCriarProdutosRules
    const {
        control,
        handleSubmit,
        watch,
        trigger,
        setError,
        setValue,
        clearErrors,
        formState: { errors, isLoading, isValidating, isSubmitting },
    } = useForm<schemaCriarProdutosRules>({
        mode: 'onSubmit',
        reValidateMode: "onBlur",
        defaultValues,
        resolver: zodResolver(schemaCriarProdutos),
    });
    const onSubmit = React.useCallback(
        async (data: schemaCriarProdutosRules): Promise<void> => {
            try {
                let result = await authProvider.post('/Produtos/v1/Criar', data);
                if (result.status === 200) {
                    toast.success(`Produto Cadastrado Com Sucesso!`);
                    navigate(paths.dashboard.cadastros.produtos.listar);
                }
                else {
                    toast.error(`Falha ao Criar Produto`);
                }
            } catch (err) {
                toast.error('Something went wrong!');
            }
        },
        [navigate]
    ) 
    
    React.useEffect(() => {
        setBlockUI(isSubmitting || isLoading)
    }, [isSubmitting, isLoading])
    return {
        Controller,
        handleSubmit,
        onSubmit,
        setError,
        setValue,
        clearErrors,
        watch,
        control,
        errors,
        defaultValues,
        isLoading,
        isValidating,
        isSubmitting,
        navigate, 
    }
}