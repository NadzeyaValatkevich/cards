import React, { forwardRef, SyntheticEvent } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../hooks/hooks'

import { setAppInfoAC } from 'app/bll/appActions'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function SuccessSnackbar() {
  const info = useAppSelector(state => state.app.info)

  const dispatch = useDispatch()

  const handleClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppInfoAC(null))
  }

  return (
    <Snackbar open={info !== null} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {info}
      </Alert>
    </Snackbar>
  )
}
