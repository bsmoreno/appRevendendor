'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { PatternFormat  } from "react-number-format";
import { Option } from '@/components/core/option';
import { useUser } from '@/hooks/use-user';

export function AccountDetails(): React.JSX.Element {
  const { user } = useUser();
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <UserIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Dados"
      />
      <CardContent>
        <Stack spacing={3}>
          {/* <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                border: '1px dashed var(--mui-palette-divider)',
                borderRadius: '50%',
                display: 'inline-flex',
                p: '4px',
              }}
            >
              <Box sx={{ borderRadius: 'inherit', position: 'relative' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: 'inherit',
                    bottom: 0,
                    color: 'var(--mui-palette-common-white)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    opacity: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 1,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <CameraIcon fontSize="var(--icon-fontSize-md)" />
                    <Typography color="inherit" variant="subtitle2">
                      Select
                    </Typography>
                  </Stack>
                </Box>
                <Avatar src="/assets/avatar.png" sx={{ '--Avatar-size': '100px' }} />
              </Box>
            </Box>
            <Button color="secondary" size="small">
              Remove
            </Button>
          </Stack> */}
          <Stack spacing={2}>
            <FormControl>
              <InputLabel>Nome</InputLabel>
              <OutlinedInput defaultValue={user?.ds_Nome} name="ds_Nome" />
            </FormControl>
            <FormControl>
              <InputLabel>Sobrenome</InputLabel>
              <OutlinedInput defaultValue={user?.ds_Sobrenome} value={user?.ds_Sobrenome} name="ds_Sobrenome" />
            </FormControl>
            <FormControl disabled>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput name="email" type="email" value={user?.ds_Email} />
            </FormControl>
            <FormControl sx={{ flex: '1 1 auto' }}>
              <InputLabel>Telefone</InputLabel>

              <PatternFormat 
                valueIsNumericString 
                format="+55 (##) #.####-####" 
                defaultValue={user?.nr_Celular} name="nr_Celular"
                value={user?.nr_Celular}
                aria-label='Telefone'
                type='tel'
                displayType='input'
                customInput={OutlinedInput}
                 />
            </FormControl>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="secondary">Cancel</Button>
        <Button variant="contained">Save changes</Button>
      </CardActions>
    </Card>
  );
}
