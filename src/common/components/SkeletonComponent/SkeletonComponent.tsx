import React, { FC, ReactNode } from 'react'

import { Skeleton, Theme } from '@mui/material'
import { SxProps } from '@mui/system'

type SkeletonComponentPropsType = {
  status: boolean
  children: ReactNode
  sxProps?: SxProps<Theme>
}

export const SkeletonComponent: FC<SkeletonComponentPropsType> = ({
  status,
  children,
  sxProps,
}) => {
  return status ? (
    <Skeleton
      sx={{
        width: '100%',
        margin: '.5rem 0',
        ...sxProps,
      }}
    />
  ) : (
    <>{children}</>
  )
}
