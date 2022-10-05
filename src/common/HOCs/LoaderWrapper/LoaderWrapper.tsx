import React, { FC, ReactNode } from 'react'

import { RequestStatusType } from 'app/bll/appReducer'
import { appStatusSelector } from 'app/bll/appSelectors'
import { Loader } from 'common/components/Loader/Loader'
import { useAppSelector } from 'common/hooks/useAppSelector'

type LoaderWrapperPropsType = {
  children: ReactNode
}
export const LoaderWrapper: FC<LoaderWrapperPropsType> = ({ children }) => {
  const appIsLoading = useAppSelector(appStatusSelector)

  return appIsLoading === RequestStatusType.loading ? <Loader /> : <>{children}</>
}
