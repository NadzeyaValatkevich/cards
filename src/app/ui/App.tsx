import React, { useEffect } from 'react'

import './App.css'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { initTC } from '../bll/appThunks'
import { AppRootStateType, store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

import { Header } from 'common/components/header/Header'
import { theme } from 'common/styles/theme'

export const App = () => {
  // const isInitialized = useAppSelector(
  //   (state: AppRootStateType): boolean => state.app.isInitialized
  // )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <RoutesComponent />
      </div>
    </ThemeProvider>
  )
}
