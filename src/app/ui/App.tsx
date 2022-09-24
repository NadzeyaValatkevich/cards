import React, { useEffect } from 'react'

import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { initTC } from '../bll/appThunks'

import { RoutesComponent } from './RoutesComponent'

import { Header } from 'common/components/header/Header'
import { useAppDispatch } from 'common/hooks/hooks'
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
