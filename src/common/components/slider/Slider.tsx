import { SyntheticEvent, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setParamsPacksAC } from 'features/packs/bll/packsActions'

export const SliderForPacks = () => {
  const dispatch = useAppDispatch()
  const max = useAppSelector(state => state.packs.params.max)
  const min = useAppSelector(state => state.packs.params.min)
  const [value, setValue] = useState<number[]>([min || 0, max || 100])

  const onChangeCallback = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue)
    }
  }

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    Array.isArray(newValue) &&
      dispatch(
        setParamsPacksAC({
          min: newValue[0],
          max: newValue[1],
        })
      )
  }

  return (
    <Box sx={{ width: '30px' }}>
      <Typography variant="h6">Number of cards</Typography>
      <Slider
        value={value}
        onChange={onChangeCallback}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="on"
      />
    </Box>
  )
}
