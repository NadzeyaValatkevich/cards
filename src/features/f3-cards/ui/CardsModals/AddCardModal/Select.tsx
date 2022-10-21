import React, { FC } from 'react'

import { InputLabel, MenuItem, Select } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'

import { AgeType } from 'features/f3-cards/ui/CardsModals/AddCardModal/AddCardModal'

type SelectFormatPropsType = {
  age: AgeType
  setAge: (value: AgeType) => void
}

export const SelectFormat: FC<SelectFormatPropsType> = ({ age, setAge }) => {
  const onChangeFormatHandler = (event: SelectChangeEvent) => {
    setAge(event.target.value as 'Text' | 'Picture')
  }

  return (
    <FormControl variant="standard">
      <InputLabel id="demo-simple-select-standard-label">Choose a question format</InputLabel>
      <Select value={age} onChange={onChangeFormatHandler} defaultValue={age} label="Age" fullWidth>
        <MenuItem value={'Text'}>Text</MenuItem>
        <MenuItem value={'Picture'}>Picture</MenuItem>
      </Select>
    </FormControl>
  )
}
