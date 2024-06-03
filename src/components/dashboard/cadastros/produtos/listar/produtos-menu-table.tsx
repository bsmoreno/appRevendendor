
import { Dropdown } from "@/components/core/dropdown/dropdown";
import { DropdownPopover } from "@/components/core/dropdown/dropdown-popover";
import { DropdownTrigger } from "@/components/core/dropdown/dropdown-trigger";
import { RouterLink } from "@/components/core/link";
import { paths } from "@/paths";
import { Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DotsThreeOutlineVertical as MenuIcon } from '@phosphor-icons/react';
import { Pen as PenIcon, Eye as EyeIcon } from '@phosphor-icons/react';
import { v4 as uuidV4 } from 'uuid';
import { useModalDetalhes } from "../produtos-detalhes-modal";
import { useCallback } from "react";

export interface ProdutosMenuTableProps {
  params: any;
}
export function ProdutosMenuTable({ params }: ProdutosMenuTableProps): React.JSX.Element {

  const [_, setIdProdutoDetalhe] = useModalDetalhes();
  const handleDetalhes = useCallback((event: any) => {
    setIdProdutoDetalhe(params.id_Produto);
  }, []);
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
              onClick={handleDetalhes}
              startIcon={<EyeIcon />}
              sx={{
                justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
                textAlign: 'left', // Alinha o texto à esquerda 
                '& .MuiButton-startIcon': {
                  marginRight: 1, // Espaçamento entre ícone e texto
                },
                width: '100%', // Faz o botão ocupar toda a largura disponível
              }}
            > Visualizar
            </Button>
            <Button
              key={uuidV4()}
              component={RouterLink}
              href={paths.dashboard.cadastros.produtos.editar(params.id_Produto)}
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
