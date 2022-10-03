import { SyntheticEvent, useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { getPacksTC } from '../../../../bll/packsThunks'
import { InputForSlider } from '../InputForSlider/InputForSlider'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useDebounce } from 'common/hooks/useDebounce'

export const SliderForPacks = () => {
  const dispatch = useAppDispatch()
  const min = useAppSelector(state => state.packs.params.min)
  const max = useAppSelector(state => state.packs.params.max)
  const [value, setValue] = useState<number[]>([0, 100])
  const debouncedValue = useDebounce(value, 500)

  console.log('value', value)
  console.log('max, min', min, max)

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
  const changeMinValue = (newValue: number) => {
    const newArray = [...value]

    newArray[0] = newValue
    setValue(newArray)
  }

  const changeMaxValue = (newValue: number) => {
    const newArray = [...value]

    newArray[1] = newValue
    setValue(newArray)
  }

  useEffect(() => {
    if (min && min >= 0 && max) {
      setValue([min, max])
    }
  }, [min, max])

  // useEffect(() => {
  //   dispatch(
  //     getPacksTC({
  //       min: value[0],
  //       max: value[1],
  //     })
  //   )
  // }, [value])

  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }}>Number of cards</Typography>
      <Box sx={{ display: 'flex', width: '300px' }}>
        <InputForSlider value={min} setValue={changeMinValue} />
        <Slider
          value={value}
          onChange={onChangeCallback}
          onChangeCommitted={handleChangeCommitted}
        />
        <InputForSlider value={max} setValue={changeMaxValue} />
      </Box>
    </Box>
  )
}
