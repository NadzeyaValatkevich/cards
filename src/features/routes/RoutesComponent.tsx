import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { Recovery } from '../auth/ui/Recovery'
import { SignIn } from '../auth/ui/SignIn'
import { SignUp } from '../auth/ui/SignUp'
import { PageNotFound } from '../pageNotFound/ui/PageNotFound'
import { Profile } from '../profile/ui/Profile'

export const PROFILE = '/'
export const SIGN_IN = '/login'
export const SIGN_UP = '/registration'
export const REC_PASSWORD = '/forgot'
export const Page_Not_Found = '/404'

export const RoutesComponent: React.FC = () => {
  const routes = [
    { path: PROFILE, component: <Profile /> },
    { path: SIGN_IN, component: <SignIn /> },
    { path: SIGN_UP, component: <SignUp /> },
    { path: REC_PASSWORD, component: <Recovery /> },
    { path: Page_Not_Found, component: <PageNotFound /> },
  ]

  return (
    <div>
      <Routes>
        <Route path={'*'} element={<Navigate to={Page_Not_Found} />} />
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </div>
  )
}
