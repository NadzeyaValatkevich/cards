import { setProfileAC } from '../../profile/bll/profileActions'
import { ProfileStateType } from '../../profile/bll/profileReducer'
import { authAPI, createNewPasswordRequestType } from '../dal/authAPI'
import { recoverySendType } from '../ui/Recovery'
import { LoginType } from '../ui/SignIn'
import { registerType } from '../ui/SignUp'

import { setIsLoggedInAC } from './authActions'

import { setAppInfoAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC(RequestStatusType.loading))
  try {
    const res = await authAPI.logout()

    dispatch(setProfileAC({} as ProfileStateType))
    dispatch(setIsLoggedInAC(false))
    dispatch(setAppInfoAC(res.data.info))
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
      dispatch(setAppInfoAC('Sign in successful'))
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

      dispatch(setAppInfoAC('Register successful'))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const forgotTC =
  (data: recoverySendType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.forgot(data)

      dispatch(setAppInfoAC(res.data.info))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const createNewPasswordTC =
  (data: createNewPasswordRequestType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.createNewPassword(data)

      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
