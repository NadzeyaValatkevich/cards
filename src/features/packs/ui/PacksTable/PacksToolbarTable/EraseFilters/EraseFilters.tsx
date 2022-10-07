import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setPacksInitialParamsAC } from 'features/packs/bll/packsActions'

export const EraseFilters = () => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setPacksInitialParamsAC())
  }

  return (
    <Box>
      <IconButton onClick={onClickHandler}>
        <FilterAltOffIcon />
      </IconButton>
    </Box>
  )
}
