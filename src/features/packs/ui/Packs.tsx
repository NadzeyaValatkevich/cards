import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import { setPacksParamsAC } from '../bll/packsActions'
import { initialPackParams } from '../bll/packsReducer'
import { addPackTC, getPacksTC } from '../bll/packsThunks'
import { AddPackDataType, PackType } from '../dal/packsAPI'

import { PacksTable } from './PacksTable/PacksTable'

import { RequestStatusType } from 'app/bll/appReducer'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { sortDir } from 'common/enums/enums'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
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
    // accessor: 'actions',
    // Cell: <PacksActionsComponent />,
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
  const params = useAppSelector(state => state.packs.params)
  const entityStatus = useAppSelector(state => state.packs.entityStatus)
  const { page, pageCount, cardPacksTotalCount, cardPacks } = useAppSelector(
    state => state.packs.packsData
  )
  const profileId = useAppSelector(state => state.profile._id)
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
    dispatch(getPacksTC())

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
        disabled={entityStatus === RequestStatusType.loading}
      />
      <ToolbarTable />
      {data[0] ? (
        <>
          <PacksTable<PackType>
            name={'packsTable'}
            columns={columns}
            data={data}
            sortDirection={sortDirection}
            columnSort={columnSortHandler}
            entityStatus={entityStatus}
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
