import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { Header } from '../../features/header/Header'
import { RoutesComponent } from '../../features/routes/RoutesComponent'
import { store } from '../bll/store'

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div>
        <Header />
        <RoutesComponent />
      </div>
    </Provider>
  </HashRouter>
)

export default App
