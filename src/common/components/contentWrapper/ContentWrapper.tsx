import React, { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

type PropsType = {
  sx?: SxProps<Theme>
  children: ReactNode
}

export const ContentWrapper: React.FC<PropsType> = ({ children, sx }) => (
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
        ...sx,
      }}
    >
      {children}
    </Paper>
  </Box>
)
