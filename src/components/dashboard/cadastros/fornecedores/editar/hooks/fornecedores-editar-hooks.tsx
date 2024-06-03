import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { paths } from "@/paths";
import { safeParse, string, uuid } from "valibot";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useBlockUI } from "@/components/widgets/blockUi";
import { schemaFornecedor, schemaFornecedorRules } from "../schemas/schema-fornecedor";
import axios from "axios";

export const FornecedoresEditarFromHooks = (id_Fornecedor: string) => {
  const queryClient = useQueryClient();
  const [_, setBlockUI] = useBlockUI();
  const navigate = useNavigate();

  const defaultValues = {
    id_Fornecedor: '',
    nr_Fornecedor: 0,
    cd_CpfCnpj: '000.000.000-00',
    cd_IE: '',
    ds_RazaoSocial: '',
    ds_NomeFantasia: '',
    ds_Email: '',
    ds_Endereco: '',
    nr_Endereco: '',
    ds_Bairro: '',
    ds_Complemento: '',
    ds_Cidade: { cidade: '', uf: '' },
    cd_UF: '',
    nr_Telefone: '',
    nr_Celular: '',
    nr_Contato: '',
    tp_Status: false
  } satisfies schemaFornecedorRules;
  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    setFocus,
    getValues,
    clearErrors,
    reset,
    formState: { errors, isLoading, isValidating, isSubmitting },
  } = useForm<schemaFornecedorRules>({
    mode: 'onSubmit',
    reValidateMode: "onBlur",
    defaultValues,
    resolver: zodResolver(schemaFornecedor),
  });
  const { data, isLoading: isLoadingFull, isFetching } = useQuery({
    queryKey: ['FornecedoresEditar', id_Fornecedor],
    queryFn: async () => {
      try {
        const result = await authProvider.get(`Fornecedores/v1/Buscar`, {
          params: {
            id_Fornecedor
          }
        });
        if (result.status === 200) {
          return result.data;
        } else {
          toast.error("Usuário não encontrado");
          queryClient.removeQueries({ queryKey: ['FornecedoresEditar', id_Fornecedor], exact: true });
          navigate(paths.dashboard.cadastros.fornecedores.listar);
          return null;
        }
      } catch (err) {
        toast.error("Erro ao buscar usuário");
        queryClient.removeQueries({ queryKey: ['FornecedoresEditar', id_Fornecedor], exact: true });
        navigate(paths.dashboard.cadastros.fornecedores.listar);
        return null;
      }
    },
    enabled: !!id_Fornecedor,
    refetchOnWindowFocus: false
  });


  const onSubmit = React.useCallback(
    async (data: schemaFornecedorRules): Promise<void> => {
      try {
        let result = await authProvider.put('/Fornecedores/v1/Editar', data);
        if (result.status === 200) {
          toast.success(`Fornecedores Editado Com Sucesso!`);
          queryClient.removeQueries({ queryKey: ['FornecedoresEditar', id_Fornecedor], exact: true });

          reset(defaultValues);
          navigate(paths.dashboard.cadastros.fornecedores.listar);
        }
        else {
          toast.error(`Falha ao Criar Fornecedor`);
        }
      } catch (err) {
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  )
  const { refetch: refetchCep, isLoading: isLoadingCep } = useQuery({
    queryKey: ["buscaCEP"],
    queryFn: async () => {
      let result = await axios.get(`https://viacep.com.br/ws/${getValues('cd_CEP')?.replace(/\D/g, '')}/json/`)
      if (result.status === 200)
        return result.data;
      else
        throw new Error("Cep Inválido")
    },
    enabled: false
  });

  const handleCep = async (event: any) => {
    setBlockUI(true);
    try {
      var cdCep = getValues('cd_CEP');
      cdCep = cdCep?.replace(/\D/g, '');
      if (cdCep?.length == 8) {
        var cep = await refetchCep();
        const cidade = {
          cidade: cep.data.localidade?.toString()?.toUpperCase(),
          uf: cep.data.uf?.toString()?.toUpperCase()
        };
        setValue("ds_Endereco", cep.data.logradouro?.toString()?.toUpperCase());
        setValue("nr_Endereco", "");
        setValue("ds_Bairro", cep.data.bairro?.toString()?.toUpperCase());
        setValue("ds_Complemento", cep.data.complemento?.toString()?.toUpperCase());
        setValue("ds_Cidade", cidade); // Define o valor do AutoCompleteCidades
        setValue("cd_UF", cep.data.uf?.toString()?.toUpperCase());
        toast.success("Endereço capturado com sucesso");
        setTimeout(() => {
          setFocus("nr_Endereco");
        }, 500);
      }
      else {
        setValue("cd_CEP", "");
        setFocus("cd_CEP")
        toast.error("CEP Inválido")
      }
    }
    finally {
      setBlockUI(false);
    }

  }
  const maskTelefone = (value: string) => {
    const input = value.replace(/\D/g, '');
    if (input.length > 10) {
      return ['(', /\d/, /\d/, ')', ' ', /\d/, '.', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    } else {
      return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
  }

  const maskCpfCnpj = (value: string) => {
    const input = value.replace(/\D/g, '');
    if (input.length <= 11) {
      return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    } else {
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
  }
  const maskCep = (value: string) => {
    return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  }

  React.useEffect(() => {
    setBlockUI(isLoadingCep || isLoadingFull || isFetching || isSubmitting);
  }, [isLoadingCep || isLoadingFull || isFetching || isSubmitting])
  React.useEffect(() => {
    if (data) {
      reset(data);
      setValue("ds_Cidade", { cidade: data.ds_Cidade.toUpperCase(), uf: data.cd_Uf })
    }
  }, [data])

  return {
    Controller,
    handleSubmit,
    handleCep,
    onSubmit,
    setError,
    setFocus,
    setValue,
    clearErrors,
    watch,
    control,
    errors,
    defaultValues,
    isLoadingFull: isLoading,
    isValidating,
    isSubmitting,
    navigate,
    maskTelefone,
    maskCpfCnpj,
    maskCep
  }
};
