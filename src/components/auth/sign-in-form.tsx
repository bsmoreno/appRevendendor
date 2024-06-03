'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient, lsRToken } from '@/lib/auth/authClient';
import { useUser } from '@/hooks/use-user';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';
import { BlockUI, useBlockUI } from '../widgets/blockUi';
import { Alertas } from '../alertas';


const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const [openState, setBlockUI] = useBlockUI();
  const { checkSession } = useUser();
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  // const [mensagemAlerta, setMensagemAlerta] = React.useState<string>('');
  // const [tipoAlerta, setTipoAlerta] = React.useState<string>('success');

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  React.useEffect(() => {
    setBlockUI(isPending)
  }, [isPending])
  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.singIn(values);

      if (error) {
        debugger;
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }
      // Refresh the auth state
      await checkSession?.();

      setIsPending(false);
    },
    [checkSession, setError]
  );

  return (
    <Stack spacing={4}> 
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...field} type="email" />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
              <Button disabled={isPending} type="submit" variant="contained">
                Sign in
              </Button>
            </Stack>
          </form>
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
        </Stack>
      </Stack>
      {/* <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert> */}
    </Stack>
  );
}
