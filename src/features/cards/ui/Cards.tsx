import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import { RequestStatusType } from '../../../app/bll/appReducer'

import { BackToCardsPacks } from 'common/components/BackToCardsPack/BackToCardsPack'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { AppRoutes } from 'common/enums/enums'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setCardsPackIsDeletedAC, setCardsPaginationAC } from 'features/cards/bll/cardsActions'
import {
  cardsEntityStatusSelector,
  cardsPackDataSelector,
  cardsPackSelector,
  cardsParamsSelector,
} from 'features/cards/bll/cardsSelectors'
import { getCardsTC } from 'features/cards/bll/cardsThunk'
import { CardType } from 'features/cards/dal/cardsAPI'
import { CardsTable } from 'features/cards/ui/CardsTable/CardsTable'
import { HeaderCardsPage } from 'features/cards/ui/HeaderCardsPage/HeaderCardsPage'
import { cardsPackIsDeletedSelector, profileSelector } from 'features/packs/bll/packsSelectors'

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
  const { _id: profileId } = useAppSelector(profileSelector)
  const { page, pageCount, cardsTotalCount, cards, packUserId, packName } =
    useAppSelector(cardsPackDataSelector)
  const cardsParams = useAppSelector(cardsParamsSelector)
  const cardsEntityStatus = useAppSelector(cardsEntityStatusSelector)
  const cardsPackIsDeleted = useAppSelector(cardsPackIsDeletedSelector)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const { cardsPack_id, ...restCardsParams } = cardsParams
  const isMyPack = packUserId === profileId

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
      // dispatch(setCardsInitialParamsAC())
    }
  }, [])

  useEffect(() => {
    dispatch(getCardsTC())
    SetURLSearchParams({
      cardsPack_id: cardsParams.cardsPack_id,
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
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <BackToCardsPacks />
        <HeaderCardsPage
          packName={packName}
          cardsPack_id={cardsPack_id}
          isMyPack={isMyPack}
          disabled={cardsEntityStatus === RequestStatusType.loading}
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
      </Box>
    </ContentWrapper>
  )
}
