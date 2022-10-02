import React, { useEffect } from 'react'

import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { initTC } from '../bll/appThunks'

import { RoutesComponent } from './RoutesComponent'

import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from 'common/components/header/Header'
import { SuccessSnackbar } from 'common/components/SucsessSnackbar/SuccessSnackbar'
import { useAppDispatch } from 'common/hooks/useAppSelector'
import { theme } from 'common/styles/theme'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorSnackbar />
      <SuccessSnackbar />
      <div className="App">
        <Header />
        <RoutesComponent />
      </div>
    </ThemeProvider>
  )
}
