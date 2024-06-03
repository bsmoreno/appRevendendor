import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { authProvider } from "@/lib/provider";
import * as z from 'zod';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { schemaEditarTipoRules, schemaTipos } from "../schemas/schema-tipo";
import { Tipos } from "@/types/ferramentas/tipo";
import { useToggle } from "react-use";
export interface TiposModalHooksProps {
  dsTipo: string
  handleCloseModal: () => void
}
export const TiposEditarHooks = ({ dsTipo, handleCloseModal }: TiposModalHooksProps) => {
  const [tipo, setTipo] = React.useState<schemaEditarTipoRules>();
  const [open, setOpen] = useToggle(false);
  const [tipoEditar, setTipoEditar] = React.useState<string>('')
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (dsTipo) {
      setOpen(true);
      setTipoEditar(dsTipo)
    }
  }, [dsTipo, setOpen]);


  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['TiposEditar', tipoEditar],
    queryFn: async () => {
      try {
        const result = await authProvider.get(`Ferramentas/Tipos/v1/Buscar`, { params: { ds_Tipo: tipoEditar } });
        if (result.status === 200) {
          setTipo(result.data);
          reset(result.data);
          setOpen(true);
          return result.data;
        } else {
          toast.error("Usuário não encontrado");
          queryClient.removeQueries({ queryKey: ['TiposEditar', tipoEditar], exact: true });
          setTipoEditar('');
          setOpen(false);
          throw new Error('Falha ao Carregar Tipo')
        }
      } catch (err: any) {
        toast.error("Erro ao buscar usuário");
        queryClient.removeQueries({ queryKey: ['TiposEditar', tipoEditar], exact: true });
        setTipoEditar('');
        setOpen(false);
        throw new Error(err.message)
      }
    },
    enabled: tipoEditar !== ''
  });

  const defaultValues = {
    id_Tipo: data?.id_Tipo ?? '',
    ds_Tipo: data?.ds_Tipo ?? '',
    js_Tipo: data?.js_Tipo ?? [],
  } satisfies schemaEditarTipoRules;

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    getFieldState,
    setError,
    setFocus,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<schemaEditarTipoRules>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: zodResolver(schemaTipos),
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "js_Tipo",
  });

  const onSubmit = React.useCallback(
    async (data: schemaEditarTipoRules): Promise<void> => {
      try {
        let result = await authProvider.put('Ferramentas/Tipos/v1/Editar', data);
        if (result.status === 200) {
          toast.success(`Tipo Atualizado Com Sucesso!`);
          queryClient.removeQueries({ queryKey: ['TiposEditar', tipoEditar], exact: true });
          handleClose(null, null);
          setOpen(false);
          setTipoEditar('');
        } else {
          toast.error('Falha ao Atualizar Tipo');
        }
      } catch (err: any) {
        toast.error(err?.message);
        setOpen(false);
        setTipoEditar('');
        handleClose(null, null);
        queryClient.removeQueries({ queryKey: ['TiposEditar', tipoEditar], exact: true });
      }
    },
    []
  );
  const handleClose = (event: any, reason?: any) => {
    if (reason === 'backdropClick') {
      setOpen(true);
      return
    }
    queryClient.removeQueries({ queryKey: ['TiposEditar', tipoEditar], exact: true });
    handleCloseModal();
    setOpen(false);
    setTipoEditar('');
  }


  return {
    Controller,
    handleSubmit,
    handleClose,
    onSubmit,
    watch,
    getValues,
    getFieldState,
    setError,
    setFocus,
    setValue,
    errors,
    control,
    isError,
    isSubmitting,
    isFetching,
    isLoading,
    open,
    setOpen,
    tipo,
    fields, append, prepend, remove, swap, move, insert
  };
};
