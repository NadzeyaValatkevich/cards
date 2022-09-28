import { setProfileAC } from '../../profile/bll/profileActions'
import { ProfileStateType } from '../../profile/bll/profileReducer'
import { authAPI, NewPasswordRequestType } from "../dal/authAPI";
import { LoginType } from '../ui/SignIn'
import { registerType } from '../ui/SignUp'
import { recoverySendType } from '../ui/Recovery'

import { setIsLoggedInAC, setIsRegisteredAC } from './authActions'

import { setAppInfoAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

const from = 'test-front-admin <ai73a@yandex.by>'
const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`

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
  (email: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.sendEmail({ email, from, message })

      dispatch(setAppInfoAC(res.data.info))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const sendNewPasswordTC =
  (data: NewPasswordRequestType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.sendNewPassword(data)

      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
