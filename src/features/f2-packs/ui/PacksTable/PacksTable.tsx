import React, { PropsWithChildren, ReactElement, useMemo, useState } from 'react'

import { Link, TableHead, TableSortLabel, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
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
import { SkeletonComponent } from 'common/components/SkeletonComponent/SkeletonComponent'
import { AppRoutes, sortDir } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useStyles } from 'common/styles/TableStyles'
import { sortFunc } from 'common/utils/sortFunc'
import { setCardsIdAC } from 'features/f3-cards/bll/cardsActions'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [activeModalEdit, setActiveModalEdit] = useState<boolean>(false)
  const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
  const [id, setId] = useState('')
  const [packName, setPackName] = useState('')

  const editPack = (id: string, name: string, privatePack: boolean) => {
    dispatch(updatePackTC({ _id: id, name: name, private: privatePack }))
  }

  const removePackCards = (pack_id: string) => {
    dispatch(deletePackTC(pack_id))
  }

  const { classes } = useStyles()

  const {
    columns,
    initialState = {},
    columnSortHandler,
    entityStatus,
    sortParam,
    profileId,
  } = props
  const isLoading = entityStatus === RequestStatusType.loading

  const defaultColumn = useMemo<Partial<Column<T>>>(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 300,
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

                    const sortHandler = () => columnSortHandler(column.id, sortFunc(cellSortDir))

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

                    const enableEdit = data[cell.row.index]?.user_id === profileId
                    const cardsPackId = data[cell.row.index]?._id as string
                    const cardsPackCount = data[cell.row.index]?.cardsCount as number
                    const cardsPackName = data[cell.row.index]?.name as string

                    const cardsCover = data[cell.row.index]?.deckCover as string

                    const startStudyingActionHandler = (packId: string) => {
                      dispatch(setCardsIdAC(packId))
                      navigate(AppRoutes.LEARN)
                    }
                    const editPackActionHandler = (packId: string) => {
                      setId(packId)
                      setActiveModalEdit(true)
                    }
                    const deletePackActionHandler = (packId: string) => {
                      setId(packId)
                      setPackName(cardsPackName)
                      setActiveModalDelete(true)
                    }

                    if (cell.column.render('Header') === 'Actions') {
                      return (
                        <TableCell key={cellKey} {...getCellProps}>
                          <SkeletonComponent status={isLoading}>
                            <PacksActionsComponent
                              packId={cardsPackId}
                              enableEdit={enableEdit}
                              disableStudyBtn={!cardsPackCount}
                              startStudyingAction={startStudyingActionHandler}
                              editPackAction={editPackActionHandler}
                              deletePackAction={deletePackActionHandler}
                            />
                          </SkeletonComponent>
                        </TableCell>
                      )
                    }

                    const nameOnClickHandler = () => {
                      dispatch(setCardsIdAC(cardsPackId))
                      navigate(AppRoutes.CARDS)
                    }

                    if (cell.column.render('Header') === 'Name') {
                      return (
                        <TableCell key={cellKey} {...getCellProps}>
                          <SkeletonComponent status={isLoading}>
                            <Box display={'flex'} alignItems={'center'}>
                              <Box
                                component={'img'}
                                src={cardsCover}
                                sx={{
                                  width: '3.3rem',
                                  height: '2rem',
                                  mr: '.5rem',
                                }}
                              />
                              {cardsPackCount || enableEdit ? (
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
                              ) : (
                                cell.render('Cell')
                              )}
                            </Box>
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
      <EditPackModal
        setOpen={setActiveModalEdit}
        open={activeModalEdit}
        editPack={editPack}
        id={id}
      />
      <DeletePackModal
        setOpen={setActiveModalDelete}
        open={activeModalDelete}
        removePackCards={removePackCards}
        id={id}
        packName={packName}
      />
    </>
  )
}
