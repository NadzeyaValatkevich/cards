import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import {
  setCardPageIsInitAC,
  setCardParamsAC,
  setCardsInitialParamsAC,
  setCardsPackIsDeletedAC,
  setCardsPaginationAC,
} from '../bll/cardsActions'
import { initialCardsParams } from '../bll/cardsReducer'
import {
  cardsEntityStatusSelector,
  cardsPackDataSelector,
  cardsPackIsDeletedSelector,
  cardsPackSelector,
  cardsParamsSelector,
} from '../bll/cardsSelectors'
import { getCardsTC } from '../bll/cardsThunk'
import { CardType } from '../dal/cardsAPI'

import { CardsTable } from './CardsTable/CardsTable'
import { HeaderCardsPage } from './HeaderCardsPage/HeaderCardsPage'

import { RequestStatusType } from 'app/bll/appReducer'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { AppRoutes } from 'common/enums/enums'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { compareObj } from 'common/utils/removeEmptyObj'
import { profileSelector } from 'features/f2-packs/bll/packsSelectors'

const columnsAllCards: Column<CardType>[] = [
  {
    Header: 'Question',
    accessor: 'question',
    defaultCanSort: true,
    width: 350,
  },
  {
    Header: 'Answer',
    accessor: 'answer',
    defaultCanSort: true,
    minWidth: 350,
  },
  {
    Header: 'Last Updated',
    accessor: 'updated',
    defaultCanSort: true,
    width: 150,
  },
  {
    Header: 'Grade',
    accessor: 'grade',
    width: 150,
  },
]
const columnsMyCards: Column<CardType>[] = [
  {
    Header: 'Question',
    accessor: 'question',
    defaultCanSort: true,
    width: 300,
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
    width: 150,
  },
  {
    Header: 'Grade',
    accessor: 'grade',
    defaultCanSort: true,
    width: 150,
  },
  {
    Header: ' ',
    id: 'actions',
    width: 100,
  },
]

export const Cards = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cardsPack = useAppSelector(cardsPackSelector)
  const { page, pageCount, cardsTotalCount, packUserId, packName } =
    useAppSelector(cardsPackDataSelector)
  const { _id: profileId } = useAppSelector(profileSelector)
  const cardsParams = useAppSelector(cardsParamsSelector)
  const cardsEntityStatus = useAppSelector(cardsEntityStatusSelector)
  const cardsPackIsDeleted = useAppSelector(cardsPackIsDeletedSelector)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const { cardsPack_id } = cardsParams
  const isMyPack = packUserId === profileId
  const isDisabled = cardsEntityStatus === RequestStatusType.loading

  const columns: Column<CardType>[] = isMyPack ? columnsMyCards : columnsAllCards

  const paginationProps: PaginationPropsType = {
    page: page.toString(),
    pageCount: pageCount.toString(),
    totalCount: cardsTotalCount,
    setParamsPacksOrCardsAC: setCardsPaginationAC,
  }

  useEffect(() => {
    dispatch(setCardPageIsInitAC(true))
    SetURLSearchParams({ cardsPack_id: cardsParams.cardsPack_id })

    return () => {
      dispatch(setCardPageIsInitAC(false))
      dispatch(setCardsInitialParamsAC())
    }
  }, [])

  useEffect(() => {
    const currentParam = compareObj(cardsParams, initialCardsParams)

    dispatch(getCardsTC())
    SetURLSearchParams(currentParam)
  }, [cardsParams])
  useEffect(() => {
    const urlParams = Object.fromEntries(URLSearchParams)
    const compareParam = compareObj(urlParams, cardsParams)

    if (Object.keys(compareParam).length) {
      dispatch(setCardParamsAC(compareParam))
    }
  }, [URLSearchParams])

  if (cardsPackIsDeleted) {
    navigate(AppRoutes.PACKS)
    dispatch(setCardsPackIsDeletedAC(false))
  }

  const learnOnClickHandler = async () => {
    navigate(AppRoutes.LEARN)
  }

  return (
    <ContentWrapper withoutPaper>
      <HeaderCardsPage
        packName={packName}
        cardsPack_id={cardsPack_id}
        isMyPack={isMyPack}
        disabled={isDisabled}
        searchParam={cardsParams.cardQuestion}
        learnCallback={learnOnClickHandler}
      />
      {cardsPack.length ? (
        <>
          <CardsTable
            columns={columns}
            data={cardsPack}
            entityStatus={cardsEntityStatus}
            sortParam={cardsParams.sortCards}
          />
        </>
      ) : (
        <Box>{'Cards not found. Please change your search parameters'}</Box>
      )}
      <Pagination {...paginationProps} />
    </ContentWrapper>
  )
}
