import React, { useEffect } from 'react'

import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import { Outlet, useLocation } from 'react-router-dom'

import { BackToCardPacks } from '../../common/components/BackToPackList/BackToCardsPack'
import { initTC } from '../bll/appThunks'

import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from 'common/components/Header/Header'
import { SuccessSnackbar } from 'common/components/SucsessSnackbar/SuccessSnackbar'
import { AppRoutes } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export const Layout = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(initTC())
  }, [])

  return (
    <>
      <CssBaseline />
      <ErrorSnackbar />
      <SuccessSnackbar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        {location.pathname === AppRoutes.PROFILE && <BackToCardPacks />}
        <Outlet />
      </Box>
    </>
  )
}
