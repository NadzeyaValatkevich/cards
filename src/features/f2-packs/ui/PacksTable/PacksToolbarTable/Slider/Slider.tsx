import { ChangeEvent, SyntheticEvent } from 'react'

import { TextField, Theme, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { SxProps } from '@mui/system'

import { RequestStatusType } from '../../../../../../app/bll/appReducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setPacksMinMaxAC } from 'features/f2-packs/bll/packsActions'
import {
  packsDataSelector,
  packsEntityStatusSelector,
  packsParamsSelector,
} from 'features/f2-packs/bll/packsSelectors'

const inputSXProps: SxProps<Theme> = {
  width: '5rem',
}

export const SliderForPacks = () => {
  const dispatch = useAppDispatch()
  const { min, max } = useAppSelector(packsParamsSelector)
  const packsEntityStatus = useAppSelector(packsEntityStatusSelector)
  const { minCardsCount, maxCardsCount } = useAppSelector(packsDataSelector)

  const isDisabled = packsEntityStatus === RequestStatusType.loading

  const sliderOnChangeHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      dispatch(setPacksMinMaxAC(newValue[0].toString(), newValue[1].toString()))
    }
  }
  const minValueOnChangeHandler = (
    newValue: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPacksMinMaxAC(newValue.currentTarget.value))
  }
  const maxValueOnChangeHandler = (
    newValue: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPacksMinMaxAC(undefined, newValue.currentTarget.value))
  }

  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }}>Number of cards</Typography>
      <Box sx={{ display: 'flex', width: '18.75rem', gap: '1rem', alignItems: 'center' }}>
        <TextField
          type={'text'}
          value={min ? +min : +minCardsCount}
          variant={'outlined'}
          size={'small'}
          onChange={minValueOnChangeHandler}
          sx={inputSXProps}
          disabled={isDisabled}
          inputProps={{
            style: {
              fontWeight: 600,
            },
          }}
        />
        <Slider
          value={[min ? +min : +minCardsCount, max ? +max : +maxCardsCount]}
          defaultValue={[minCardsCount, maxCardsCount]}
          onChangeCommitted={sliderOnChangeHandler}
          min={+minCardsCount}
          max={+maxCardsCount}
          disabled={isDisabled}
        />
        <TextField
          type={'text'}
          value={max ? +max : +maxCardsCount}
          variant={'outlined'}
          size={'small'}
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
