import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { AvatarHeader } from './AvatarHeader'

import logo from 'common/assets/image/logo.svg'
import { AppRoutes } from 'common/enums/enums'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const Header = () => {
  const navigate = useNavigate()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const signInOnClickHandler = () => {
    navigate(AppRoutes.SIGN_IN)
  }

  return (
    <AppBar position="static" sx={{ bgcolor: '#FCFCFC' }} elevation={2}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box component={'img'} src={logo} alt={'It-incubator logo'} />
          {isLoggedIn ? (
            <AvatarHeader />
          ) : (
            <Button variant={'contained'} color={'primary'} onClick={signInOnClickHandler}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
