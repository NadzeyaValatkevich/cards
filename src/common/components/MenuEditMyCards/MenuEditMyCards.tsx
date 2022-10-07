import React from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SchoolIcon from '@mui/icons-material/School'
import { Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'

export const MenuEditMyCards = () => {
  const editNameCardHandler = () => {}

  return (
    <Menu
      // anchorEl={anchorEl}
      // id="account-menu"
      open={true}
      // onClose={handleClose}
      // onClick={handleClose}
      // PaperProps={{
      //   elevation: 0,
      //   sx: {
      //     overflow: 'visible',
      //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      //     mt: 1.5,
      //     '& .MuiAvatar-root': {
      //       width: 32,
      //       height: 32,
      //       ml: -0.5,
      //       mr: 1,
      //     },
      //     '&:before': {
      //       content: '""',
      //       display: 'block',
      //       position: 'absolute',
      //       top: 0,
      //       right: 14,
      //       width: 10,
      //       height: 10,
      //       bgcolor: 'background.paper',
      //       transform: 'translateY(-50%) rotate(45deg)',
      //       zIndex: 0,
      //     },
      //   },
      // }}
      // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <IconButton onClick={editNameCardHandler}>
          <BorderColorIcon fontSize={'small'} />
        </IconButton>
        Edit
      </MenuItem>
      <MenuItem>
        <IconButton onClick={() => {}}>
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
  )
}
