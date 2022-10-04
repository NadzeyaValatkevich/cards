import React from 'react'

import Box from '@mui/material/Box'

import { getPacksTC } from '../../../bll/packsThunks'

import { EraseFilters } from './EraseFilters/EraseFilters'
import { MyAllPacks } from './OwnPacks/OwnPacks'
import { SliderForPacks } from './Slider/Slider'

import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'

export const ToolbarTable = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      margin={'1.5rem 0'}
    >
      <SearchPanel search={'packName'} setParams={getPacksTC} />
      <MyAllPacks />
      <SliderForPacks />
      <EraseFilters />
    </Box>
  )
}
