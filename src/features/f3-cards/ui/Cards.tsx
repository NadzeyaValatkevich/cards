import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import {
  setCardsInitialParamsAC,
  setCardsPackIsDeletedAC,
  setCardsPaginationAC,
} from '../bll/cardsActions'
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
import { BackToCardPacks } from 'common/components/BackToPackList/BackToCardsPack'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { AppRoutes } from 'common/enums/enums'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
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
  const { page, pageCount, cardsTotalCount, cards, packUserId, packName } =
    useAppSelector(cardsPackDataSelector)
  const { _id: profileId } = useAppSelector(profileSelector)
  const cardsParams = useAppSelector(cardsParamsSelector)
  const cardsEntityStatus = useAppSelector(cardsEntityStatusSelector)
  const cardsPackIsDeleted = useAppSelector(cardsPackIsDeletedSelector)
  const status = useAppSelector(cardsEntityStatusSelector)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const { cardsPack_id, ...restCardsParams } = cardsParams
  const isMyPack = packUserId === profileId
  const isDisabled = cardsEntityStatus === RequestStatusType.loading

  const columns: Column<CardType>[] = isMyPack ? columnsMyCards : columnsAllCards

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
    SetURLSearchParams({
      cardsPack_id: cardsPack_id,
      page: `${cardsParams.page}`,
      pageCount: `${cardsParams.pageCount}`,
      sortCards: `${cardsParams.sortCards}`,
    })
  }, [cardsParams])

  if (cardsPackIsDeleted) {
    navigate(AppRoutes.PACKS)
    dispatch(setCardsPackIsDeletedAC(false))
  }

  return (
    <ContentWrapper withoutPaper>
      <BackToCardPacks />
      <HeaderCardsPage
        cardsPack={cardsPack}
        packName={packName}
        cardsPack_id={cardsPack_id}
        isMyPack={isMyPack}
        disabled={isDisabled}
      />
      {status !== RequestStatusType.loading &&
        (cardsPack.length ? (
          <>
            <CardsTable
              columns={columns}
              data={cardsPack}
              entityStatus={cardsEntityStatus}
              sortParam={cardsParams.sortCards}
            />
            <Pagination {...paginationProps} />
          </>
        ) : (
          <Box display={'flex'}>
            <Typography>This pack is empty.</Typography>
            {isMyPack && <Typography> Click add new card to fill this packs</Typography>}
          </Box>
        ))}
    </ContentWrapper>
  )
}
