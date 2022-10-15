import axios, { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'

import { setAppErrorAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppDispatch } from 'app/bll/store'
import { AppRoutes } from 'common/enums/enums'

export const errorUtils = (e: AxiosError<{ error: string }>, dispatch: AppDispatch) => {
  const error = e.response?.data ? e.response.data.error : e.message

  dispatch(setAppStatusAC(RequestStatusType.failed))
  if (axios.isAxiosError(e)) {
    dispatch(setAppErrorAC(error))
    console.log(e)
    if (e.response?.status === 401) {
      redirect(AppRoutes.SIGN_IN)
    }
  } else {
    dispatch(setAppErrorAC(`Native error ${error}`))
  }
}
