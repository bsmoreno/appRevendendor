'use client';

import * as React from 'react';
import Chip from '@mui/material/Chip';
import { red, green, blue } from '@mui/material/colors';
import { customStore, customStoreV2 } from './hooks/customStore';
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
    ColumnFixing,
    Selection
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.blue.dark.compact.css';
import { conformToMask } from 'react-text-mask';
import { Typography } from '@mui/material';
import { WhatsappLogo } from '@phosphor-icons/react';
import { ProdutosMenuTable } from './produtos-menu-table';
export function ProdutosTable(): React.JSX.Element {
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
            dataSource={customStoreV2}
            repaintChangesOnly={true}
            allowColumnReordering={true}
            columnAutoWidth={true}
            columnResizingMode='nextColumn'
            height={'100%'}
            remoteOperations={true}
            ref={dataGrid}
        >
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <ColumnFixing enabled={true} />
            <Paging defaultPageSize={10} defaultPageIndex={0} />
            <Paging defaultPageSize={10} />
            <Pager visible={true} allowedPageSizes={allowedPageSizes} displayMode={displayMode}
                showPageSizeSelector={showPageSizeSelector} />
            <Scrolling columnRenderingMode="virtual" />
            <Column dataField="nr_Produto" caption='N° Produto' alignment='center' allowFiltering={false} width={'auto'} />
            <Column dataField="ds_Produto" caption='Nome' />
            <Column dataField="cd_Produto" caption='Cod. Produto' />
            <Column dataField="cd_EAN" caption='EAN' />
            <Column dataField="ds_Marca" caption='Marca' />
            <Column dataField="ds_SubMarca" caption='SubMarca' />
            <Column dataField="ds_Linha" caption='Linha' />
            <Column dataField="ds_Classificacao" caption='Classificação' />
            <Column dataField="ds_Caracteristica" caption='Caracteristica' />
            <Column dataField="ds_Tipo" caption='Tipo' />
            <Column dataField="tp_Kit" caption='Status'
                cellRender={(data) => {
                    let bgColor = (data.value ? green[200] : blue[200]);
                    let textColor = (data.value ? green[50] : blue[50]);
                    return <Chip sx={{ backgroundColor: `${bgColor}90`, color: textColor }} label={(data.value ? 'Sim' : 'Não')} size="small" variant="soft" />
                }}
            />
            <Column dataField="vl_Venda" caption='R$ Venda' format={formatMoeda} />
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
                cellComponent={({data}) => { 
                    return (<ProdutosMenuTable params={data.data} />)
                }}
            >
            </Column>
            <RemoteOperations />
        </DataGrid>
    );
}
