import React, { forwardRef, useState, useEffect } from "react";
import axios from 'axios';
import { Autocomplete, TextField, CircularProgress, styled, lighten, darken } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import unidecode from 'unidecode';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { useBlockUI } from "../blockUi";

type CidadeOption = {
    cidade: string;
    uf: string;
};

type AutoCompleteCidadesProps = Omit<AutocompleteProps<CidadeOption, false, false, false>, 'renderInput'> & {
    value: CidadeOption | [];
    onChange: (event: React.SyntheticEvent, newValue: CidadeOption | null) => void;
};

const AutoCompleteCidades = forwardRef<HTMLDivElement, AutoCompleteCidadesProps>(function AutoCompleteCidades(props, ref) {
    const { value, onChange: onChangeProps, ...otherProps } = props;
    const [inputValue, setInputValue] = useState('');
    const [_, setBlockUI] = useBlockUI();

    const fetchCidades = async () => {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        const cidades = response.data.map((cidade: any) => ({
            cidade: cidade.nome?.toUpperCase(),
            uf: cidade.microrregiao.mesorregiao.UF.sigla?.toUpperCase()
        }));
        return cidades.sort((a: CidadeOption, b: CidadeOption) => {
            if (a.uf < b.uf) return -1;
            if (a.uf > b.uf) return 1;
            if (a.cidade < b.cidade) return -1;
            if (a.cidade > b.cidade) return 1;
            return 0;
        });
    };

    const { data: cidades = [], isLoading } = useQuery({
        queryKey: ["cidadesIBGE"],
        queryFn: fetchCidades,
        staleTime: 600 * 1000,
        enabled: true
    });

    useEffect(() => {
        setBlockUI(isLoading);
    }, [isLoading]);

    const GroupHeader = styled('div')(({ theme }) => ({
        position: 'sticky',
        top: '-8px',
        padding: '4px 10px',
        color: theme.palette.primary.main,
        backgroundColor:
            theme.palette.mode === 'light'
                ? lighten(theme.palette.primary.light, 0.85)
                : darken(theme.palette.primary.main, 0.8),
    }));

    const GroupItems = styled('ul')({
        padding: 0,
    });

    return (
        <Autocomplete
            {...otherProps}
            options={cidades ? cidades : []}
            value={value ?? value}
            loading={isLoading}
            size="small"
            groupBy={(option) => option.uf}
            getOptionLabel={(option) => option?.cidade}
            onChange={(event, newValue) => onChangeProps(event, newValue)}
            isOptionEqualToValue={(option, value) => option.cidade === value?.cidade && option.uf === value?.uf}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{ mt: 1 }}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            renderGroup={(params) => (
                <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
        />
    );
});

export default AutoCompleteCidades;