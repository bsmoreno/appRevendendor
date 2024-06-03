
import { Dropdown } from "@/components/core/dropdown/dropdown";
import { DropdownPopover } from "@/components/core/dropdown/dropdown-popover";
import { DropdownTrigger } from "@/components/core/dropdown/dropdown-trigger";
import { RouterLink } from "@/components/core/link";
import { paths } from "@/paths";
import { Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DotsThreeOutlineVertical as MenuIcon } from '@phosphor-icons/react';
import { Pen as PenIcon } from '@phosphor-icons/react';
import { v4 as uuidV4 } from 'uuid';


export interface ClientesMenuTableProps {
  params: any;
}
export function ClientesMenuTable({ params }: ClientesMenuTableProps): React.JSX.Element {

  return (
    <Dropdown>
      <DropdownTrigger >
        <Button aria-controls="simple-menu" aria-haspopup="true">
          <MenuIcon />
        </Button>
      </DropdownTrigger>
      <DropdownPopover disableScrollLock={true}
        PaperProps={{ sx: { minWidth: '200px', p: 1, } }}
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
              href={paths.dashboard.cadastros.clientes.editar(params.id_Cliente)}
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
        </Stack>
      </DropdownPopover>
    </Dropdown>
  )
}
