import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PageNotFound } from 'common/components/PageNotFound/PageNotFound'
import { AppRoutes } from 'common/enums/enums'
import { PrivateRoutes } from 'common/utils/PrivateRoutes'
import { CheckEmail } from 'features/auth/ui/CheckEmail'
import { Recovery } from 'features/auth/ui/Recovery'
import { SetNewPassword } from 'features/auth/ui/SetNewPassword'
import { SignIn } from 'features/auth/ui/SignIn'
import { SignUp } from 'features/auth/ui/SignUp'
import { Cards } from 'features/cards/ui/Cards'
import { Packs } from 'features/packs/ui/Packs'
import { Profile } from 'features/profile/ui/Profile'

export const RoutesComponent: React.FC = () => {
  const loggedRoutes = [
    { path: AppRoutes.ROOT, component: <Navigate to={AppRoutes.PROFILE} /> },
    { path: AppRoutes.PROFILE, component: <Profile /> },
    { path: AppRoutes.Page_Not_Found, component: <PageNotFound /> },
    { path: AppRoutes.PACKS, component: <Packs /> },
  ]
  const unLoggedRoutes = [
    { path: AppRoutes.ROOT, component: <Navigate to={AppRoutes.SIGN_IN} /> },
    { path: AppRoutes.SIGN_UP, component: <SignUp /> },
    { path: AppRoutes.REC_PASSWORD, component: <Recovery /> },
    { path: AppRoutes.SET_NEW_PASSWORD, component: <SetNewPassword /> },
    { path: AppRoutes.CHECK_EMAIL, component: <CheckEmail /> },
    { path: AppRoutes.Page_Not_Found, component: <PageNotFound /> },
  ]

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes loggedIn />}>
          {loggedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
          <Route path={AppRoutes.CARDS}>
            <Route path={AppRoutes.CARDS_PACK_ID} element={<Cards />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          {unLoggedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
      </Routes>
    </>
  )
}
