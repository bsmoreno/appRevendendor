import React, { useState, useEffect } from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { Password as PasswordIcon } from '@phosphor-icons/react';
import { UserMinus as UserMinusIcon } from '@phosphor-icons/react';
import { Calendar as CalendarIcon } from '@phosphor-icons/react';
import { usePathname } from '@/hooks/use-pathname';
import { useUser } from '@/hooks/use-user';
import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from "@/components/core/dropdown/dropdown-popover";
import { DropdownTrigger } from "@/components/core/dropdown/dropdown-trigger";
import { RouterLink } from "@/components/core/link";
import { paths } from "@/paths";
import { DotsThreeOutlineVertical as MenuIcon } from '@phosphor-icons/react';
import { Pen as PenIcon } from '@phosphor-icons/react';
import { v4 as uuidV4 } from 'uuid';


export interface UsuariosMenuProps {
  params: any;
  setModalRemover: (id_Usuario: string) => void;
  setModalTrocarSenha: (id_Usuario: string) => void;
  setModalLogs: (open: boolean) => void;
}
export function UsuariosMenuTable({ params, setModalRemover, setModalTrocarSenha, setModalLogs }: UsuariosMenuProps): React.JSX.Element {
  const pathName = usePathname();
  const { getAccessLevel } = useUser();
  const [accessLevel, setAccessLevel] = useState<number>(-1);
  const idUsuario = params.data.id_Usuario;
  useEffect(() => {
    async function fetchAccessLevel() {
      const level = await getAccessLevel(pathName);
      setAccessLevel(level);
    }
    fetchAccessLevel();
  }, [pathName, getAccessLevel]);
  function handleRemoverUsuario(event: React.SyntheticEvent | React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setModalRemover(idUsuario);
  }

  function handleTrocarSenha(event: React.SyntheticEvent | React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Trocar Senha', idUsuario);
    setModalTrocarSenha(idUsuario);
  }

  function handleLogsAcesso(event: React.SyntheticEvent | React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setModalLogs(true);
  } 
  if(params.data.js_Roles["*"]) return <></>

  return (
    <Dropdown>
      <DropdownTrigger >
        <Button aria-controls="simple-menu" aria-haspopup="true">
          <MenuIcon />
        </Button>
      </DropdownTrigger>
      <DropdownPopover disableScrollLock={true}
        PaperProps={{ sx: { minWidth: '100px', p: 1, } }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Stack direction={'column'} alignItems={'flex-start'}>
          <Stack width={'100%'}>
            <Typography>
              Ações
            </Typography>
            <Divider />
          </Stack>
          <Stack width={'100%'}>
            <Button
              key={uuidV4()}
              component={RouterLink}
              href={paths.dashboard.cadastros.usuarios.editar(params.data.id_Usuario)} 
              startIcon={<PenIcon />}
              sx={{
                justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
                textAlign: 'left', // Alinha o texto à esquerda 
                '& .MuiButton-startIcon': {
                  marginRight: 1, // Espaçamento entre ícone e texto
                },
                width: '100%', // Faz o botão ocupar toda a largura disponível
              }}
            > Editar
            </Button>
          </Stack>
          <Stack width={'100%'}>
            <Button
              key={uuidV4()}
              onClick={handleRemoverUsuario}
              hidden={accessLevel !== 4}
              sx={{
                justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
                textAlign: 'left', // Alinha o texto à esquerda 
                '& .MuiButton-startIcon': {
                  marginRight: 1, // Espaçamento entre ícone e texto
                },
                width: '100%', // Faz o botão ocupar toda a largura disponível
              }}
              startIcon={<UserMinusIcon />}
            > Remover
            </Button>
          </Stack>
          <Stack width={'100%'}>
            <Button
              key={uuidV4()}
              onClick={handleLogsAcesso}
              hidden={params.data.js_Login.length == 0}
              sx={{
                justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
                textAlign: 'left', // Alinha o texto à esquerda 
                '& .MuiButton-startIcon': {
                  marginRight: 1, // Espaçamento entre ícone e texto
                },
                width: '100%', // Faz o botão ocupar toda a largura disponível
              }}
              startIcon={<CalendarIcon />}
            > Logs de Acesso
            </Button>
          </Stack>
          <Stack width={'100%'}>
            <Button
              key={uuidV4()}
              onClick={handleTrocarSenha}
              hidden={accessLevel !== 4}
              sx={{
                justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
                textAlign: 'left', // Alinha o texto à esquerda 
                '& .MuiButton-startIcon': {
                  marginRight: 1, // Espaçamento entre ícone e texto
                },
                width: '100%', // Faz o botão ocupar toda a largura disponível
              }}
              startIcon={<PasswordIcon />}
            > Gerar Nova Senha
            </Button>
          </Stack>
        </Stack>
      </DropdownPopover>
    </Dropdown>
  )
}
