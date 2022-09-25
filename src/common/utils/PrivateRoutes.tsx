import { FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks/hooks'

import { SIGN_IN } from 'app/ui/RoutesComponent'

type PrivateRoutesPropsType = {
  loggedIn?: boolean
}

export const PrivateRoutes: FC<PrivateRoutesPropsType> = ({ loggedIn }) => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (loggedIn) {
    return isLoggedIn ? <Outlet /> : <Navigate to={SIGN_IN} replace />
  } else {
    return !isLoggedIn ? <Outlet /> : <Navigate to={SIGN_IN} replace />
  }
}
