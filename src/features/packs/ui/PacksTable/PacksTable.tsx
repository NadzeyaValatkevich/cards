import React, { PropsWithChildren, ReactElement, useMemo, useState } from 'react'

import { Link, Skeleton, TableHead, TableSortLabel, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import { Column, TableOptions, TableState, useFlexLayout, useTable } from 'react-table'

import { deletePackTC, updatePackTC } from '../../bll/packsThunks'
import { DeletePackModal } from '../PacksModals/DeletePackModal'
import { EditPackModal } from '../PacksModals/EditPackModal'

import { PacksActionsComponent } from './PacksActionsComponent/PacksActionsComponent'

import { RequestStatusType } from 'app/bll/appReducer'
import { AppRoutes, sortDir } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useStyles } from 'common/styles/PacksTableStyles'
import { setCardsIdAC } from 'features/cards/bll/cardsActions'

export interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  name: string
  columnSortHandler: (name: string, dir: 'asc' | 'desc') => void
  initialState?: Partial<TableState<T>>
  entityStatus: RequestStatusType
  sortParam: string | undefined
  profileId: string | null
}

export const PacksTable = <T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProps<T>>
): ReactElement => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [id, setId] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { classes } = useStyles()

  const {
    columns,
    initialState = {},
    columnSortHandler,
    entityStatus,
    sortParam,
    profileId,
  } = props

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

  const modalEditPackHandler = (packId: string, name: string, privatePack: boolean) => {
    dispatch(updatePackTC({ _id: packId, name, private: privatePack }))
  }

  const modalDeletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId))
  }

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
                    const { key: headerKey, ...getHeaderProps } = column.getHeaderProps()
                    const cellSortDir =
                      sortParam?.includes(column.id) && sortParam?.includes(sortDir.desc)
                        ? 'desc'
                        : 'asc'

                    return (
                      <TableCell key={headerKey} {...getHeaderProps}>
                        {column.defaultCanSort ? (
                          <Tooltip title={column.render('Header')}>
                            <TableSortLabel
                              direction={cellSortDir}
                              onClick={() => columnSortHandler(column.id, cellSortDir)}
                            >
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

                    const enableEdit = data[cell.row.index]?.user_id === profileId
                    const disableStudyBtn = !data[cell.row.index]?.cardsCount

                    const startStudyingActionHandler = (packId: string) => {}
                    const editPackActionHandler = (packId: string) => {
                      setId(packId)
                      setOpenEdit(true)
                    }
                    const deletePackActionHandler = (packId: string) => {
                      setId(packId)
                      setOpenDelete(true)
                    }

                    if (cell.column.render('Header') === 'Actions') {
                      return (
                        <TableCell key={cellKey} {...getCellProps}>
                          {entityStatus === RequestStatusType.loading ? (
                            <Skeleton className={classes.tableBodyCellSkeleton} />
                          ) : (
                            <PacksActionsComponent
                              packId={data[cell.row.index]?._id as string}
                              enableEdit={enableEdit}
                              disableStudyBtn={disableStudyBtn}
                              startStudyingAction={startStudyingActionHandler}
                              editPackAction={editPackActionHandler}
                              deletePackAction={deletePackActionHandler}
                            />
                          )}
                        </TableCell>
                      )
                    }

                    const cardsPackId = data[cell.row.index]?._id

                    const nameOnClickHandler = async () => {
                      dispatch(setCardsIdAC(cardsPackId as string))
                      navigate(AppRoutes.CARDS)
                      // navigate(`${AppRoutes.CARDS}?cardsPack_id=${cardsPackId}`)
                    }

                    if (cell.column.render('Header') === 'Name') {
                      return (
                        <TableCell key={cellKey} {...getCellProps}>
                          {entityStatus === RequestStatusType.loading ? (
                            <Skeleton className={classes.tableBodyCellSkeleton} />
                          ) : (
                            <Link
                              underline={'none'}
                              color={'inherit'}
                              onClick={nameOnClickHandler}
                              sx={{
                                cursor: 'pointer',
                              }}
                            >
                              {cell.render('Cell')}
                            </Link>
                          )}
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell key={cellKey} {...getCellProps}>
                        {entityStatus === RequestStatusType.loading ? (
                          <Skeleton className={classes.tableBodyCellSkeleton} />
                        ) : (
                          cell.render('Cell')
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <EditPackModal
        setOpen={setOpenEdit}
        open={openEdit}
        editPack={modalEditPackHandler}
        id={id}
      />
      <DeletePackModal
        setOpen={setOpenDelete}
        open={openDelete}
        removePackCards={modalDeletePackHandler}
        id={id}
      />
    </>
  )
}
