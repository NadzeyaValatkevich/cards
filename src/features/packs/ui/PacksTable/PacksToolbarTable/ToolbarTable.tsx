import React from 'react'

import Box from '@mui/material/Box'

import { EraseFilters } from './EraseFilters/EraseFilters'
import { SearchPanel } from './SearchPanel/SearchPanel'

export const ToolbarTable = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      margin={'1.5rem 0'}
    >
      <SearchPanel />
      <Box>Show my cards buttons</Box>
      <Box>Number of cards selector</Box>
      <EraseFilters />
    </Box>
  )
}
