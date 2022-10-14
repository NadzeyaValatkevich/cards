import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Theme, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/system'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useDebounce } from 'common/hooks/useDebounce'

type PropsType = {
  setParams: (packName: string) => any
  searchParam?: string
  sx?: SxProps<Theme>
}

export const SearchPanel: FC<PropsType> = ({ setParams, sx, searchParam }) => {
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
    if (flag && !searchParam) {
      setValue('')
    }
  }, [searchParam])

  useEffect(() => {
    if (flag && (searchParam || debouncedValue)) {
      dispatch(setParams(debouncedValue))
    }
  }, [debouncedValue])

  return (
    <Box sx={sx}>
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
