import React, { useCallback, useEffect, useState } from 'react'

import { Column, TableInstance } from 'react-table'

import { getPacksTC } from '../bll/packsThunks'
import { PackType } from '../dal/packsAPI'

import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { PaginationPropsType } from 'common/components/pagination/Pagination'
import { Table } from 'common/components/Table/Table'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'

type PacksTableDataType = PackType & {
  actions: any
}

const columns: Column<PacksTableDataType>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    aggregate: 'count',
    filter: 'fuzzyText',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Names`,
  },
  {
    Header: 'Cards',
    accessor: 'cardsCount',
    aggregate: 'uniqueCount',
    filter: 'numeric',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
  },
  {
    Header: 'Last Updated',
    accessor: 'updated',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
  },
  {
    Header: 'Created by',
    accessor: 'user_name',
    aggregate: 'uniqueCount',
    filter: 'fuzzyText',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
  },
]

export const Packs = () => {
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(state => state.packs.packsData.cardPacks)

  const { page, pageCount, cardPacksTotalCount } = useAppSelector(state => state.packs.packsData)

  const paginationProps: PaginationPropsType = {
    page,
    pageCount,
    totalCount: cardPacksTotalCount,
    setParamsPacksOrCardsAC: getPacksTC,
  }

  const [data, setData] = useState<PacksTableDataType[]>([])

  const dummy = useCallback(
    (instance: TableInstance<PacksTableDataType>) => () => {
      console.log('Selected')
    },
    []
  )

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  useEffect(() => {
    // if (!data.length) {
    // debugger
    const tableData = cardPacks.map(
      c =>
        ({
          ...c,
          actions: '',
        } as PacksTableDataType)
    )

    setData(tableData)
    // }
  }, [cardPacks])

  return (
    <ContentWrapper withoutPaper>
      <Table<PacksTableDataType>
        name={'packsTable'}
        columns={columns}
        data={data || ([] as PacksTableDataType[])}
        onAdd={dummy}
        onEdit={dummy}
        onDelete={dummy}
        pagination={paginationProps}
      />
    </ContentWrapper>
  )
}
