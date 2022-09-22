import React, { ReactNode } from 'react'

import { Paper } from '@mui/material'
import Container from '@mui/material/Container'

type PropsType = {
  children: ReactNode
}

export const ContentWrapper: React.FC<PropsType> = ({ children }) => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      marginTop: '20px',
    }}
  >
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 3rem',
      }}
    >
      {children}
    </Paper>
  </Container>
)
