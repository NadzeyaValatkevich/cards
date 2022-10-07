import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import { setPacksInitialParamsAC, setPacksPaginationAC, setPacksSortAC } from '../bll/packsActions'
import { initialPackParams } from '../bll/packsReducer'
import {
  packsDataSelector,
  packsEntityStatusSelector,
  packsParamsSelector,
  profileSelector,
} from '../bll/packsSelectors'
import { addPackTC, getPacksTC } from '../bll/packsThunks'
import { AddPackDataType, PackType } from '../dal/packsAPI'

import { PacksTable } from './PacksTable/PacksTable'

import { RequestStatusType } from 'app/bll/appReducer'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { dateParser } from 'common/utils/dateParser'
import { compareObj } from 'common/utils/removeEmptyObj'
import { HeaderPacksPage } from 'features/packs/ui/HeaderPacksPage/HeaderPacksPage'
import { ToolbarTable } from 'features/packs/ui/PacksTable/PacksToolbarTable/ToolbarTable'

const columns: Column<PackType>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    defaultCanSort: true,
    width: 250,
  },
  {
    Header: 'Cards',
    accessor: 'cardsCount',
    defaultCanSort: true,
    width: 200,
  },
  {
    Header: 'Last Updated',
    accessor: 'updated',
    defaultCanSort: true,
    width: 200,
  },
  {
    Header: 'Created by',
    accessor: 'user_name',
    defaultCanSort: true,
    width: 200,
  },
  {
    Header: 'Actions',
    width: 130,
  },
]

export const Packs = () => {
  //Hooks
  const dispatch = useAppDispatch()
  const params = useAppSelector(packsParamsSelector)
  const packsEntityStatus = useAppSelector(packsEntityStatusSelector)
  const { page, pageCount, cardPacksTotalCount, cardPacks } = useAppSelector(packsDataSelector)
  const { _id: profileId } = useAppSelector(profileSelector)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const paginationProps: PaginationPropsType = {
    page,
    pageCount,
    totalCount: cardPacksTotalCount,
    setParamsPacksOrCardsAC: setPacksPaginationAC,
  }
  //handlers
  const columnSortHandler = (name: string, dir: 'asc' | 'desc') => {
    dispatch(setPacksSortAC(name, dir))
  }
  const addNewPackHandler = () => {
    const date = dateParser(new Date(Date.now()).toISOString())
    const newPack: AddPackDataType = {
      name: `Added new pack at ${date}`,
      deckCover: '',
      private: false,
    }

    dispatch(addPackTC(newPack))
  }

  //useEffect
  useEffect(() => {
    dispatch(getPacksTC())

    return () => {
      dispatch(setPacksInitialParamsAC())
    }
  }, [])
  useEffect(() => {
    dispatch(getPacksTC())
    SetURLSearchParams(compareObj(params, initialPackParams))
  }, [params])

  return (
    <ContentWrapper withoutPaper>
      <HeaderPacksPage
        addNewPack={addNewPackHandler}
        disabled={packsEntityStatus === RequestStatusType.loading}
      />
      <ToolbarTable />
      {cardPacks.length ? (
        <>
          <PacksTable<PackType>
            name={'packsTable'}
            columns={columns}
            data={cardPacks}
            columnSortHandler={columnSortHandler}
            entityStatus={packsEntityStatus}
            sortParam={params.sortPacks}
            profileId={profileId}
          />
          <Pagination {...paginationProps} />
        </>
      ) : (
        <Box>
          {'No card packs with the entered name were found. Please change search parameters'}
        </Box>
      )}
    </ContentWrapper>
  )
}
