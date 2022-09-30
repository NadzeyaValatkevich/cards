import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SelectCountRow } from '../selectCountRow/SelectCountRow'

import { PaginationRounded } from 'common/components/pagination/PaginationRounded'
import { useAppDispatch } from 'common/hooks/hooks'
import { CardsParamsType } from 'features/cards/dal/cardsAPI'
import { PacksParamsType } from 'features/packs/dal/packsAPI'

type ParamsType = PacksParamsType | CardsParamsType

export type PaginationPropsType = {
  page: number
  totalCount: number
  pageCount: number
  setParamsPacksOrCardsAC: (params: ParamsType) => any
}

export const Pagination = (props: PaginationPropsType) => {
  const dispatch = useAppDispatch()

  const handleChangePage = (page: number) => {
    dispatch(props.setParamsPacksOrCardsAC({ page }))
  }

  const onChangeCountRow = (valuePage: string) => {
    dispatch(props.setParamsPacksOrCardsAC({ pageCount: +valuePage }))
  }

  return (
    <Box style={{ display: 'flex' }}>
      <Box>
        <PaginationRounded
          totalCount={props.totalCount}
          pageCount={props.pageCount}
          page={props.page}
          onChangePage={handleChangePage}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" sx={{ marginRight: '10px' }}>
          Show
        </Typography>

        <SelectCountRow
          callBackChange={onChangeCountRow}
          pageCount={JSON.stringify(props.pageCount)}
        />

        <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Cards per page
        </Typography>
      </Box>
    </Box>
  )
}
