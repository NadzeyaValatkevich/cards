import React from 'react'

import { createHashRouter, Navigate } from 'react-router-dom'

import { App } from '../ui/App'
import { ErrorPage } from '../ui/ErrorPage'

import { PageNotFound } from 'common/components/PageNotFound/PageNotFound'
import { AppRoutes } from 'common/enums/enums'
import { PrivateRoutes } from 'common/utils/PrivateRoutes'
import { CheckEmail } from 'features/f0-auth/ui/CheckEmail'
import { Recovery } from 'features/f0-auth/ui/Recovery'
import { SetNewPassword } from 'features/f0-auth/ui/SetNewPassword'
import { SignIn } from 'features/f0-auth/ui/SignIn'
import { SignUp } from 'features/f0-auth/ui/SignUp'
import { Profile } from 'features/f1-profile/ui/Profile'
import { Packs } from 'features/f2-packs/ui/Packs'
import { Cards } from 'features/f3-cards/ui/Cards'
import { LearnPage } from 'features/f3-cards/ui/LearnPage/LearnPage'

const loggedRoutes = {
  element: <PrivateRoutes loggedIn />,
  children: [
    {
      path: AppRoutes.PROFILE,
      element: <Profile />,
    },
    {
      path: AppRoutes.PACKS,
      element: <Packs />,
    },
    {
      path: `${AppRoutes.CARDS}`,
      element: <Cards />,
    },
    {
      path: `${AppRoutes.LEARN}`,
      element: <LearnPage />,
    },
  ],
}
const unLoggedRoutes = {
  element: <PrivateRoutes />,
  children: [
    {
      path: AppRoutes.SIGN_UP,
      element: <SignUp />,
    },
    {
      path: AppRoutes.REC_PASSWORD,
      element: <Recovery />,
    },
    {
      path: AppRoutes.SET_NEW_PASSWORD,
      element: <SetNewPassword />,
    },
    {
      path: AppRoutes.CHECK_EMAIL,
      element: <CheckEmail />,
    },
  ],
}

export const router = createHashRouter(
  [
    {
      path: AppRoutes.ROOT,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        loggedRoutes,
        unLoggedRoutes,
        {
          element: <Navigate to={AppRoutes.SIGN_IN} />,
          index: true,
        },
        {
          path: AppRoutes.SIGN_IN,
          element: <SignIn />,
        },
        {
          path: AppRoutes.Page_Not_Found,
          element: <PageNotFound />,
        },
      ],
    },
  ],
  {
    // basename: 'f3-cards',
  }
)
