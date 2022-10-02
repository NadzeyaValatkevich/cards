import { SyntheticEvent, useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { getPacksTC } from '../../../../bll/packsThunks'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const SliderForPacks = () => {
  const dispatch = useAppDispatch()
  const { min, max } = useAppSelector(state => state.packs.params)
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
        getPacksTC({
          min: newValue[0],
          max: newValue[1],
        })
      )
  }

  useEffect(() => {
    setValue([min!, max!])
  }, [min, max])

  return (
    <Box sx={{}}>
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
