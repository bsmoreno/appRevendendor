import{t as x,r as i,j as t,y as M,z as R,a as d,A as z,T as y,D as k,aC as I,E as h,R as S,p as w,Z as n,aD as j,a0 as g,$ as f,H as A,B as P,S as v,a1 as T,a2 as E,c as H}from"./index-BmfGJE-Y.js";import{u as b,P as $}from"./produtos-detalhes-modal-DvggH0zk.js";import{C as F,w as B,P as L,D as N,F as O,H as G,d as V,a as C,b as W,S as K,c as a,R as Z}from"./dx.material.blue.dark.compact-BxJV-vKz.js";import{S as u}from"./Stack-BwF0Qp1t.js";import"./data-table-DsauHPQF.js";import"./TableHead-5HVq-qDc.js";import"./Checkbox-CDtHc1wJ.js";import"./SwitchBase-LEr907X7.js";import"./useToggle-BAApmVD4.js";import"./DialogContent-B52oVSVn.js";const q=()=>({customDataSource:new F({key:"id_Produto",load:async o=>{const s=await x.post("Produtos/v1/Tabela",o);if(s.status===200)return s.data},byKey:async o=>(await x.get("Produtos/v1/Buscar",{params:{id_Produto:o}})).data})}),J=new F({key:"id_Produto",async load(r){try{const o=await x.post("Produtos/v1/Tabela",r);if(o.status===200)return o.data}catch{throw new Error("Data Loading Error")}}});function Q({params:r}){const[o,s]=b(),p=i.useCallback(m=>{s(r.id_Produto)},[]);return t.jsxs(M,{children:[t.jsx(R,{children:t.jsx(d,{"aria-controls":"simple-menu","aria-haspopup":"true",children:t.jsx(B,{})})}),t.jsx(z,{disableScrollLock:!0,PaperProps:{sx:{minWidth:"200px",p:1}},anchorOrigin:{horizontal:"left",vertical:"top"},transformOrigin:{horizontal:"right",vertical:"top"},children:t.jsxs(u,{direction:"column",alignItems:"flex-start",children:[t.jsxs(u,{width:"100%",children:[t.jsx(y,{children:"Ações"}),t.jsx(k,{})]}),t.jsxs(u,{width:"100%",children:[t.jsx(d,{onClick:p,startIcon:t.jsx(I,{}),sx:{justifyContent:"flex-start",textAlign:"left","& .MuiButton-startIcon":{marginRight:1},width:"100%"},children:" Visualizar"},h()),t.jsx(d,{component:S,href:w.dashboard.cadastros.produtos.editar(r.id_Produto),startIcon:t.jsx(L,{}),sx:{justifyContent:"flex-start",textAlign:"left","& .MuiButton-startIcon":{marginRight:1},width:"100%"},children:" Editar"},h())]})]})})]})}function U(){q();const[r,o]=i.useState(!0),[s,p]=i.useState("full"),m=[5,10,"all"];i.useCallback(()=>s==="compact",[s]),i.useCallback(e=>{o(e)},[]);const _=i.useRef(null),D={style:"currency",currency:"BRL",precision:2};return t.jsxs(N,{dataSource:J,repaintChangesOnly:!0,allowColumnReordering:!0,columnAutoWidth:!0,columnResizingMode:"nextColumn",height:"100%",remoteOperations:!0,ref:_,children:[t.jsx(O,{visible:!0}),t.jsx(G,{visible:!0}),t.jsx(V,{enabled:!0}),t.jsx(C,{defaultPageSize:10,defaultPageIndex:0}),t.jsx(C,{defaultPageSize:10}),t.jsx(W,{visible:!0,allowedPageSizes:m,displayMode:s,showPageSizeSelector:r}),t.jsx(K,{columnRenderingMode:"virtual"}),t.jsx(a,{dataField:"nr_Produto",caption:"N° Produto",alignment:"center",allowFiltering:!1,width:"auto"}),t.jsx(a,{dataField:"ds_Produto",caption:"Nome"}),t.jsx(a,{dataField:"cd_Produto",caption:"Cod. Produto"}),t.jsx(a,{dataField:"cd_EAN",caption:"EAN"}),t.jsx(a,{dataField:"ds_Marca",caption:"Marca"}),t.jsx(a,{dataField:"ds_SubMarca",caption:"SubMarca"}),t.jsx(a,{dataField:"ds_Linha",caption:"Linha"}),t.jsx(a,{dataField:"ds_Classificacao",caption:"Classificação"}),t.jsx(a,{dataField:"ds_Caracteristica",caption:"Caracteristica"}),t.jsx(a,{dataField:"ds_Tipo",caption:"Tipo"}),t.jsx(a,{dataField:"tp_Kit",caption:"Status",cellRender:e=>{let l=e.value?n[200]:j[200],c=e.value?n[50]:j[50];return t.jsx(g,{sx:{backgroundColor:`${l}90`,color:c},label:e.value?"Sim":"Não",size:"small",variant:"soft"})}}),t.jsx(a,{dataField:"vl_Venda",caption:"R$ Venda",format:D}),t.jsx(a,{dataField:"tp_Status",caption:"Status",cellRender:e=>{let l=e.value?n[200]:f[200],c=e.value?n[50]:f[50];return t.jsx(g,{sx:{backgroundColor:`${l}90`,color:c},label:e.value?"Ativo":"Inativo",size:"small",variant:"soft"})}}),t.jsx(a,{dataField:"dt_Inclusao",caption:"Data Inclusão",dataType:"datetime",format:"dd/MM/yyyy HH:mm"}),t.jsx(a,{dataField:"dt_Atualizacao",caption:"Data Atualização",dataType:"datetime",format:"dd/MM/yyyy HH:mm"}),t.jsx(a,{caption:"Ações",alignment:"center",fixed:!0,width:"5%",fixedPosition:"right",cellComponent:({data:e})=>t.jsx(Q,{params:e.data})}),t.jsx(Z,{})]})}const X={title:`Gestão de Produtos | Dashboard | ${H.site.name}`};function lt(){return b(),t.jsxs(i.Fragment,{children:[t.jsx(A,{children:t.jsx("title",{children:X.title})}),t.jsx(P,{sx:{maxWidth:"var(--Content-maxWidth)",m:"var(--Content-margin)",p:"var(--Content-padding)",width:"var(--Content-width)"},children:t.jsxs(v,{spacing:4,children:[t.jsxs(v,{direction:{xs:"column",sm:"row"},spacing:3,sx:{alignItems:"flex-start"},children:[t.jsx(P,{sx:{flex:"1 1 auto"},children:t.jsx(y,{variant:"h4",children:"Gestão de Produtos"})}),t.jsx("div",{children:t.jsx(d,{component:S,href:w.dashboard.cadastros.produtos.criar,startIcon:t.jsx(T,{}),variant:"outlined",children:"Novo"})})]}),t.jsx(E,{children:t.jsx(U,{})})]})}),t.jsx($,{})]})}export{lt as Page};