import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import {
  setCardsPackIsDeletedAC,
  setCardsPaginationAC,
  setCardsSearchQuestionAC,
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

import { AddNewCardButton } from './CardsHeader/AddNewCardButton/AddNewCardButton'
import { CardsTable } from './CardsTable/CardsTable'

import { BackToCardPacks } from 'common/components/BackToPackList/BackToCardsPack'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { AppRoutes } from 'common/enums/enums'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { MenuEditMyPackCards } from 'features/cards/ui/CardsHeader/MenuEditMyPackCards/MenuEditMyPackCards'
import { profileSelector } from 'features/packs/bll/packsSelectors'

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
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

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
    SetURLSearchParams({ cardsPack_id: cardsParams.cardsPack_id, page: `${cardsParams.page}` })
  }, [cardsParams])

  if (cardsPackIsDeleted) {
    navigate(AppRoutes.PACKS)
    dispatch(setCardsPackIsDeletedAC(false))
  }

  return (
    <ContentWrapper withoutPaper>
      <BackToCardPacks />
      {isMyPack ? (
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Box display={'flex'}>
            <Typography
              variant={'h5'}
              fontWeight={'600'}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              {packName}
            </Typography>
            <MenuEditMyPackCards />
          </Box>
          <AddNewCardButton />
        </Box>
      ) : (
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Typography
            variant={'h5'}
            fontWeight={'600'}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {packName}
          </Typography>
          <Button variant={'contained'}>Learn to pack</Button>
        </Box>
      )}
      <SearchPanel
        setParams={setCardsSearchQuestionAC}
        sx={{
          m: '1.5rem 0',
          width: '100%',
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
    </ContentWrapper>
  )
}
