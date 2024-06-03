import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { paths } from "@/paths";
import { schemaCliente, schemaClienteRules, verificarEmail, verificarCpfCnpj } from "../schemas/schema-cliente";
import { useBlockUI } from "@/components/widgets/blockUi";

export const ClientesCriarFromHooks = () => {
    const navigate = useNavigate();

    const [openState, setBlockUI] = useBlockUI();
    const defaultValues = {
        cd_CpfCnpj: '000.000.000-00',
        ds_Nome: '',
        ds_Sobrenome: '',
        ds_Apelido: '',
        ds_Email: '',
        nr_Telefone: '',
        tp_TelefoneWhatsApp: false,
        nr_Celular: '',
        tp_CelularWhatsApp: false,
        nr_Contato: '',
        tp_ContatoWhatsApp: false,
        vl_Credito: 0
    } satisfies schemaClienteRules;
    const {
        control,
        handleSubmit,
        watch,
        trigger,
        setError,
        setValue,
        clearErrors,
        formState: { errors, isLoading, isValidating, isSubmitting },
    } = useForm<schemaClienteRules>({
        mode: 'onSubmit',
        reValidateMode: "onBlur",
        defaultValues,
        resolver: zodResolver(schemaCliente),
    });
    const onSubmit = React.useCallback(
        async (data: schemaClienteRules): Promise<void> => {
            try {
                let result = await authProvider.post('/Clientes/v1/Criar', data);
                if (result.status === 200) {
                    toast.success(`Clientes Cadastrado Com Sucesso!`);
                    navigate(paths.dashboard.cadastros.clientes.listar);
                }
                else {
                    toast.error(`Falha ao Criar Cliente`);
                }
            } catch (err) {
                toast.error('Something went wrong!');
            }
        },
        [navigate]
    )

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
        maskTelefone,
        maskCpfCnpj
    }
}