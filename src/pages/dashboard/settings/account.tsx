import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { AccountDetails } from '@/components/dashboard/settings/account-details';
import { DeleteAccount } from '@/components/dashboard/settings/delete-account';
import { Privacy } from '@/components/dashboard/settings/privacy';
import { ThemeSwitch } from '@/components/dashboard/settings/theme-switch';

const metadata = { title: `Profile | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack spacing={4}>
        <div>
          <Typography variant="h4">Profile</Typography>
        </div>
        <Stack spacing={4}>
          <AccountDetails />
          <ThemeSwitch />
          {/* <Privacy />
          <DeleteAccount /> */}
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
