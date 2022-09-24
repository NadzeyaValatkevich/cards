import React, { useEffect } from 'react'

import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { initTC } from '../bll/appThunks'
import { AppRootStateType, store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

import { Header } from 'common/components/header/Header'
import { theme } from 'common/styles/theme'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <RoutesComponent />
      </div>
    </ThemeProvider>
  )
}
