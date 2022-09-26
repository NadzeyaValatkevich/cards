import { setIsLoggedInAC } from '../../features/auth/bll/authActions'
import { setProfileAC } from '../../features/profile/bll/profileActions'

import { setAppInfoAC, setAppInitializedAC, setAppStatusAC } from './appActions'
import { RequestStatusType } from './appReducer'
import { AppThunk } from './store'

import { errorUtils } from 'common/utils/error-utils'
import { authAPI } from 'features/auth/dal/authAPI'
import { ProfileStateType } from 'features/profile/bll/profileReducer'

export const initTC = (): AppThunk => async dispatch => {
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
