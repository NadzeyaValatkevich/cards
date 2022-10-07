import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SelectCountRow } from '../SelectCountRow/SelectCountRow'

import { PaginationRounded } from 'common/components/Pagination/PaginationRounded'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export type PaginationParamsType = {
  page?: number
  pageCount?: number
}

export type PaginationPropsType = {
  page: number
  totalCount: number
  pageCount: number
  setParamsPacksOrCardsAC: (params: PaginationParamsType) => any
}

export const Pagination: FC<PaginationPropsType> = ({
  pageCount,
  page,
  totalCount,
  setParamsPacksOrCardsAC,
}) => {
  const dispatch = useAppDispatch()

  const handleChangePage = (page: number) => {
    dispatch(setParamsPacksOrCardsAC({ page }))
  }

  const onChangeCountRow = (valuePage: string) => {
    dispatch(setParamsPacksOrCardsAC({ pageCount: +valuePage }))
  }

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        margin: '36px 0',
      }}
    >
      <Box>
        <PaginationRounded
          totalCount={totalCount}
          pageCount={pageCount}
          page={page}
          onChangePage={handleChangePage}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ marginRight: '10px' }}>
          Show
        </Typography>

        <SelectCountRow callBackChange={onChangeCountRow} pageCount={JSON.stringify(pageCount)} />

        <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Cards per page
        </Typography>
      </Box>
    </Box>
  )
}
