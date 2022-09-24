import React, { FC, ReactNode } from 'react'

import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

type PropsType = {
  sx?: SxProps<Theme>
  children: ReactNode
}

export const ContentWrapper: FC<PropsType> = ({ children, sx }) => (
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
