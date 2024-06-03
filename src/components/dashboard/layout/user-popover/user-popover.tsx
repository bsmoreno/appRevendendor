'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Password as PasswordIcon } from '@phosphor-icons/react/dist/ssr/Password';
import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { RouterLink } from '@/components/core/link';
import { AuthSignOut } from './auth-sign-out';
import { useUser } from '@/hooks/use-user';
import { useTrocaSenha } from '@/hooks/use-troca-senha';
import { UsuariosTrocarSenha } from '../usuarios-trocar-senha';
export interface UserPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open: boolean;
}
//const storage = new Storage("usuario")
export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { user, setTrocaPassword } = useUser();
  const trocaSenha = useTrocaSenha();
  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={onClose}
        open={Boolean(open)}
        slotProps={{ paper: { sx: { width: '280px' } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{user?.ds_Nome} {user?.ds_Sobrenome}</Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.ds_Email}
          </Typography>
        </Box>
        <Divider />
        <List sx={{ p: 1 }}>
          <MenuItem component={RouterLink} href={paths.dashboard.settings.account} onClick={onClose}>
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={onClose}

          //   (ev: any) => {
          //   setTrocaPassword();
          //   onClose();
          //   trocaSenha.handleOpen()
          // }}
          >
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            Trocar Senha
          </MenuItem>
          {/* <MenuItem component={RouterLink} href={paths.dashboard.settings.security} onClick={onClose}>
          <ListItemIcon>
            <LockKeyIcon />
          </ListItemIcon>
          Security
        </MenuItem> */}
          {/* <MenuItem component={RouterLink} href={paths.dashboard.settings.billing} onClick={onClose}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          Billing
        </MenuItem> */}
        </List>
        <Divider />
        <Box sx={{ p: 1 }}>
          {config.auth.strategy === AuthStrategy.CUSTOM ? <AuthSignOut /> : null}
        </Box>
      </Popover>

      <UsuariosTrocarSenha handleClose={trocaSenha.handleClose} handleOpen={trocaSenha.handleOpen} open={trocaSenha.open} />
    </>
  );
}
