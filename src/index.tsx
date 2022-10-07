import React from 'react'

import './index.css'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './app/bll/router'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<RouterProvider router={router} />)
reportWebVitals()
