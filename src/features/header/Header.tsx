import React from 'react'

import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../common/assets/image/logo.svg'

export const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#FCFCFC' }} elevation={2}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box component={'img'} src={logo} alt={'It-incubator logo'} />
          <Button variant={'contained'} color={'primary'}>
            Sign in
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
