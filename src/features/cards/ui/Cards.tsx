import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import { BackToCardPacks } from '../../../common/components/BackToPackList/BackToCardsPack'
import { setCardsPaginationAC, setCardsSearchQuestionAC } from '../bll/cardsActions'
import {
  cardsEntityStatusSelector,
  cardsPackDataSelector,
  cardsPackSelector,
  cardsParamsSelector,
} from '../bll/cardsSelectors'
import { getCardsTC } from '../bll/cardsThunk'
import { CardType } from '../dal/cardsAPI'

import { CardsTable } from './CardsTable/CardsTable'

import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

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
      // dispatch(setCardsInitialParamsAC())
    }
  }, [])

  useEffect(() => {
    dispatch(getCardsTC())
    SetURLSearchParams({ cardsPack_id: cardsParams.cardsPack_id, page: `${cardsParams.page}` })
  }, [cardsParams])

  return (
    <ContentWrapper withoutPaper>
      <Box>
        <BackToCardPacks />
        <SearchPanel
          setParams={setCardsSearchQuestionAC}
          sx={{
            m: '1.5rem 0',
          }}
        />
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
