import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { Header } from '../../features/header/Header'
import { store } from '../bll/store'

import { RoutesComponent } from './RoutesComponent'

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div className="App">
        <Header />
        <RoutesComponent />
      </div>
    </Provider>
  </HashRouter>
)

export default App
