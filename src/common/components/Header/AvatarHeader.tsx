import React, { useState } from 'react'

import { Logout } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import StyleIcon from '@mui/icons-material/Style'
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'

import { AppRoutes } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { logoutTC } from 'features/auth/bll/authThunks'

export const AvatarHeader = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { name, avatar } = useAppSelector(state => state.profile)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function stringToColor(string: string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff

      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name: string) {
    const avatarName = name.split(' ')

    if (avatarName.length === 1) {
      return {
        sx: {
          bgColor: stringToColor(name),
        },
        children: `${avatarName[0][0]}`,
      }
    }

    return {
      sx: {
        bgColor: stringToColor(name),
      },
      children: `${avatarName[0][0]}${avatarName[1][0]}`,
    }
  }

  const menuLogoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Box>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Typography
            sx={{
              mr: '1rem',
              borderBottom: '1px dashed',
            }}
          >
            {name}
          </Typography>
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={avatar ? avatar : ''}
            {...(Boolean(!avatar) && stringAvatar(name || 'Ex Name'))}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate(AppRoutes.PROFILE)}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate(AppRoutes.PACKS)}>
          <ListItemIcon>
            <StyleIcon fontSize="small" />
          </ListItemIcon>
          Packs
        </MenuItem>
        <MenuItem onClick={menuLogoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
