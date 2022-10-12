import { setAppInfoAC, setAppInitializedAC, setAppStatusAC } from './appActions'
import { RequestStatusType } from './appReducer'
import { AppThunk } from './store'

import { errorUtils } from 'common/utils/error-utils'
import { setIsLoggedInAC } from 'features/f0-auth/bll/authActions'
import { authAPI } from 'features/f0-auth/dal/authAPI'
import { setProfileAC } from 'features/f1-profile/bll/profileActions'
import { ProfileStateType } from 'features/f1-profile/bll/profileReducer'

export const initTC = (): AppThunk => async (dispatch, getState) => {
  const token = getState().profile.token

  if (!token) {
    dispatch(setAppStatusAC(RequestStatusType.loading))

    try {
      const res = await authAPI.me()

      dispatch(setProfileAC(res.data as ProfileStateType))
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
      dispatch(setAppInfoAC('You are logged in'))
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setAppInitializedAC(true))
    }
  }
}
