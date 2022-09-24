import axios, { AxiosError } from 'axios'

import { setAppErrorAC } from 'app/bll/appActions'
import { AppDispatch } from 'app/bll/store'

export const errorUtils = (e: AxiosError<{ error: string }>, dispatch: AppDispatch) => {
  const error = e.response?.data ? e.response.data.error : e.message

  if (axios.isAxiosError(e)) {
    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${error}`))
  }
}
