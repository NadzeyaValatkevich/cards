import React, { useState, MouseEvent } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SchoolIcon from '@mui/icons-material/School'
import { Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { useAppSelector } from '../../hooks/useAppSelector'

import ellipsis from 'common/assets/image/ellipsis.svg'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { updateCardTC } from 'features/cards/bll/cardsThunk'
import { EditCardModal } from 'features/cards/ui/Modals/EditCardModal'

export const MenuEditMyCards = () => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const _id = useAppSelector(state => state.cards.cardsData.packUserId)
  // const { id } = useParams()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const updateCard = (id: string, question: string, answer: string) => {
    dispatch(updateCardTC({ _id: id, question, answer }))
  }
  const onClickEditDataHandler = () => {
    setOpenModalEdit(true)
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
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={onClickEditDataHandler}>
          <IconButton>
            <BorderColorIcon fontSize={'small'} />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {}}>
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
      <EditCardModal
        setOpen={setOpenModalEdit}
        open={openModalEdit}
        updateCard={updateCard}
        _id={_id}
      />
      {/*<DeleteCardModal*/}
      {/*  setOpen={setOpenModalDelete}*/}
      {/*  open={openModalDelete}*/}
      {/*  removeCard={removeCard}*/}
      {/*  _id={_id}*/}
      {/*/>*/}
    </Box>
  )
}
