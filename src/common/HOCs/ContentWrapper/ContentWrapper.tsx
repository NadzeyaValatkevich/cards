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

  const BackToCardPacksLocations = AppRoutes.PROFILE || AppRoutes.CARDS

  if (withoutPaper) {
    return (
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flex: 1,
        }}
      >
        {children}
      </Container>
    )
  } else {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flex: 1,
        }}
      >
        {location.pathname === BackToCardPacksLocations && <BackToCardPacks />}
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            ...sx,
          }}
        >
          {children}
        </Paper>
      </Container>
    )
  }
}
