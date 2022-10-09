import React, { useEffect } from 'react'

import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'

import { initTC } from '../bll/appThunks'

import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from 'common/components/Header/Header'
import { SuccessSnackbar } from 'common/components/SucsessSnackbar/SuccessSnackbar'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export const Layout = () => {
  const dispatch = useAppDispatch()

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
        <Outlet />
      </Box>
    </>
  )
}
