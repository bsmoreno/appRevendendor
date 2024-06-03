import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Usuario } from '@/types/user';
import { Divider, IconButton, List, ListItem, ListItemText, unstable_useId } from '@mui/material';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { usuarioState } from './states/usuario-state';
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export interface UsuarioDialogProps {
    row?: Usuario
    usuario?: boolean
}

export default function UsuarioDialog({ row, usuario }: UsuarioDialogProps): React.JSX.Element {
    const [open, setOpen] = React.useState(usuario === undefined ? false : usuario);
    const [novoUsuario, setNovoUsuario] = useRecoilState(usuarioState)
    const resetNovoUsuario = useResetRecoilState(usuarioState)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetNovoUsuario();
    };
    // @ts-ignore
    const Itens = (js_Roles: string[]) => {
        let itens = [];
        for (let i = 0; i < Object.keys(js_Roles).length; i++) {
            // @ts-ignore
            itens.push(
                <ListItem key={i} disableGutters sx={{}}> 
                    <ListItemText prefix={i.toString()} primary={`${(i + 1).toString()} - ${Object.keys(js_Roles)[i].substring(1).replaceAll("/", " > ")} - ${Permissao(js_Roles[Object.keys(js_Roles)[i]])}`} />
                </ListItem>
            )
        }
        return itens;
    }
    // @ts-ignore
    const Permissao = (permissao: any) => {
        switch (permissao) {
            case 0:
                return "LEITURA";
            case 1:
                return "GRAVAR";
            case 2:
                return "ATUALIZAR";
            case 3:
                return "EXCLUIR";
            case 4:
                return "ADMIN";
            default:
                return "ERRO";
        }
    }
    return (
        <React.Fragment>
            {row !== undefined && usuario == undefined ?
                <IconButton onClick={handleClickOpen}>
                    <LockIcon />
                </IconButton>
                : <></>
            }
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description" title='Tipos de Acesso'>
                <DialogTitle>{row !== undefined && usuario == undefined ? "Níveis de Acesso" : "Novo Usuário"}</DialogTitle>
                <Divider />
                <DialogContent>
                    {row !== undefined && usuario == undefined ?
                        <List sx={{ width: '100%', bgcolor: 'background.paper', textAlign: 'center' }}>
                            {Itens(row.js_Roles as [])}
                        </List>
                        :
                        <List sx={{ width: '100%', bgcolor: 'background.paper', textAlign: 'center' }}>
                            <ListItem key={unstable_useId()} disableGutters sx={{}} >
                                <ListItemText prefix={''} primary={`Novo Usuário: ${row?.ds_Nome} - ${row?.ds_Sobrenome}`} />
                            </ListItem>
                            <ListItem key={unstable_useId()} disableGutters sx={{}} >
                                <ListItemText prefix={''} primary={`Senha: ${row?.ds_Password}`} />
                            </ListItem>
                        </List>
                    }

                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>Sair</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

