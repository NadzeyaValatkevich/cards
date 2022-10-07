import React from 'react'

import { createHashRouter, Navigate } from 'react-router-dom'

import { App } from '../ui/App'
import { ErrorPage } from '../ui/ErrorPage'

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
      // children: [
      //   {
      //     path: AppRoutes.CARDS_PACK_ID,
      //     element: <Cards />,
      //   },
      // ],
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
    // basename: 'cards',
  }
)
