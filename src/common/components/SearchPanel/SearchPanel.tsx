import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { AppThunk } from '../../../app/bll/store'
import { CardsParamsType } from '../../../features/cards/dal/cardsAPI'
import { PacksParamsType } from '../../../features/packs/dal/packsAPI'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useDebounce } from 'common/hooks/useDebounce'

type SearchKeyType = 'cardQuestion' | 'cardAnswer' | 'packName'

type PropsType = {
  setParams: (params: PacksParamsType | CardsParamsType) => AppThunk
  search: SearchKeyType
}

export const SearchPanel: FC<PropsType> = ({ setParams, search }) => {
  const dispatch = useAppDispatch()

  const [flag, setFlag] = useState(false)
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    setFlag(true)
  }, [])

  useEffect(() => {
    if (flag) {
      dispatch(setParams({ [search]: debouncedValue }))
    }
  }, [debouncedValue])

  return (
    <Box>
      <Typography variant={'subtitle2'} fontWeight={600}>
        Search
      </Typography>
      <TextField
        type={'search'}
        variant={'outlined'}
        onChange={handleChange}
        value={value}
        placeholder={'Provide your text'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size={'small'}
        fullWidth
      />
    </Box>
  )
}
