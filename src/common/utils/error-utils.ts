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

// export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
//   if (data.messages.length) {
//     dispatch(setAppErrorAC(data.messages[0]))
//   } else {
//     dispatch(setAppErrorAC('Some error occurred'))
//   }
//   dispatch(setAppStatusAC(RequestStatusType.failed))
// }
//
// export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
//   dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
//   dispatch(setAppStatusAC(RequestStatusType.failed))
// }
