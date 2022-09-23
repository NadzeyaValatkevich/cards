import React from 'react'

import './App.css'
import { LinearProgress, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { useAppSelector } from '../../common/hooks/hooks'
import { RequestStatusType } from '../bll/appReducer'
import { AppRootStateType, store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

import { Header } from 'common/components/header/Header'
import { theme } from 'common/styles/theme'

const App = () => {
  const appState = useAppSelector((state: AppRootStateType) => state.app)

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Header />
            {appState.status === RequestStatusType.loading && <LinearProgress />}
            <RoutesComponent />
          </div>
        </Provider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
