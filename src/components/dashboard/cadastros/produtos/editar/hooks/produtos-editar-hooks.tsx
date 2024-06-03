import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { paths } from "@/paths";
import { safeParse, string, uuid } from "valibot";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { schemaEditarProdutosRules, schemaEditarProdutos } from "../schemas/schema-editar-produtos";
import { Clientes } from "@/types/clientes";
import { useAsync, useToggle } from "react-use";
import { useBlockUI } from "@/components/widgets/blockUi";

export const ProdutosEditarHooks = (id_Produto: string) => {
  const navigate = useNavigate();
  const [status, setStatus] = useToggle(false);
  const queryClient = useQueryClient();

  const [openState, setBlockUI] = useBlockUI();
  React.useEffect(() => {
    const uudiValid = safeParse(string([uuid()]), id_Produto);
    if (id_Produto === undefined || !uudiValid.success) {
      toast.error("Id de Cliente Inválido");
      queryClient.removeQueries({ queryKey: ['ProdutosEditar', id_Produto], exact: true });
      navigate(paths.dashboard.cadastros.clientes.listar);
      return;
    }
  }, [id_Produto]);
  useAsync(async () => {
    const result = await queryClient.invalidateQueries();
    setStatus(true);
  }, [queryClient]);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ProdutosEditar', id_Produto],
    queryFn: async () => {
      try {
        const result = await authProvider.get(`Produtos/v1/Buscar`, { params: { id_Produto } });
        if (result.status === 200) {
          reset({
            id_Produto: result.data?.id_Produto ?? '',
            cd_Produto: result.data?.cd_Produto ?? '',
            cd_EAN: result.data?.cd_EAN ?? '',
            ds_Produto: result.data?.ds_Produto ?? '',
            ds_Descricao: result.data?.ds_Descricao ?? '',
            tp_Kit: result.data?.tp_Kit ?? false,
            id_Marca: result.data?.id_Marca ?? '',
            id_SubMarca: result.data?.id_SubMarca ?? '',
            id_Linha: result.data?.id_Linha ?? '',
            id_Classificacao: result.data?.id_Classificacao ?? '',
            id_Caracteristica: result.data?.id_Caracteristica ?? '',
            id_Tipo: result.data?.id_Tipo ?? '',
            vl_Venda: result.data?.vl_Venda ?? 0,
            tp_Status: result.data?.tp_Status ?? true,
          })
          return result.data;
        } else {
          toast.error("Produto não encontrado");
          queryClient.removeQueries({ queryKey: ['ProdutosEditar', id_Produto], exact: true });
          navigate(paths.dashboard.cadastros.produtos.listar);
          return null;
        }
      } catch (err) {
        toast.error("Erro ao buscar Produto");
        queryClient.removeQueries({ queryKey: ['ProdutosEditar', id_Produto], exact: true });
        navigate(paths.dashboard.cadastros.produtos.listar);
        return null;
      }
    },
    enabled: !!id_Produto && status
  });



  const defaultValues = {
    id_Produto: data?.id_Produto ?? '',
    cd_Produto: data?.cd_Produto ?? '',
    cd_EAN: data?.cd_EAN ?? '',
    ds_Produto: data?.ds_Produto ?? '',
    ds_Descricao: data?.ds_Descricao ?? '',
    tp_Kit: data?.tp_Kit ?? false,
    id_Marca: data?.id_Marca ?? '',
    id_SubMarca: data?.id_SubMarca ?? '',
    id_Linha: data?.id_Linha ?? '',
    id_Classificacao: data?.id_Classificacao ?? '',
    id_Caracteristica: data?.id_Caracteristica ?? '',
    id_Tipo: data?.id_Tipo ?? '',
    vl_Venda: data?.vl_Venda ?? 0,
    tp_Status: data?.tp_Status ?? true,
  } satisfies schemaEditarProdutosRules;
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<schemaEditarProdutosRules>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: zodResolver(schemaEditarProdutos, { async: true }, { mode: "async" }),
  });

  const onSubmit = React.useCallback(
    async (data: schemaEditarProdutosRules): Promise<void> => {
      try {

        let result = await authProvider.put('/Produtos/v1/Editar', data);
        if (result.status === 200) {
          toast.success(`Produto Atualizado Com Sucesso!`);
          queryClient.removeQueries({ queryKey: ['ProdutosEditar', id_Produto], exact: true });
          navigate(paths.dashboard.cadastros.produtos.listar);
        } else {
          toast.error('Falha ao Atualizar Cliente');
        }
      } catch (err) {
        toast.error(err?.message);
        queryClient.removeQueries({ queryKey: ['ProdutosEditar', id_Produto], exact: true });
      }
    },
    []
  );

  React.useEffect(() => {
    setBlockUI(isSubmitting || isLoading || isFetching)
  }, [isSubmitting, isLoading, isFetching])
  return {
    Controller,
    watch,
    handleSubmit,
    setValue,
    onSubmit,
    isSubmitting,
    errors,
    control,
    navigate,
    isFetching,
    isLoading
  };
};
