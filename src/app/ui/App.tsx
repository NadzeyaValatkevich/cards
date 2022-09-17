import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { store } from '../bll/store'

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div className="App">Empty App</div>
    </Provider>
  </HashRouter>
)

export default App
