'use client';

import * as React from 'react';
import Chip from '@mui/material/Chip';
import { red, green } from '@mui/material/colors';
import { customStore } from './hooks/customStore';
import dayjs from 'dayjs';
import DataGrid, {
    Column,
    DataGridTypes,
    FilterRow,
    HeaderFilter,
    Pager,
    Paging,
    RemoteOperations,
    Scrolling,
    ColumnFixing
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.blue.dark.compact.css';
import { conformToMask } from 'react-text-mask';
import {  Typography } from '@mui/material';
import { ClientesMenuTable } from './clientes-menu-table'; 
import { WhatsappLogo } from '@phosphor-icons/react';

const getMaskCpfCnpj = (value: string) => {
    if (value.length === 11) {
        return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    } else if (value.length === 14) {
        return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
    return [];
};

const getMaskTelefone = (value: string) => {
    const input = value.replace(/\D/g, '');
    if (input.length > 10) {
        return ['+', '5', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, '.', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    } else {
        return ['+', '5', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
    return [];
};

export function ClientesTable(): React.JSX.Element {
    const { customDataSource } = customStore();
    const [showPageSizeSelector, setShowPageSizeSelector] = React.useState(true);
    const [displayMode, setDisplayMode] = React.useState<DataGridTypes.PagerDisplayMode>('full');
    const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 'all'];
    const isCompactMode = React.useCallback(() => displayMode === 'compact', [displayMode]);
    const showPageSizeSelectorChange = React.useCallback((value: boolean) => { setShowPageSizeSelector(value); }, []);
    const dataGrid = React.useRef(null);

    const formatMoeda = { style: 'currency', currency: 'BRL', precision: 2 };
    return (
        // <React.Fragment>

        <DataGrid
            dataSource={customDataSource}
            allowColumnReordering={true}
            columnAutoWidth={true}
            columnResizingMode='nextColumn'
            height={'100%'}
            remoteOperations={{ paging: true, filtering: true, sorting: true, grouping: false }}
            ref={dataGrid}
        >
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <ColumnFixing enabled={true} />
            <Paging defaultPageSize={5} defaultPageIndex={0} />
            <Paging defaultPageSize={5} />
            <Pager visible={true} allowedPageSizes={allowedPageSizes} displayMode={displayMode}
                showPageSizeSelector={showPageSizeSelector} />
            <Scrolling columnRenderingMode="virtual" />
            <Column dataField="nr_Cliente" caption='N° Usuário' alignment='center' allowFiltering={false} width={50} />
            <Column dataField="cd_CpfCnpj" caption='CPF/CNPJ' cellRender={({ data, row }) => {
                var cpfCnpj = conformToMask(
                    data.cd_CpfCnpj,
                    getMaskCpfCnpj(data.cd_CpfCnpj),
                    { guide: false }
                )
                return (
                    <Typography variant="overline" >
                        {cpfCnpj.conformedValue}
                    </Typography>
                )
            }} />
            <Column dataField="ds_Nome" caption='Nome' />
            <Column dataField="ds_Sobrenome" caption='Sobrenome' />
            <Column dataField="ds_Apelido" caption='Apelido' />
            <Column dataField="ds_Email" caption='E-mail' />
            <Column dataField="nr_Telefone" caption='Telefone'
                cellRender={({ data, row }) => {
                    let value = data.nr_Telefone;
                    var nrTelefone = conformToMask(
                        value,
                        getMaskTelefone(value),
                        { guide: false }
                    )
                    return (
                        <Typography variant="overline" >
                            {nrTelefone.conformedValue} {data.tp_TelefoneWhatsApp === true ? <WhatsappLogo color='green' /> : <></>}
                        </Typography>
                    )
                }}
            />
            <Column dataField="nr_Celular" caption='Celular'
                cellRender={({ data, row }) => {
                    let value = data.nr_Celular;
                    var nrTelefone = conformToMask(
                        value,
                        getMaskTelefone(value),
                        { guide: false }
                    )
                    return (
                        <Typography variant="overline" >
                            {nrTelefone.conformedValue} {data.tp_CelularWhatsApp === true ? <WhatsappLogo color='green' /> : <></>}
                        </Typography>
                    )
                }}
            />
            <Column dataField="nr_Contato" caption='Contato'
                cellRender={({ data, row }) => {
                    let value = data.nr_Contato;
                    var nrTelefone = conformToMask(
                        value,
                        getMaskTelefone(value),
                        { guide: false }
                    )
                    return (
                        <Typography variant="overline">
                            {nrTelefone.conformedValue} {data.tp_ContatoWhatsApp === true ? <WhatsappLogo color='green' /> : <></>}
                        </Typography>
                    )
                }}
            />
            <Column dataField="vl_Credito" caption='R$ Crédito' format={formatMoeda} />
            <Column dataField="tp_Status" caption='Status'
                cellRender={(data) => {
                    let bgColor = (data.value ? green[200] : red[200]);
                    let textColor = (data.value ? green[50] : red[50]);
                    return <Chip sx={{ backgroundColor: `${bgColor}90`, color: textColor }} label={(data.value ? 'Ativo' : 'Inativo')} size="small" variant="soft" />
                }}
            />
            <Column dataField="dt_Inclusao" caption='Data Inclusão' dataType='datetime' format={'dd/MM/yyyy HH:mm'} />
            <Column dataField="dt_Atualizacao" caption='Data Atualização' dataType='datetime' format={'dd/MM/yyyy HH:mm'} />

            <Column
                caption='Ações'
                alignment='center'
                fixed={true}
                width={'5%'}
                fixedPosition='right'
                cellRender={(data) => {
                    return (<ClientesMenuTable params={data.data} />)

                }}
            >
            </Column>
            <RemoteOperations />
        </DataGrid>
    );
}
