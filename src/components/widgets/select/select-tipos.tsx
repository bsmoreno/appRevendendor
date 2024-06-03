import React, { forwardRef } from "react";
import { authProvider } from "@/lib/provider";
import { Tipo } from "@/types/ferramentas/tipo";
import { Select, MenuItem, Skeleton, SelectProps } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Option } from "@/components/core/option";
import { v4 as uuidV4 } from 'uuid';
import { useAsync, useToggle } from "react-use";

export type SelectTiposProps = {
    dsTipo: string;
    placeholder?: string;
    updateFlag: number;
} & SelectProps

const SelectTipos = forwardRef(function SelectTipos({ dsTipo, placeholder = "Selecione um tipo", updateFlag, ...props }: SelectTiposProps, ref: React.Ref<HTMLDivElement>): React.JSX.Element {

    const queryClient = useQueryClient();
    const [state, setState] = useToggle(false);
    const fetchTipos = async ({ queryKey: [tipo] }: any) => {
        const result = await authProvider.get(`Ferramentas/Tipos/v1/Listar`, {
            params: { ds_Tipo: tipo }
        });
        if (result.status === 200) {
            return result.data as Tipo[];
        } else {
            return [] as Tipo[];
        }
    };
    useAsync(async () => {
        const result = await queryClient.invalidateQueries();
        setState(true);
    }, [queryClient]);
    const { data: options, isLoading } = useQuery({
        queryKey: [dsTipo, updateFlag],
        queryFn: fetchTipos,
        enabled: dsTipo !== '' && state,
        staleTime: 0 // Cache inválido para garantir atualização
    });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        //setValue(event.target.value as string | number);
        console.log(event);
    };
    if (isLoading) {
        return <Skeleton variant="rounded" width={'100%'} height={40} />;
    } else {
        return (
            <Select ref={ref}
                displayEmpty fullWidth
                {...props}>
                <Option key={uuidV4()} value="">
                    {placeholder}
                </Option>
                {options?.map((t: Tipo) => (
                    <Option key={t.id} value={t.id}>
                        {t.text}
                    </Option>
                ))}
            </Select>
        );
    }
});

export default SelectTipos;
