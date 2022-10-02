import React, { ChangeEvent, useEffect, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { debounce } from 'lodash'

import { useAppDispatch } from 'common/hooks/hooks'
import { getPacksTC } from 'features/packs/bll/packsThunks'

export const SearchPanel = () => {
  const dispatch = useAppDispatch()

  const debouncedSearch = useRef(
    debounce(async criteria => {
      dispatch(getPacksTC({ packName: criteria }))
    }, 700)
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await debouncedSearch(e.target.value)
  }

  return (
    <Box>
      <Typography variant={'subtitle2'} fontWeight={600}>
        Search
      </Typography>
      <TextField
        type={'search'}
        variant={'outlined'}
        onChange={onChangeHandler}
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
