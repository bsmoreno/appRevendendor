import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { paths } from "@/paths";
import { safeParse, string, uuid } from "valibot";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { schemaCliente, schemaClienteRules } from "../schemas/schema-cliente";
import { Clientes } from "@/types/clientes";
import { useBlockUI } from "@/components/widgets/blockUi";

export const ClientesEditarHooks = (id_Cliente: string) => {
  const navigate = useNavigate();
  const [cliente, setCliente] = React.useState<schemaClienteRules>();
  const queryClient = useQueryClient();
  const [openState, setBlockUI] = useBlockUI();

  React.useEffect(() => {
    console.log('aqui')
    const uudiValid = safeParse(string([uuid()]), id_Cliente);
    if (id_Cliente === undefined || !uudiValid.success) {
      toast.error("Id de Cliente Inválido");
      queryClient.removeQueries({ queryKey: ['ClientesEditar', id_Cliente], exact: true });
      navigate(paths.dashboard.cadastros.clientes.listar);
      return;
    }
    // const cachedData = queryClient.getQueryData<Clientes>(['ClientesEditar', id_Cliente]);
    // if (cachedData) {
    //   setCliente(cachedData as schemaClienteRules);
    //   reset(cachedData as schemaClienteRules);
    // }
  }, [id_Cliente]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ClientesEditar', id_Cliente],
    queryFn: async () => {
      try {
        const result = await authProvider.get(`Clientes/v1/Buscar`, {
          params: {
            id_Cliente
          }
        });
        if (result.status === 200) {
          setCliente(result.data);
          reset(result.data);
          return result.data;
        } else {
          toast.error("Usuário não encontrado");
          queryClient.removeQueries({ queryKey: ['ClientesEditar', id_Cliente], exact: true });
          navigate(paths.dashboard.cadastros.clientes.listar);
          return null;
        }
      } catch (err) {
        toast.error("Erro ao buscar usuário");
        queryClient.removeQueries({ queryKey: ['ClientesEditar', id_Cliente], exact: true });
        navigate(paths.dashboard.cadastros.clientes.listar);
        return null;
      }
    },
    enabled: !!id_Cliente,
    refetchOnWindowFocus: false
  });

  React.useEffect(() => {
    if (isLoading) {
      reset(cliente as schemaClienteRules);
    }
  }, [isLoading])
  const defaultValues = {
    id_Cliente: data?.id_Cliente ?? '',
    cd_CpfCnpj: data?.cd_CpfCnpj ?? '',
    ds_Nome: data?.ds_Nome ?? '',
    ds_Sobrenome: data?.ds_Sobrenome ?? '',
    ds_Email: data?.ds_Email ?? '',
    vl_Credito: data?.vl_Credito ?? 0,
    ds_Apelido: data?.ds_Apelido ?? '',
    nr_Telefone: data?.nr_Telefone ?? '',
    tp_TelefoneWhatsApp: data?.tp_TelefoneWhatsApp ?? false,
    nr_Celular: data?.nr_Celular ?? '',
    tp_CelularWhatsApp: data?.tp_CelularWhatsApp ?? false,
    nr_Contato: data?.nr_Contato ?? '',
    tp_ContatoWhatsApp: data?.tp_ContatoWhatsApp ?? false,
    tp_Status: data?.tp_Status ?? false,
  } satisfies schemaClienteRules;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<schemaClienteRules>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: zodResolver(schemaCliente, { async: true }, { mode: "async" }),
  });

  const onSubmit = React.useCallback(
    async (data: schemaClienteRules): Promise<void> => {
      try {

        let result = await authProvider.put('/Clientes/v1/Editar', data);
        if (result.status === 200) {
          toast.success(`Cliente Atualizado Com Sucesso!`);
          queryClient.removeQueries({ queryKey: ['ClientesEditar', id_Cliente], exact: true });
          navigate(paths.dashboard.cadastros.clientes.listar);
        } else {
          toast.error('Falha ao Atualizar Cliente');
        }
      } catch (err) {
        toast.error(err?.message);
        queryClient.removeQueries({ queryKey: ['ClientesEditar', id_Cliente], exact: true });
      }
    },
    []
  );

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
  React.useEffect(() => {
    setBlockUI(isSubmitting || isLoading || isFetching)
  }, [isSubmitting, isLoading, isFetching])
  return {
    Controller,
    watch,
    maskTelefone,
    maskCpfCnpj,
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
