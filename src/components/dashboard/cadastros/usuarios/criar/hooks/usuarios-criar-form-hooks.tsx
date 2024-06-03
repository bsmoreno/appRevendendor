import { Controller, useForm, useFormState } from "react-hook-form";
import { schemaUsuario, schemaUsuarioRules, verificarEmail } from "../schemas/schema-usuario";
import { valibotResolver } from "@hookform/resolvers/valibot";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { paths } from "@/paths";
import { useRecoilState, useResetRecoilState } from "recoil";
import { rotasDashboard } from '@/routes/dashboard'
import { usuarioState } from "../../states/usuario-state";
import { rotasState } from "../../states/rotas-state";
import { useBlockUI } from "@/components/widgets/blockUi";

export interface Rotas {
    id: string,
    origem: string,
    pasta: string,
    pagina: string,
    status: boolean,
    permissoes: [boolean, number, string][]
}
export const UsuarioCriarFrom = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = React.useState(false);
    const [novoUsuario, setNovoUsuario] = useRecoilState(usuarioState);
    const [rotas, setRotas] = useRecoilState(rotasState)
    const resetNovoUsuario = useResetRecoilState(usuarioState);
    const resetRotas = useResetRecoilState(rotasState); 

    const [openState, setBlockUI] = useBlockUI();

    React.useEffect(() => {
        const novasRotas = rotasDashboard.map(criarRotasDeString);
        setRotas(novasRotas)
    }, []);


    const defaultValues = {
        ds_Nome: '',
        ds_Sobrenome: '',
        ds_Email: '',
        nr_Celular: '',
        tp_Admin: false,
        tp_Status: false,
        js_Roles: [],
    } satisfies schemaUsuarioRules;
    const {
        control,
        handleSubmit,
        register,
        trigger,
        setError,
        setValue,
        clearErrors,
        //formState: { errors, isLoading, isValidating, isDirty, isSubmitting, touchedFields, submitCount },
        formState: { errors, isLoading, isValidating, isSubmitting },
    } = useForm<schemaUsuarioRules>({
        mode: 'onSubmit',
        reValidateMode: "onSubmit",
        defaultValues: defaultValues, resolver: valibotResolver(schemaUsuario),
    });
    const onSubmit = React.useCallback(
        async (data: schemaUsuarioRules): Promise<void> => {
            try {
                if (data.js_Roles.length == 0) {
                    toast.error('Selecione ao menos uma permissão para prosseguir');
                    return;
                }
                let result = await authProvider.post('/Usuarios/v1/Criar', data);
                setNovoUsuario({ usuario: result.data, novoUsuario: true });
                if (result.status === 200) {
                    toast.success(`Usuario Cadastrado Com Sucesso! - Senha: ${result.data.ds_Password}`);
                    setRotas([]);
                    setNovoUsuario({ usuario: null, novoUsuario: false })
                    navigate(paths.dashboard.cadastros.usuarios.listar);
                }
                else {
                    toast.error(`Falha ao Criar Usuário`);
                }
                // Make API request
            } catch (err) {
                //logger.error(err);
                toast.error('Something went wrong!');
            }
        },
        [navigate]
    )
    const handleEmailBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
        //setIsEmailChecking(true); // Define isLoading como true
        try {
            const result = await verificarEmail(event.target.value);
            if (!result) {
                setError('ds_Email', { type: 'custom', message: 'E-mail já cadastrado' });
            } else {
                clearErrors('ds_Email');
            }
        } catch (error) {
            setError('ds_Email', { type: 'custom', message: error.message });
            // tratamento de erro
        }
        //  finally {
        //   setIsEmailChecking(false); // Define isLoading como false após a verificação
        // }
    };
    const criarRotasDeString = (rota: string): Rotas => {
        //Remove o primeiro '/' se presente e faz o split
        const partes = rota.startsWith('/') ? rota.substring(1).split('/') : rota.split('/');

        //Ajusta os campos com base na quantidade de partes
        const origem = partes.length == 2 ? partes[0] : partes.length == 3 ? partes[1] : partes.length == 4 ? partes[1] : partes[1];
        const pasta = partes.length == 2 ? partes[1] : partes.length == 3 ? partes[2] : partes.length == 4 ? partes[2] : partes[3];
        partes.length > 2 ? partes[3] : partes[2];
        const pagina = partes.length == 2 ? partes[1] : partes.length == 3 ? partes[2] : partes.length == 4 ? partes[3] : partes[3];
        const permissoes: [boolean, number, string][] = [
            [false, 0, "leitura"],
            [false, 1, "gravar"],
            [false, 2, "atualizar"],
            [false, 3, "excluir"],
            [false, 4, "admin"],
        ];

        //Cria o objeto Rotas
        const rotas: Rotas = {
            id: rota,
            origem: origem,
            pasta: pasta,
            pagina: pagina,
            status: false,
            permissoes: permissoes
        };

        return rotas;
    };
    
    React.useEffect(() => {
        setBlockUI(isSubmitting || isLoading)
    }, [isSubmitting, isLoading])
    return {
        Controller,
        register,
        handleSubmit,
        handleEmailBlur,
        onSubmit,
        setError,
        setValue,
        clearErrors,
        trigger,
        control,
        errors,
        defaultValues,
        isLoading,
        isValidating,
        isSubmitting,
        resetNovoUsuario,
        resetRotas, 
        novoUsuario,
        setNovoUsuario,
        rotas,
        setRotas,
        navigate,
        isChecking, 
        setIsChecking
    }
}