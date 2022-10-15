import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import { Column } from 'react-table'

import {
  setPacksInitialParamsAC,
  setPacksPaginationAC,
  setPacksParamsAC,
  setPacksSortAC,
} from '../bll/packsActions'
import { initialPackParams } from '../bll/packsReducer'
import {
  packsDataSelector,
  packsEntityStatusSelector,
  packsParamsSelector,
  profileSelector,
} from '../bll/packsSelectors'
import { getPacksTC } from '../bll/packsThunks'
import { PackType } from '../dal/packsAPI'

import { PacksTable } from './PacksTable/PacksTable'

import { RequestStatusType } from 'app/bll/appReducer'
import { Pagination, PaginationPropsType } from 'common/components/Pagination/Pagination'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { compareObj } from 'common/utils/removeEmptyObj'
import { PacksHeader } from 'features/f2-packs/ui/PacksHeader/PacksHeader'
import { ToolbarTable } from 'features/f2-packs/ui/PacksTable/PacksToolbarTable/ToolbarTable'

const columns: Column<PackType>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    defaultCanSort: true,
    width: 300,
  },
  {
    Header: 'Cards',
    accessor: 'cardsCount',
    defaultCanSort: true,
    width: 150,
  },
  {
    Header: 'Last Updated',
    accessor: 'updated',
    defaultCanSort: true,
    width: 150,
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
    page: page.toString(),
    pageCount: pageCount.toString(),
    totalCount: cardPacksTotalCount,
    setParamsPacksOrCardsAC: setPacksPaginationAC,
  }
  //handlers
  const columnSortHandler = (name: string, dir: 'asc' | 'desc') => {
    dispatch(setPacksSortAC(name, dir))
  }

  //useEffect
  useEffect(() => {
    return () => {
      dispatch(setPacksInitialParamsAC())
    }
  }, [])
  useEffect(() => {
    const currentParam = compareObj(params, initialPackParams)

    if (Object.keys(currentParam).length) {
      dispatch(getPacksTC())
      SetURLSearchParams(currentParam)
    }
  }, [params])
  useEffect(() => {
    const urlParams = Object.fromEntries(URLSearchParams)
    const compareParam = compareObj(urlParams, params)

    if (Object.keys(compareParam).length) {
      dispatch(setPacksParamsAC(compareParam))
    }
  }, [URLSearchParams])

  return (
    <ContentWrapper withoutPaper>
      <PacksHeader disabled={packsEntityStatus === RequestStatusType.loading} />
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
        <Box>{'Card packs not found. Please change the filter settings'}</Box>
      )}
    </ContentWrapper>
  )
}
