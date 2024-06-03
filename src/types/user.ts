// export interface User {
//   id: string;
//   name?: string;
//   avatar?: string;
//   email?: string;

//   [key: string]: unknown;
// }
export interface Usuario { 
  id_Usuario: string;  
  nr_Usuario: number; 
  ds_Nome: string;
  ds_Sobrenome: string;
  ds_Email: string;
  ds_Password: string;
  nr_Celular: string;
  js_Roles?: string[];  
  tp_Admin: boolean;
  tp_Status: boolean;
  dt_Inclusao: Date;  
  id_UsuarioInclusao: string;
  dt_Atualizacao?: Date; 
  id_UsuarioAtualizacao?: string;
  tp_TrocarSenha: boolean
}