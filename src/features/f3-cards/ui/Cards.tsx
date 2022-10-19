import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import { SearchPanel } from '../../../common/components/SearchPanel/SearchPanel'

import { RequestStatusType } from 'app/bll/appReducer'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { AppRoutes } from 'common/enums/enums'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { compareObj } from 'common/utils/removeEmptyObj'
import { packSelector, profileSelector } from 'features/f2-packs/bll/packsSelectors'
import {
  setCardPageIsInitAC,
  setCardParamsAC,
  setCardsInitialParamsAC,
  setCardsPackIsDeletedAC,
  setCardsPaginationAC,
  setCardsSearchQuestionAC,
} from 'features/f3-cards/bll/cardsActions'
import { initialCardsParams } from 'features/f3-cards/bll/cardsReducer'
import {
  cardsEntityStatusSelector,
  cardsPackDataSelector,
  cardsPackIsDeletedSelector,
  cardsPackSelector,
  cardsParamsSelector,
} from 'features/f3-cards/bll/cardsSelectors'
import { getCardsTC } from 'features/f3-cards/bll/cardsThunk'
import { CardType } from 'features/f3-cards/dal/cardsAPI'
import { CardsHeader } from 'features/f3-cards/ui/CardsHeader/CardsHeader'
import { CardsTable } from 'features/f3-cards/ui/CardsTable/CardsTable'

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
  const { page, pageCount, cardsTotalCount, packUserId, packName, packDeckCover } =
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
      <CardsHeader
        packName={packName}
        isMyPack={isMyPack}
        disabled={isDisabled}
        packDeckCover={packDeckCover}
        entityStatus={cardsEntityStatus}
        cardsPack={cardsPack}
        searchParam={cardsParams.question}
        learnCallback={learnOnClickHandler}
      />
      {isMyPack && !cardsPack.length ? null : (
        <SearchPanel
          setParams={setCardsSearchQuestionAC}
          searchParam={cardsParams.question}
          sx={{ m: '1.5rem 0', width: '100%' }}
        />
      )}
      {cardsPack.length && cardsEntityStatus !== RequestStatusType.loading ? (
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
        <Box>
          {isMyPack
            ? 'Cards not found. Click add new card to fill this pack'
            : 'Cards not found. Please change the filter settings'}
        </Box>
      )}
    </ContentWrapper>
  )
}
