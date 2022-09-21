import React, { ReactNode } from 'react'

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
    }}
    style={{
      height: '100%',
    }}
  >
    {children}
  </Container>
)
