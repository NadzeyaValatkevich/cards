import React, { useEffect } from 'react'

import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { RequestStatusType } from '../bll/appReducer'
import { initTC } from '../bll/appThunks'

import { RoutesComponent } from './RoutesComponent'

import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from 'common/components/header/Header'
import { Loader } from 'common/components/Loader/Loader'
import { SuccessSnackbar } from 'common/components/SucsessSnackbar/SuccessSnackbar'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { theme } from 'common/styles/theme'

export const App = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.status)

  useEffect(() => {
    dispatch(initTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading === RequestStatusType.loading && <Loader />}
      <ErrorSnackbar />
      <SuccessSnackbar />
      <div className="App">
        <Header />
        <RoutesComponent />
      </div>
    </ThemeProvider>
  )
}
