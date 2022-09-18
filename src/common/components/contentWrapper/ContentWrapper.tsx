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
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: 413,
      },
    }}
  >
    <Paper>{children}</Paper>
  </Box>
)
