import React, { FC } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setPacksInitialParamsAC } from 'features/packs/bll/packsActions'

type EraseFiltersPropsType = {
  disabled?: boolean
}

export const EraseFilters: FC<EraseFiltersPropsType> = ({ disabled }) => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setPacksInitialParamsAC())
  }

  return (
    <Box display={'flex'} alignSelf={'end'}>
      <IconButton onClick={onClickHandler} disabled={disabled}>
        <FilterAltOffIcon />
      </IconButton>
    </Box>
  )
}
