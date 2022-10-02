import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputBase, Paper } from '@mui/material'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useDebounce } from 'common/hooks/useDebounce'
import { CardsParamsType } from 'features/cards/dal/cardsAPI'
import { PacksParamsType } from 'features/packs/dal/packsAPI'

type SearchKeyType = 'cardQuestion' | 'cardAnswer' | 'packName'

type PropsType = {
  setParamsAC: (params: PacksParamsType | CardsParamsType) => any
  search: SearchKeyType
}

export const Search: React.FC<PropsType> = ({ setParamsAC, search }) => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (debouncedValue) {
      dispatch(setParamsAC({ [search]: debouncedValue }))
    }
  }, [debouncedValue])

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        background: '#dedede',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Provide your text"
        inputProps={{
          'aria-label': 'Provide your text',
          onChange: handleChange,
        }}
      />
      <SearchIcon fontSize={'small'} />
    </Paper>
  )
}
