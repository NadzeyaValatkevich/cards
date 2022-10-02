import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setPacksParamsAC } from 'features/packs/bll/packsActions'
import { initialPackParams } from 'features/packs/bll/packsReducer'
import { getPacksTC } from 'features/packs/bll/packsThunks'

export const EraseFilters = () => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setPacksParamsAC(initialPackParams))
    dispatch(getPacksTC())
  }

  return (
    <Box>
      <IconButton onClick={onClickHandler}>
        <FilterAltOffIcon />
      </IconButton>
    </Box>
  )
}
