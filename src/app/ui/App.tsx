import React from 'react'

import './App.css'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { ContentWrapper } from '../../common/components/contentWrapper/ContentWrapper'
import { theme } from '../../common/styles/theme'
import { Header } from '../../features/header/Header'
import { store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

const App = () => (
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Header />
          <ContentWrapper>
            <RoutesComponent />
          </ContentWrapper>
        </div>
      </Provider>
    </ThemeProvider>
  </HashRouter>
)

export default App
