import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SchoolIcon from '@mui/icons-material/School'
import { Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import ellipsis from 'common/assets/image/ellipsis.svg'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsParamsSelector } from 'features/cards/bll/cardsSelectors'
import { deletePackFromCardsTC, updatePackFromCardsTC } from 'features/cards/bll/cardsThunk'
import { DeletePackModal } from 'features/packs/ui/PacksModals/DeletePackModal'
import { EditPackModal } from 'features/packs/ui/PacksModals/EditPackModal'

export const MenuEditMyPackCards = () => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const { cardsPack_id } = useAppSelector(cardsParamsSelector)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const updatePack = (id: string, name: string, privatePack: boolean) => {
    dispatch(updatePackFromCardsTC({ _id: id, name, private: privatePack }))
  }
  const onClickEditPackHandler = () => {
    setOpenModalEdit(true)
  }
  const deletePack = (id: string) => {
    dispatch(deletePackFromCardsTC(id))
  }
  const onClickDeletePackHandler = () => {
    setOpenModalDelete(true)
  }

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'edit-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={ellipsis} alt={'Menu'} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="edit-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgColor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={onClickEditPackHandler}>
          <IconButton>
            <BorderColorIcon fontSize={'small'} />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem onClick={onClickDeletePackHandler}>
          <IconButton>
            <DeleteForeverIcon fontSize={'small'} />
          </IconButton>
          Delete
        </MenuItem>
        <MenuItem>
          <IconButton onClick={() => {}}>
            <SchoolIcon fontSize={'small'} />
          </IconButton>
          Learn
        </MenuItem>
      </Menu>
      <EditPackModal
        setOpen={setOpenModalEdit}
        open={openModalEdit}
        editPack={updatePack}
        id={cardsPack_id}
      />
      <DeletePackModal
        setOpen={setOpenModalDelete}
        open={openModalDelete}
        removePackCards={deletePack}
        id={cardsPack_id}
      />
    </Box>
  )
}
