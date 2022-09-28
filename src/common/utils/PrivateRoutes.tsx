import { FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks/hooks'

import { AppRoutes } from 'app/ui/RoutesComponent'

type PrivateRoutesPropsType = {
  loggedIn?: boolean
}

export const PrivateRoutes: FC<PrivateRoutesPropsType> = ({ loggedIn }) => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (loggedIn) {
    return isLoggedIn ? <Outlet /> : <Navigate to={AppRoutes.SIGN_IN} />
  } else {
    return isLoggedIn ? <Navigate to={AppRoutes.SIGN_IN} /> : <Outlet />
  }
}
