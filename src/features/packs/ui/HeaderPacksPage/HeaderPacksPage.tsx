import React, { FC } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type ToolbarTablePropsType = {
  addNewPack: () => void
  disabled: boolean
}

export const HeaderPacksPage: FC<ToolbarTablePropsType> = ({ addNewPack, disabled }) => {
  const buttonOnClickHandler = () => {
    addNewPack()
  }

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
      <Typography variant={'h5'} fontWeight={'600'}>
        Packs list
      </Typography>
      <Button
        onClick={buttonOnClickHandler}
        sx={{ margin: '36px 0' }}
        variant={'contained'}
        color={'primary'}
        disabled={disabled}
      >
        Add new pack
      </Button>
    </Box>
  )
}
