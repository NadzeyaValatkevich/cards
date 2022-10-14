import React from 'react'

import { Pagination } from '@mui/material'

type PaginationTypes = {
  totalCount: number
  pageCount: string
  page: string
  onChangePage: (page: string) => void
}

export const PaginationRounded = (props: PaginationTypes) => {
  let count = 1
  let countCards = Math.ceil(props.totalCount / +props.pageCount)

  if (countCards) count = countCards
  const onChangeHandler = (event: object, page: number) => {
    props.onChangePage(page.toString())
  }

  return (
    <div>
      <Pagination count={count} shape="rounded" onChange={onChangeHandler} page={+props.page} />
    </div>
  )
}
