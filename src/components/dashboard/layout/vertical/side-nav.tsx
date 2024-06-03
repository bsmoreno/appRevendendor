import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareOut as ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';

import type { NavItemConfig } from '@/types/nav';
import type { NavColor } from '@/types/settings';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { useSettings } from '@/hooks/use-settings';
import { RouterLink } from '@/components/core/link';
import { Logo } from '@/components/core/logo';
import type { ColorScheme } from '@/styles/theme/types';
import { icons } from '../nav-icons';
import { WorkspacesSwitch } from '../workspaces-switch';
import { navColorStyles } from './styles';
import { useUser } from '@/hooks/use-user';
import { RolesPermissao } from '@/contexts/auth/auth-user-context';
import { v4 as uuidv4 } from 'uuid';
const logoColors = {
  dark: { blend_in: 'light', discrete: 'light', evident: 'light' },
  light: { blend_in: 'dark', discrete: 'dark', evident: 'light' },
} as Record<ColorScheme, Record<NavColor, 'dark' | 'light'>>;

export interface SideNavProps {
  color?: NavColor;
  items?: NavItemConfig[];
}

export function SideNav({ color = 'evident', items = [] }: SideNavProps): React.JSX.Element {
  const pathname = usePathname();
  const user = useUser();
  const {
    settings: { colorScheme = 'light' },
  } = useSettings();

  const styles = navColorStyles[colorScheme][color];
  const logoColor = logoColors[colorScheme][color];

  return (
    <Box
      sx={{
        ...styles,
        bgcolor: 'var(--SideNav-background)',
        borderRight: 'var(--SideNav-border)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
      }}
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <div>
          <Box component={RouterLink} href={paths.dashboard.home} sx={{ display: 'inline-flex' }}>
            <Logo color={logoColor} height={32} width={122} />
          </Box>
        </div>
        <WorkspacesSwitch />
      </Stack>
      <Box
        component="nav"
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          p: 2,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {renderNavGroups({ items, pathname })}
      </Box>
    </Box>
  );
}

// function renderNavGroups({ items, pathname }: { items: NavItemConfig[]; pathname: string }): React.JSX.Element {
//   const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
//     const user = useUser();
//     const userPermissions = user.user?.js_Roles || {};
//     acc.push(
//       <Stack component="li" key={curr.key} spacing={1.5}>
//         {curr.title ? (
//           <div>
//             <Typography sx={{ color: 'var(--NavGroup-title-color)', fontSize: '0.875rem', fontWeight: 500 }}>
//               {curr.title}
//             </Typography>
//           </div>
//         ) : null}
//         <div>{renderNavItems({ depth: 0, items: curr.items, pathname, userPermissions })}</div>
//       </Stack>
//     );
//     return acc;
//   }, []);

//   return (
//     <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
//       {children}
//     </Stack>
//   );
// }
function renderNavGroups({ items, pathname }: { items: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const user = useUser();
  const userPermissions = user.user?.js_Roles || {};
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const navItems = renderNavItems({ depth: 0, items: curr.items, pathname, userPermissions });

    // Verifica se `navItems` tem algum filho antes de adicionar à lista
    if (React.Children.count(navItems.props.children) > 0) {
      acc.push(
        <Stack component="li" key={curr.key} spacing={1.5}>
          {curr.title ? (
            <div>
              <Typography sx={{ color: 'var(--NavGroup-title-color)', fontSize: '0.875rem', fontWeight: 500 }}>
                {curr.title}
              </Typography>
            </div>
          ) : null}
          {navItems}
        </Stack>
      );
    }
    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

// function renderNavItems({
//   depth = 0,
//   items = [],
//   pathname,
//   userPermissions,
// }: {
//   depth: number;
//   items?: NavItemConfig[];
//   pathname: string;
//   userPermissions: Record<string, number>;
// }): React.JSX.Element {
//   const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
//     const { items: childItems, key, ...item } = curr;
//     // // Verifica se o usuário tem permissão para ver este item
//     // if (item.href  && item?.href === '/dashboard' === false) {
//     //   if ((!userPermissions[item.href] || userPermissions[item.href] < 4)) {
//     //     debugger;
//     //     return acc; // Não adiciona o item se não tiver permissão suficiente
//     //   }
//     // }

//     // Usa a função auxiliar para verificar permissões para sub-rotas
//     console.log('depth:', depth + 1, 'pathname: ', pathname)
//     if (item.href)
//       if (!hasPermissionForSubRoute(item.href, userPermissions)) {
//         return acc; // Não adiciona o item se não tiver permissão suficiente
//       }

//     const forceOpen = childItems
//       ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
//       : false;


//     acc.push(
//       <NavItem depth={depth} forceOpen={forceOpen} key={key} pathname={pathname} {...item} userPermissions={userPermissions}>
//         {childItems ? renderNavItems({ depth: depth + 1, pathname, items: childItems, userPermissions }) : null}
//       </NavItem>
//     );
//     return acc;
//   }, []);

//   return (
//     <Stack component="ul" data-depth={depth} spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
//       {children}
//     </Stack>
//   );
// }
function renderNavItems({
  depth = 0,
  items = [],
  pathname,
  userPermissions,
}: {
  depth: number;
  items?: NavItemConfig[];
  pathname: string;
  userPermissions: Record<string, number>;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    if (curr.href && !hasPermissionForSubRoute(curr.href, userPermissions)) {
      return acc;
    }

    const { items: childItems, key, ...item } = curr;
    const childNavItems = childItems ? renderNavItems({ depth: depth + 1, pathname, items: childItems, userPermissions }) : [];

    // @ts-ignore
    // Verifica se há filhos visíveis antes de renderizar o item
    if (childItems && React.Children.count(childNavItems.props.children) === 0 && !item.href) {
      return acc;
    }

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={uuidv4()} pathname={pathname} {...item}>
        {childNavItems}
      </NavItem>
    );
    return acc;
  }, []);

  return (
    <Stack component="ul" data-depth={depth} spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}
interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  children?: React.ReactNode;
  depth: number;
  forceOpen?: boolean;
  pathname: string;
}

function NavItem({
  children,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  icon,
  label,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(forceOpen);
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? icons[icon] : null;
  const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
  const isBranch = children && !href;
  const showChildren = Boolean(children && open);

  return (
    <Box component="li" data-depth={depth} sx={{ userSelect: 'none' }}>
      <Box
        {...(isBranch
          ? {
            onClick: (): void => {
              setOpen(!open);
            },
            onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>): void => {
              if (event.key === 'Enter' || event.key === ' ') {
                setOpen(!open);
              }
            },
            role: 'button',
          }
          : {
            ...(href
              ? {
                component: external ? 'a' : RouterLink,
                href,
                target: external ? '_blank' : undefined,
                rel: external ? 'noreferrer' : undefined,
              }
              : { role: 'button' }),
          })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && {
            bgcolor: 'var(--NavItem-active-background)',
            color: 'var(--NavItem-active-color)',
            ...(depth > 0 && {
              '&::before': {
                bgcolor: 'var(--NavItem-children-indicator)',
                borderRadius: '2px',
                content: '" "',
                height: '20px',
                left: '-14px',
                position: 'absolute',
                width: '3px',
              },
            }),
          }),
          ...(open && { color: 'var(--NavItem-open-color)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'var(--NavItem-hover-background)', color: 'var(--NavItem-hover-color)' }),
          },
        }}
        tabIndex={0}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? (
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={forceOpen || active ? 'fill' : undefined}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {label ? <Chip color="primary" label={label} size="small" /> : null}
        {external ? (
          <Box sx={{ alignItems: 'center', display: 'flex', flex: '0 0 auto' }}>
            <ArrowSquareOutIcon color="var(--NavItem-icon-color)" fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
        {isBranch ? (
          <Box sx={{ alignItems: 'center', display: 'flex', flex: '0 0 auto' }}>
            <ExpandIcon color="var(--NavItem-expand-color)" fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
      {showChildren ? (
        <Box sx={{ pl: '24px' }}>
          <Box sx={{ borderLeft: '1px solid var(--NavItem-children-border)', pl: '12px' }}>{children}</Box>
        </Box>
      ) : null}
    </Box>
  );
}
function hasPermissionForSubRoute(href: string, userPermissions: Record<string, number>) {
  // Verifica se existe alguma permissão específica que começa com o href fornecido 
  if (href.toLowerCase() == '/dashboard') {
    return true;
  }
  else {
    if (Object.keys(userPermissions).includes("*"))
      return true;
    else
      return Object.keys(userPermissions).some(route => route.startsWith(href) && userPermissions[route] <= 4);
  }
}