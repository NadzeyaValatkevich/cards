import { setAppStatusAC } from '../../../app/bll/appActions'
import { RequestStatusType } from '../../../app/bll/appReducer'
import { AppThunk } from '../../../app/bll/store'
import { handleServerAppError } from '../../../utils/error-utils'
import { setIsLoggedInAC } from '../../auth/bll/authActions'
import { profileAPI } from '../dal/profileAPI'

import { updateProfileTitleAC, updateProfileType } from './profileActions'

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC(RequestStatusType.loading))
  try {
    const res = await profileAPI.logout()

    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC(RequestStatusType.succeeded))
  } catch (error: any) {
    const errorResponse = error.response
      ? error.response.data.error
      : error.message + ', more details in the console'

    handleServerAppError(errorResponse, dispatch)
    dispatch(setAppStatusAC(RequestStatusType.failed))
  }
}

export const updateProfileTitleTC = ({ name }: updateProfileType): AppThunk => {
  return async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      let res = await profileAPI.updateTitle({ name })

      dispatch(updateProfileTitleAC({ name }))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      const errorResponse = error.response
        ? error.response.data.error
        : error.message + ', more details in the console'

      handleServerAppError(errorResponse, dispatch)
      dispatch(setAppStatusAC(RequestStatusType.failed))
    }
  }
}
