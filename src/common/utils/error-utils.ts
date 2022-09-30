import axios, { AxiosError } from 'axios'

import { RequestStatusType } from '../../app/bll/appReducer'

import { setAppErrorAC, setAppStatusAC } from 'app/bll/appActions'
import { AppDispatch } from 'app/bll/store'

export const errorUtils = (e: AxiosError<{ error: string }>, dispatch: AppDispatch) => {
  const error = e.response?.data ? e.response.data.error : e.message

  dispatch(setAppStatusAC(RequestStatusType.failed))
  if (axios.isAxiosError(e)) {
    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${error}`))
  }
}
