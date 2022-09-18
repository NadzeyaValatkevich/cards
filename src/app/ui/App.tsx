import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { ContentWrapper } from '../../common/components/contentWrapper/ContentWrapper'
import { RoutesComponent } from '../../features/routes/RoutesComponent'
import { store } from '../bll/store'

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div className="App">
        <ContentWrapper>
            <RoutesComponent />
        </ContentWrapper>
      </div>
    </Provider>
  </HashRouter>
)

export default App
