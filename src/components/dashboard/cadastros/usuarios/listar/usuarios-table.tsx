'use client';

import * as React from 'react';
import Chip from '@mui/material/Chip';
import { PatternFormat } from 'react-number-format';
import { red, green } from '@mui/material/colors';
import UsuarioDialog from '../usuarios-dialog';
import { usuarioState } from '../states/usuario-state';
import { useRecoilValue } from 'recoil';
import { customStore } from './hooks/customStore';
import dayjs from 'dayjs';
import DataGrid, {
  Column,
  DataGridTypes,
  FilterRow,
  HeaderFilter,
  LoadPanel,
  Pager,
  Paging,
  RemoteOperations,
  Scrolling,
  Button as DataGridButton
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.blue.dark.compact.css';
import { UsuariosMenuTable } from './usuarios-menu-table';
import { UsuariosRemover } from '../usuarios-remover';
import { UsuariosLogsAcesso } from '../usuarios-logs-acesso';
import { UsuariosTrocarSenha } from '../usuarios-trocar-senha';
import { usePopup } from '@/hooks/use-popup';
import { PopupProvider } from '@/contexts/popup-context';
import { DropdownContext } from '@/components/core/dropdown/dropdown-context';


export function UsuariosTable(): React.JSX.Element {
  const novoUsuario = useRecoilValue(usuarioState);
  const { customDataSource } = customStore();
  const [showPageSizeSelector, setShowPageSizeSelector] = React.useState(true);
  const [displayMode, setDisplayMode] = React.useState<DataGridTypes.PagerDisplayMode>('full');
  const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 'all'];
  const isCompactMode = React.useCallback(() => displayMode === 'compact', [displayMode]);
  const showPageSizeSelectorChange = React.useCallback((value: boolean) => { setShowPageSizeSelector(value); }, []);
  const dataGrid = React.useRef(null);

  // Em algum lugar no seu código, quando você precisar recarregar os dados manualmente

  return (
    <PopupProvider> 
      {/* {<UsuariosRemover idUsuario={idUsuarioRemover} setModalRemover={setUsuarioRemover} /> } */}
      <UsuarioDialog row={novoUsuario.usuario} usuario={novoUsuario.novoUsuario} />
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
        <Paging defaultPageSize={5} defaultPageIndex={0} />
        <Paging defaultPageSize={5} />
        <Pager visible={true} allowedPageSizes={allowedPageSizes} displayMode={displayMode}
          showPageSizeSelector={showPageSizeSelector} />
        <Scrolling columnRenderingMode="virtual" />
        <Column dataField="nr_Usuario" caption='N° Usuário' alignment='center' allowFiltering={false} width={50} />
        <Column dataField="ds_Nome" caption='Nome' />
        <Column dataField="ds_Sobrenome" caption='Sobrenome' />
        <Column dataField="ds_Email" caption='E-mail' />
        <Column dataField="nr_Celular" caption='Celular'
          cellRender={(data) => {
            if (data.value.length == 13) {
              return <PatternFormat format="+55 (##) #.####-####" value={(data.value.length == 13 ? data.value.substring(2) : undefined)} allowEmptyFormatting={true} displayType='text' />;
            }
            else {
              return <></>
            }
          }} />

        <Column dataField="tp_Status" caption='Status'

          cellRender={(data) => {
            let bgColor = (data.value ? green[200] : red[200]);
            let textColor = (data.value ? green[50] : red[50]);
            return <Chip sx={{ backgroundColor: `${bgColor}90`, color: textColor }} label={(data.value ? 'Sim' : 'Não')} size="small" variant="soft" />
          }}
        />
        <Column dataField="tp_Admin" caption='Admin'
          cellRender={(data) => {
            let bgColor = (data.value ? green[200] : red[200]);
            let textColor = (data.value ? green[50] : red[50]);
            return <Chip sx={{ backgroundColor: `${bgColor}90`, color: textColor }} label={(data.value ? 'Sim' : 'Não')} size="small" variant="soft" />
          }}
        />
        <Column dataField="dt_Inclusao" caption='Data Inclusão' dataType='datetime' format={'dd/MM/yyyy HH:mm'} />
        <Column dataField="dt_Atualizacao" caption='Data Atualização' dataType='datetime' format={'dd/MM/yyyy HH:mm'} />
        <Column dataField="js_Login" caption='Ultimo Acesso' allowFiltering={false} allowSorting={false} cellRender={({ data }) => {
          const acesso = data.js_Login.map((dateString: string) => new Date(dateString))?.sort((a: Date, b: Date) => {
            return new Date(b).getTime() - new Date(a).getTime();
          })
            ?.slice(0, 1);
          //let acessos = Date[]<data.row.js_Login>
          if (dayjs(acesso).isValid())
            return (<>{dayjs(acesso).format("DD/MM/YYYY HH:mm:ss")}</>)
          else
            (<></>)
        }} />
        <Column
          caption='Ações'
          alignment='center'
          fixed={true}
          fixedPosition='right'
          allowFixing={true}
          allowFiltering={false} 
          allowSorting={false} 
          cellComponent={(data) => {
            const [uRemover, setURemover] = React.useState('');
            const [uTrocarSenha, setUTrocarSenha] = React.useState('');
            const [modalLogs, setModalLogs] = React.useState(false); 
            const popup = usePopup(data.data.key);
            return (
              <>
                <UsuariosMenuTable params={data.data} setModalRemover={setURemover} setModalLogs={setModalLogs} setModalTrocarSenha={setUTrocarSenha} />
                <UsuariosRemover idUsuario={uRemover} setModalRemover={setURemover} dataGrid={dataGrid} />
                <UsuariosLogsAcesso js_Login={data.data.row.data.js_Login} setModalLogs={setModalLogs} modalLogs={modalLogs} />
                <UsuariosTrocarSenha  idUsuario={uTrocarSenha} setModalTrocarSenha={setUTrocarSenha} dataGrid={dataGrid} />
              </>
            )
          }}
        >
        </Column>
        <RemoteOperations />
      </DataGrid>

    </PopupProvider>
  );
}
