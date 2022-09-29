import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Backdrop, InputLabel, MenuItem, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { Column, FilterProps, FilterValue, IdType, Row, TableInstance } from 'react-table'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { getPacksTC } from '../bll/packsThunks'

import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { Table } from 'common/components/Table/Table'
import { PersonData } from 'common/utils'

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
function roundedMedian(values: any[]) {
  let min = values[0] || ''
  let max = values[0] || ''

  values.forEach(value => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter(row => {
    const rowValue = row.values[id[0]]

    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'

function SelectColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id },
}: FilterProps<PersonData>) {
  const options = useMemo(() => {
    const options = new Set<any>()

    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })

    return [...Array.from(options.values())]
  }, [id, preFilteredRows])

  return (
    <TextField
      select
      label={render('Header')}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      variant="standard"
    >
      <MenuItem value={''}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

const getMinMax = (rows: Row<PersonData>[], id: IdType<PersonData>) => {
  let min = rows.length ? rows[0].values[id] : 0
  let max = rows.length ? rows[0].values[id] : 0

  rows.forEach(row => {
    min = Math.min(row.values[id], min)
    max = Math.max(row.values[id], max)
  })

  return [min, max]
}

function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<PersonData>) {
  const [min, max] = useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TextField
        name={id}
        label={render('Header')}
        type="range"
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
        variant="standard"
      />
      <Button
        variant="outlined"
        style={{ width: 60, height: 36 }}
        onClick={() => setFilter(undefined)}
      >
        Off
      </Button>
    </div>
  )
}

const useActiveElement = () => {
  const [active, setActive] = useState(document.activeElement)

  const handleFocusIn = () => {
    setActive(document.activeElement)
  }

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [])

  return active
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], render, preFilteredRows, setFilter, id },
}: FilterProps<PersonData>) {
  const [min, max] = useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])
  const focusedElement = useActiveElement()
  const hasFocus =
    focusedElement && (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`)

  return (
    <>
      <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
        {render('Header')}
      </InputLabel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingTop: 5,
        }}
      >
        <TextField
          id={`${id}_1`}
          value={filterValue[0] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value

            setFilter((old: any[] = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
          variant="standard"
        />
        to
        <TextField
          id={`${id}_2`}
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value

            setFilter((old: any[] = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
          variant="standard"
        />
      </div>
    </>
  )
}

// const columns = [
//   {
//     Header: 'Name',
//     columns: [
//       {
//         Header: 'First Name',
//         accessor: 'firstName',
//         aggregate: 'count',
//         Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Names`,
//       },
//       {
//         Header: 'Last Name',
//         accessor: 'lastName',
//         aggregate: 'uniqueCount',
//         filter: 'fuzzyText',
//         Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
//       },
//     ],
//   },
//   {
//     Header: 'Info',
//     columns: [
//       {
//         Header: 'Age',
//         accessor: 'age',
//         width: 50,
//         minWidth: 50,
//         align: 'right',
//         Filter: SliderColumnFilter,
//         filter: 'equals',
//         aggregate: 'average',
//         disableGroupBy: true,
//         defaultCanSort: false,
//         disableSortBy: false,
//         Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} (avg)`,
//       },
//       {
//         Header: 'Visits',
//         accessor: 'visits',
//         width: 50,
//         minWidth: 50,
//         align: 'right',
//         Filter: NumberRangeColumnFilter,
//         filter: 'between',
//         aggregate: 'sum',
//         Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} (total)`,
//       },
//       {
//         Header: 'Status',
//         accessor: 'status',
//         Filter: SelectColumnFilter,
//         filter: 'includes',
//       },
//       {
//         Header: 'Profile Progress',
//         accessor: 'progress',
//         Filter: SliderColumnFilter,
//         filter: filterGreaterThan,
//         aggregate: roundedMedian,
//         Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} (med)`,
//       },
//     ],
//   },
// ] //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

type PacksTableDataType = {
  name: string
  cards: number
  lastUpdated: string
  createdBy: string
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
    accessor: 'cards',
    aggregate: 'uniqueCount',
    filter: 'numeric',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
  },
  {
    Header: 'LastUpdated',
    accessor: 'lastUpdated',
    // Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
  },
  {
    Header: 'Created by',
    accessor: 'createdBy',
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

  const cardPacks = useAppSelector(state => state.packs.cardPacks)

  let data = [] as PacksTableDataType[]

  // const [data] = useState<PersonData[]>(() => makeData(100))

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
    if (cardPacks) {
      data = cardPacks.map(
        c =>
          ({
            name: c.name,
            cards: c.cardsCount,
            lastUpdated: c.updated,
            createdBy: c.user_name,
            actions: 'Some actions',
          } as PacksTableDataType)
      )
    }
  }, [cardPacks])

  if (!cardPacks) return <Backdrop open={true} />

  return (
    <ContentWrapper withoutPaper>
      <Table<PacksTableDataType>
        name={'packsTable'}
        columns={columns}
        data={data}
        onAdd={dummy}
        onEdit={dummy}
        onDelete={dummy}
      />
    </ContentWrapper>
  )
}
