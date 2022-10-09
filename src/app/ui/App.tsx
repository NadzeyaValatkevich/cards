import React from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

import { store } from '../bll/store'

import { Layout } from './Layout'

import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { SuccessSnackbar } from 'common/components/SucsessSnackbar/SuccessSnackbar'
import { theme } from 'common/styles/theme'

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorSnackbar />
        <SuccessSnackbar />
        <Layout />
      </ThemeProvider>
    </Provider>
  )
}
