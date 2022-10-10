import { ChangeEvent, SyntheticEvent } from 'react'

import { TextField, Theme, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { SxProps } from '@mui/system'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setPacksMinMaxAC } from 'features/packs/bll/packsActions'

const inputSx: SxProps<Theme> = {
  width: '80px',
}

export const SliderForPacks = () => {
  const dispatch = useAppDispatch()
  const { min, max } = useAppSelector(state => state.packs.params)

  const sliderOnChangeHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      dispatch(setPacksMinMaxAC(newValue[0], newValue[1]))
    }
  }
  const minValueOnChangeHandler = (
    newValue: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPacksMinMaxAC(+newValue.currentTarget.value))
  }
  const maxValueOnChangeHandler = (
    newValue: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPacksMinMaxAC(undefined, +newValue.currentTarget.value))
  }

  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }}>Number of cards</Typography>
      <Box sx={{ display: 'flex', width: '300px', gap: '15px' }}>
        <TextField
          type={'number'}
          value={min}
          variant={'standard'}
          onChange={minValueOnChangeHandler}
          sx={inputSXProps}
          disabled={isDisabled}
          inputProps={{
            style: {
              fontWeight: 600,
            },
          }}
        />
        <Slider value={[min!, max!]} onChangeCommitted={sliderOnChangeHandler} />
        <TextField
          type={'number'}
          value={max}
          variant={'standard'}
          onChange={maxValueOnChangeHandler}
          sx={inputSXProps}
          disabled={isDisabled}
          inputProps={{
            style: {
              fontWeight: 600,
            },
          }}
        />
      </Box>
    </Box>
  )
}
