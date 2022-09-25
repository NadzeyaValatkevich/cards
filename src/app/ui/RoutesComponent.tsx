import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from '../../common/utils/PrivateRoutes'

import { PageNotFound } from 'common/components/PageNotFound/PageNotFound'
import { Recovery } from 'features/auth/ui/Recovery'
import { SignIn } from 'features/auth/ui/SignIn'
import { SignUp } from 'features/auth/ui/SignUp'
import { Profile } from 'features/profile/ui/Profile'

export const MAIN = '/'
export const PROFILE = '/profile'
export const SIGN_IN = '/login'
export const SIGN_UP = '/registration'
export const REC_PASSWORD = '/forgot'
export const Page_Not_Found = '*'

export const RoutesComponent: React.FC = () => {
  const loggedRoutes = [
    { path: MAIN, component: <Navigate to={PROFILE} /> },
    { path: PROFILE, component: <Profile /> },
    { path: Page_Not_Found, component: <PageNotFound /> },
  ]
  const unLoggedRoutes = [
    { path: MAIN, component: <Navigate to={SIGN_IN} /> },
    { path: SIGN_UP, component: <SignUp /> },
    { path: REC_PASSWORD, component: <Recovery /> },
    { path: Page_Not_Found, component: <PageNotFound /> },
  ]

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes loggedIn />}>
          {loggedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route element={<PrivateRoutes />}>
          {unLoggedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path={SIGN_IN} element={<SignIn />} />
      </Routes>
    </>
  )
}
