import React, { PropsWithChildren, ReactElement, useMemo, useState } from 'react'

import { Rating, TableHead, TableSortLabel, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { Column, TableOptions, TableState, useFlexLayout, useTable } from 'react-table'

import { deleteCardTC, updateCardTC } from '../../bll/cardsThunk'
import { DeleteCardModal } from '../CardsModals/DeleteCardModal'
import { EditCardModal } from '../CardsModals/EditCardModal/EditCardModal'

import { CardsActionsComponent } from './CardsActionsComponent/CardsActionsComponent'

import { RequestStatusType } from 'app/bll/appReducer'
import { SkeletonComponent } from 'common/components/SkeletonComponent/SkeletonComponent'
import { sortDir } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useStyles } from 'common/styles/TableStyles'
import { sortFunc } from 'common/utils/sortFunc'
import { setCardsSortAC } from 'features/f3-cards/bll/cardsActions'

export interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  initialState?: Partial<TableState<T>>
  entityStatus: RequestStatusType
  sortParam: string | undefined
}

export type modalObjectType = {
  _id: string
  question?: string
  questionImg?: string
  answer?: string
  answerImg?: string
}

export const CardsTable = <T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProps<T>>
): ReactElement => {
  const dispatch = useAppDispatch()

  const [_id, setId] = useState('')
  const [activeModalEdit, setActiveModalEdit] = useState<boolean>(false)
  const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)

  const updateCard = (modalObject: modalObjectType) => {
    dispatch(updateCardTC(modalObject))
  }
  const deleteCard = (_id: string) => {
    dispatch(deleteCardTC(_id))
  }

  const { classes } = useStyles()

  const { columns, initialState = {}, entityStatus, sortParam } = props
  const isLoading = entityStatus === RequestStatusType.loading
  const defaultColumn = useMemo<Partial<Column<T>>>(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 250,
    }),
    []
  )

  const instance = useTable<T>(
    {
      ...props,
      columns,
      defaultColumn,
      initialState,
    },
    useFlexLayout
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, data } = instance

  const { role: tableRole, ...tableProps } = getTableProps()
  const { role: tableBodyRole, ...tableBodyProps } = getTableBodyProps()

  return (
    <>
      <TableContainer component={Paper}>
        <Table role={tableRole} {...tableProps}>
          <TableHead>
            {headerGroups.map(headerGroup => {
              const { key: headerGroupKey, ...getHeaderGroupProps } =
                headerGroup.getHeaderGroupProps({ className: classes.tableHead })

              return (
                <TableRow key={headerGroupKey} {...getHeaderGroupProps}>
                  {headerGroup.headers.map(column => {
                    const { key: headerKey, ...getHeaderProps } = column.getHeaderProps({
                      className: classes.tableHeadCell,
                    })

                    const cellSortDir =
                      sortParam?.includes(column.id) && sortParam?.includes(sortDir.desc)
                        ? 'desc'
                        : 'asc'

                    const sortHandler = () =>
                      dispatch(setCardsSortAC(column.id, sortFunc(cellSortDir)))

                    return (
                      <TableCell key={headerKey} {...getHeaderProps}>
                        {column.defaultCanSort ? (
                          <Tooltip title={column.render('Header')}>
                            <TableSortLabel direction={cellSortDir} onClick={sortHandler}>
                              {column.render('Header')}
                            </TableSortLabel>
                          </Tooltip>
                        ) : (
                          column.render('Header')
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHead>
          <TableBody {...tableBodyProps}>
            {rows.map(row => {
              prepareRow(row)
              const { key: rowKey, ...getRowProps } = row.getRowProps()

              return (
                <TableRow key={rowKey} {...getRowProps}>
                  {row.cells.map(cell => {
                    const { key: cellKey, ...getCellProps } = cell.getCellProps({
                      className: classes.tableBodyCell,
                    })

                    const editCardActionHandler = (cardId: string) => {
                      setId(cardId)
                      setActiveModalEdit(true)
                    }
                    const deleteCardActionHandler = (cardId: string) => {
                      setId(cardId)
                      setActiveModalDelete(true)
                    }

                    if (cell.column.id === 'actions') {
                      return (
                        <TableCell key={cellKey} {...getCellProps}>
                          <SkeletonComponent status={isLoading}>
                            <CardsActionsComponent
                              cardId={data[cell.row.index]?._id as string}
                              editCardAction={editCardActionHandler}
                              deleteCardAction={deleteCardActionHandler}
                            />
                          </SkeletonComponent>
                        </TableCell>
                      )
                    }
                    if (cell.column.render('Header') === 'Grade') {
                      return (
                        <TableCell key={cellKey} {...getCellProps}>
                          <SkeletonComponent status={isLoading}>
                            <Rating value={cell.value} readOnly />
                          </SkeletonComponent>
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell key={cellKey} {...getCellProps}>
                        <SkeletonComponent status={isLoading}>
                          {cell.render('Cell')}
                        </SkeletonComponent>
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <EditCardModal
        setOpen={setActiveModalEdit}
        open={activeModalEdit}
        updateCard={updateCard}
        _id={_id}
      />
      <DeleteCardModal
        setOpen={setActiveModalDelete}
        open={activeModalDelete}
        deleteCard={deleteCard}
        _id={_id}
      />
    </>
  )
}
