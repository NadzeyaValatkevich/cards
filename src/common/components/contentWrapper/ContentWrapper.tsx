import React, { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

type PropsType = {
  children: ReactNode
}

export const ContentWrapper: React.FC<PropsType> = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Paper
      sx={{
        marginTop: '60px',
        padding: '10px',
      }}
    >
      {children}
    </Paper>
  </Box>
)
