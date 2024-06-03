import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { authProvider } from "@/lib/provider";
import { schemaCriarTipoRules, schemaCriarTipos } from "../schemas/schema-tipo";
import { useToggle } from "react-use";
export interface TiposCriarHooksProps {
  tpNovo: boolean
  handleCloseModal: () => void
}
export const TiposCriarHooks = ({ tpNovo, handleCloseModal }: TiposCriarHooksProps) => {
  const [open, setOpen] = useToggle(tpNovo);

  React.useEffect(() => {
    setOpen(open)
  }, [open]);



  const defaultValues = {
    ds_Tipo: '',
  } satisfies schemaCriarTipoRules;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<schemaCriarTipoRules>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: zodResolver(schemaCriarTipos),
  });

  const onSubmit = React.useCallback(
    async (data: schemaCriarTipoRules): Promise<void> => {
      try {
        let result = await authProvider.post('Ferramentas/Tipos/v1/Criar', data);
        if (result.status === 200) {
          toast.success(`Tipo Criado Com Sucesso!`);
          setOpen(false);
        } else {
          toast.error('Falha ao Criar Tipo');
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    },
    []
  );
  const handleClose = (event: any, reason?: any) => {
    if (reason === 'backdropClick') {
      setOpen(true);
      return
    }
    setOpen(false);
    handleCloseModal();
  }


  return {
    Controller,
    handleSubmit,
    handleClose,
    onSubmit,
    errors,
    control,
    isSubmitting,
    open,
    setOpen
  };
};
