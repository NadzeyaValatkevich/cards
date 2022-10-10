import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { useParams, useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import {
  cardsEntityStatusSelector,
  cardsPackDataSelector,
  cardsPackSelector,
  cardsParamsSelector,
} from '../bll/cardsSelectors'

import { CardsTable } from './CardsTable/CardsTable'

import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setCardsInitialParamsAC, setCardsPaginationAC } from 'features/cards/bll/cardsActions'
import { getCardsTC } from 'features/cards/bll/cardsThunk'
import { CardType } from 'features/cards/dal/cardsAPI'
import { HeaderCardsPage } from 'features/cards/ui/HeaderCardsPage/HeaderCardsPage'

const columns: Column<CardType>[] = [
  {
    Header: 'Question',
    accessor: 'question',
    defaultCanSort: true,
    width: 250,
  },
  {
    Header: 'Answer',
    accessor: 'answer',
    defaultCanSort: true,
    minWidth: 300,
  },
  {
    Header: 'Last Updated',
    accessor: 'updated',
    defaultCanSort: true,
    width: 200,
  },
  {
    Header: 'Grade',
    accessor: 'grade',
    width: 200,
  },
  // {
  //   Header: '',
  //   width: 100,
  // },
]

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardsPackSelector)
  const { page, pageCount, cardsTotalCount, cards, packUserId } =
    useAppSelector(cardsPackDataSelector)
  const cardsParams = useAppSelector(cardsParamsSelector)
  const cardsEntityStatus = useAppSelector(cardsEntityStatusSelector)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const paginationProps: PaginationPropsType = {
    page,
    pageCount,
    totalCount: cardsTotalCount,
    setParamsPacksOrCardsAC: setCardsPaginationAC,
  }

  useEffect(() => {
    SetURLSearchParams({ cardsPack_id: cardsParams.cardsPack_id })

    return () => {
      dispatch(setCardsInitialParamsAC())
    }
  }, [])

  useEffect(() => {
    dispatch(getCardsTC())
    SetURLSearchParams({ cardsPack_id: cardsParams.cardsPack_id, page: `${cardsParams.page}` })
  }, [cardsParams])

  return (
    <ContentWrapper withoutPaper>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <HeaderCardsPage id={URLSearchParams.get('cardsPack_id')} packUserId={packUserId} />
        <CardsTable
          name={'cardsTable'}
          columns={columns}
          data={cardsPack}
          columnSort={() => {}}
          entityStatus={cardsEntityStatus}
          sortDirection={''}
          profileId={''}
          sortParam={''}
        />
        <Pagination {...paginationProps} />
      </Box>
    </ContentWrapper>
  )
}
