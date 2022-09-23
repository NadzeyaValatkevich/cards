import { Dispatch } from 'redux'

import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'

export const handleServerAppError = (
  errorResponse: string,
  dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>
) => {
  if (errorResponse) {
    dispatch(setAppErrorAC(errorResponse))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC(RequestStatusType.failed))
}
