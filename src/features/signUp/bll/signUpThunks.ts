import { handleServerAppError } from '../../../utils/error-utils'

import { setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { signUpApi } from 'features/signUp/dal/signUpAPI'

export const setNewUserTC =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      await signUpApi.registration(email, password)
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      const errorResponse = error.response
        ? error.response.data.error
        : error.message + ', more details in the console'

      handleServerAppError(errorResponse, dispatch)
      dispatch(setAppStatusAC(RequestStatusType.failed))
    }
  }
