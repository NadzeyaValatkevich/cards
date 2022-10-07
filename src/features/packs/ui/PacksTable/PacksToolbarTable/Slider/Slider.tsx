import { SyntheticEvent, useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { setPacksMinMaxAC } from '../../../../bll/packsActions'
import { InputForSlider } from '../InputForSlider/InputForSlider'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const SliderForPacks = () => {
  const dispatch = useAppDispatch()
  const { min, max } = useAppSelector(state => state.packs.params)
  const [value, setValue] = useState<number[]>([0, 100])

  const onChangeCallback = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      setValue(newValue)
    }
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
    if (min !== undefined && max) {
      setValue([min, max])
    }
  }, [min, max])

  useEffect(() => {
    dispatch(setPacksMinMaxAC(value[0], value[1]))
  }, [value])

  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }}>Number of cards</Typography>
      <Box sx={{ display: 'flex', width: '300px' }}>
        <InputForSlider value={value[0]} setValue={changeMinValue} />
        <Slider value={value} onChangeCommitted={onChangeCallback} />
        <InputForSlider value={value[1]} setValue={changeMaxValue} />
      </Box>
    </Box>
  )
}
