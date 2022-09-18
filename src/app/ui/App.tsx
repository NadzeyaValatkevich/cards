import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { ContentWrapper } from '../../common/components/contentWrapper/ContentWrapper'
import { store } from '../bll/store'

import { AppRoutes } from './AppRoutes'

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div className="App">
        <ContentWrapper>
          <AppRoutes />
        </ContentWrapper>
      </div>
    </Provider>
  </HashRouter>
)

export default App
