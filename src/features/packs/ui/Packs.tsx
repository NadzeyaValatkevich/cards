import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import { setPacksParamsAC } from '../bll/packsActions'
import { initialPackParams } from '../bll/packsReducer'
import {
  entityStatusSelector,
  packsDataSelector,
  paramsSelector,
  profileSelector,
} from '../bll/packsSelectors'
import { addPackTC, getPacksTC } from '../bll/packsThunks'
import { AddPackDataType, PackType } from '../dal/packsAPI'

import { PacksTable } from './PacksTable/PacksTable'

import { setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { sortDir } from 'common/enums/enums'
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
const sortDirFunc = (value: string | undefined): string => {
  if (!value) return sortDir.asc

  return value[0] === sortDir.asc ? sortDir.desc : sortDir.asc
}

export const Packs = () => {
  //Hooks
  const [data, setData] = useState<PackType[]>([])
  const dispatch = useAppDispatch()
  const params = useAppSelector(paramsSelector)
  const packsEntityStatus = useAppSelector(entityStatusSelector)
  const { page, pageCount, cardPacksTotalCount, cardPacks } = useAppSelector(packsDataSelector)
  const { _id: profileId } = useAppSelector(profileSelector)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const paginationProps: PaginationPropsType = {
    page,
    pageCount,
    totalCount: cardPacksTotalCount,
    setParamsPacksOrCardsAC: getPacksTC,
  }
  const sortDirection = sortDirFunc(params.sortPacks)

  //handlers
  const columnSortHandler = async (e: string) => {
    const sort = { sortPacks: `${sortDirection}${e}` }

    await dispatch(getPacksTC(sort))
    SetURLSearchParams(sort)
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
    dispatch(setAppStatusAC(RequestStatusType.loading))
    dispatch(getPacksTC())
    dispatch(setAppStatusAC(RequestStatusType.succeeded))

    return () => {
      dispatch(setPacksParamsAC(initialPackParams))
    }
  }, [])
  useEffect(() => {
    setData(cardPacks)
  }, [cardPacks])
  useEffect(() => {
    SetURLSearchParams(compareObj(params, initialPackParams))
  }, [params])

  return (
    <ContentWrapper withoutPaper>
      <HeaderPacksPage
        addNewPack={addNewPackHandler}
        disabled={packsEntityStatus === RequestStatusType.loading}
      />
      <ToolbarTable />
      {data.length ? (
        <>
          <PacksTable<PackType>
            name={'packsTable'}
            columns={columns}
            data={data}
            sortDirection={sortDirection}
            columnSort={columnSortHandler}
            entityStatus={packsEntityStatus}
            sortParam={params.sortPacks}
            profileId={profileId}
          />
          <Pagination {...paginationProps} />{' '}
        </>
      ) : (
        <Box>
          {'No card packs with the entered name were found. Please change search parameters'}
        </Box>
      )}
    </ContentWrapper>
  )
}
