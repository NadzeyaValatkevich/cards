import { setProfileAC } from '../../profile/bll/profileActions'
import { ProfileStateType } from '../../profile/bll/profileReducer'
import { authAPI } from '../dal/authAPI'
import { LoginType } from '../ui/SignIn'
import { registerType } from '../ui/SignUp'

import { setIsLoggedInAC } from './authActions'

import { setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC(RequestStatusType.loading))
  try {
    const res = await authAPI.logout()

    dispatch(setProfileAC({} as ProfileStateType))
    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC(RequestStatusType.succeeded))
  } catch (error: any) {
    errorUtils(error, dispatch)
  }
}

export const loginTC =
  (data: LoginType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.login(data)

      dispatch(setProfileAC(res.data as ProfileStateType))
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const registerTC =
  (data: registerType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.register(data)

      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
