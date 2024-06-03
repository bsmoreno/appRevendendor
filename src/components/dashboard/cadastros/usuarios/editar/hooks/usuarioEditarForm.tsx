import { Controller, useFieldArray, useForm, useFormState } from "react-hook-form";
import { schemaUsuario, schemaUsuarioRules } from "../schemas/schemaUsuario";
import { valibotResolver } from "@hookform/resolvers/valibot";
import React, { useState } from "react";
import { toast } from "@/components/core/toaster";
import { useNavigate } from "react-router-dom";
import { authProvider } from "@/lib/provider";
import { paths } from "@/paths";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { rotasDashboard } from '@/routes/dashboard';
import { usuarioState } from "../../states/usuario-state";
import { rotasState } from "../../states/rotas-state";
import { usuarioEditarState } from "../../states/usuario-editar-state";
import { safeParse, string, uuid } from "valibot";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useBlockUI } from "@/components/widgets/blockUi";

export interface Rotas {
  id: string,
  origem: string,
  pasta: string,
  pagina: string,
  status: boolean,
  permissoes: [boolean, number, string][]
}

export const UsuarioEditarFrom = (id_Usuario: string) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = React.useState(false);
  const [novoUsuario, setNovoUsuario] = useRecoilState(usuarioState);
  const [rotas, setRotas] = useRecoilState(rotasState);
  const [usuario, setUsuario] = useRecoilState(usuarioEditarState);
  const resetNovoUsuario = useResetRecoilState(usuarioState);
  const resetRotas = useResetRecoilState(rotasState);
  const resetUsuarios = useResetRecoilState(usuarioEditarState);
  const queryClient = useQueryClient();

  const [openState, setBlockUI] = useBlockUI();

  React.useEffect(() => {
    const uudiValid = safeParse(string([uuid()]), id_Usuario);
    if (id_Usuario === undefined || !uudiValid.success) {
      toast.error("Id de Usuário Inválido");
      queryClient.removeQueries({ queryKey: ['UsuariosEditar', id_Usuario], exact: true });
      navigate(paths.dashboard.cadastros.usuarios.listar);
      return;
    }

    // const cachedData = queryClient.getQueryData(['UsuariosEditar', id_Usuario]);
    // if (cachedData) {
    //   setUsuario(cachedData as );
    // }
  }, [id_Usuario]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['UsuariosEditar', id_Usuario],
    queryFn: async () => {
      try {
        const result = await authProvider.get(`Usuarios/v1/Buscar`, {
          params: {
            id_Usuario
          }
        });
        if (result.status === 200) {
          setUsuario(result.data);
          return result.data;
        } else {
          toast.error("Usuário não encontrado");
          queryClient.removeQueries({ queryKey: ['UsuariosEditar', id_Usuario], exact: true });
          resetNovoUsuario();
          resetRotas();
          resetUsuarios();
          navigate(paths.dashboard.cadastros.usuarios.listar);
          return null;
        }
      } catch (err) {
        toast.error("Erro ao buscar usuário");
        queryClient.removeQueries({ queryKey: ['UsuariosEditar', id_Usuario], exact: true });
        resetNovoUsuario();
        resetRotas();
        resetUsuarios();
        navigate(paths.dashboard.cadastros.usuarios.listar);
        return null;
      }
    },
    enabled: !!id_Usuario,
    staleTime: 60 * 1000,
  });

  React.useEffect(() => {
    if (isLoading) {

      reset({
        id_Usuario: '',
        ds_Nome: '',
        ds_Sobrenome: '',
        nr_Celular: '',
        ds_Email: '',
        tp_Admin: false,
        tp_Status: false,
        js_Roles: []
      });
    }
  }, [isLoading])
  const defaultValues = {
    id_Usuario: '',
    ds_Nome: '',
    ds_Sobrenome: '',
    nr_Celular: '',
    ds_Email: '',
    tp_Admin: false,
    tp_Status: false,
    js_Roles: [],
  } satisfies schemaUsuarioRules;

  React.useEffect(() => {
    if (usuario === undefined) return;
    const novasRotas = rotasDashboard.map(criarRotasDeString);
    setRotas(novasRotas);
  }, [usuario]);

  React.useEffect(() => {
    setIsChecking(true);
    if (usuario === undefined && usuario === undefined) return;
    let js_Roles = [];

    for (let i = 0; i < rotas.length; i++) {
      var rota = rotas[i];
      if (Object.keys(usuario.js_Roles).includes(rotas[i].id)) {
        js_Roles.push({ type: `${rota.id}_${usuario.js_Roles[rotas[i].id]}` });
      } else {
        js_Roles.push({ type: `${rota.id}_${-1}` });
      }
    }
    reset({
      id_Usuario: usuario?.id_Usuario,
      ds_Nome: usuario?.ds_Nome,
      ds_Sobrenome: usuario?.ds_Sobrenome,
      nr_Celular: usuario?.nr_Celular.length == 13 ? usuario?.nr_Celular.substring(2) : '',
      ds_Email: usuario?.ds_Email,
      tp_Admin: usuario?.tp_Admin,
      tp_Status: usuario?.tp_Status,
      js_Roles: js_Roles
    });

    setIsChecking(false);
  }, [rotas, usuario]);

  const {
    control,
    handleSubmit,
    register,
    trigger,
    setError,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors, isValidating, isSubmitting },
  } = useForm<schemaUsuarioRules>({
    mode: 'onSubmit',
    reValidateMode: "onSubmit",
    defaultValues,
    resolver: valibotResolver(schemaUsuario),
  });

  const onSubmit = React.useCallback(
    async (data: schemaUsuarioRules): Promise<void> => {
      try {
        if (data.js_Roles.length == 0) {
          toast.error('Selecione ao menos uma permissão para prosseguir');
          return;
        }
        let result = await authProvider.put('/Usuarios/v1/Editar', data);
        if (result.status === 200) {
          toast.success(`Usuario Atualizado Com Sucesso!`);
          resetNovoUsuario();
          resetRotas();
          resetUsuarios();
          navigate(paths.dashboard.cadastros.usuarios.listar);
        } else {
          toast.error('Falha ao Atualizar Usuário');
        }
      } catch (err) {
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

  const criarRotasDeString = (rota: string): Rotas => {
    const partes = rota.startsWith('/') ? rota.substring(1).split('/') : rota.split('/');

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
    setBlockUI(isSubmitting || isLoading || isFetching || isChecking)
  }, [isSubmitting, isLoading, isFetching, isChecking])
  return {
    Controller,
    register,
    handleSubmit,
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
    resetUsuarios,
    novoUsuario,
    setNovoUsuario,
    rotas,
    setRotas,
    usuario,
    setUsuario,
    navigate,
    isChecking,
    setIsChecking,
    isFetching
  };
};
