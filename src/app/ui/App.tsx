import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { ContentWrapper } from '../../common/components/contentWrapper/ContentWrapper'
import { Header } from '../../features/header/Header'
import { store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div className="App">
        <Header />
        <ContentWrapper>
          <RoutesComponent />
        </ContentWrapper>
      </div>
    </Provider>
  </HashRouter>
)

export default App
