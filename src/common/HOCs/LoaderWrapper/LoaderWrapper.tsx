import React, { FC, ReactNode } from 'react'

import { RequestStatusType } from 'app/bll/appReducer'
import { Loader } from 'common/components/Loader/Loader'
import { useAppSelector } from 'common/hooks/useAppSelector'

type LoaderWrapperPropsType = {
  children: ReactNode
}

export const LoaderWrapper: FC<LoaderWrapperPropsType> = ({ children }) => {
  const isLoading = useAppSelector(state => state.app.status)

  if (isLoading === RequestStatusType.loading) return <Loader />

  return <>{children}</>
}
