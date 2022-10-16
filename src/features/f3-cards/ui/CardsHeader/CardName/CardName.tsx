import React, { FC } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

type CardNamePropsType = {
  packName: string
}

export const CardName: FC<CardNamePropsType> = ({ packName }) => {
  return (
    <Box>
      <Typography
        variant={'h5'}
        fontWeight={'600'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {packName}
      </Typography>
    </Box>
  )
}
