import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { Recovery } from '../../features/auth/ui/Recovery'
import { SignIn } from '../../features/auth/ui/SignIn'
import { SignUp } from '../../features/auth/ui/SignUp'
import { PageNotFound } from '../../features/pageNotFound/ui/PageNotFound'
import { Profile } from '../../features/profile/ui/Profile'

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
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        <Route path={'*'} element={<Navigate to={Page_Not_Found} />} />
      </Routes>
    </div>
  )
}
