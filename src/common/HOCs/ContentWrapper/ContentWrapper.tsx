import React, { FC, ReactNode } from 'react'

import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import { useLocation } from 'react-router-dom'

import { BackToCardPacks } from 'common/components/BackToPackList/BackToCardsPack'
import { AppRoutes } from 'common/enums/enums'

type PropsType = {
  withoutPaper?: boolean
  sx?: SxProps<Theme>
  children: ReactNode
}

export const ContentWrapper: FC<PropsType> = ({ children, sx, withoutPaper }) => {
  const location = useLocation()

  const BackToCardPacksLocations =
    location.pathname === AppRoutes.PROFILE ||
    location.pathname === AppRoutes.CARDS ||
    location.pathname === AppRoutes.LEARN

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {BackToCardPacksLocations && <BackToCardPacks />}
      {withoutPaper ? (
        children
      ) : (
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            padding: '2rem',
            mt: !BackToCardPacksLocations ? '4.5rem' : '',
            ...sx,
          }}
        >
          {children}
        </Paper>
      )}
    </Container>
  )
}
