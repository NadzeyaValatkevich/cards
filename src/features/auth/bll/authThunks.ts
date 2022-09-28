import { setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'
import {
  setIsLoggedInAC,
  setIsRegisteredAC,
  setSendEmailAC,
  setSendNewPasswordAC,
} from 'features/auth/bll/authActions'
import { authAPI } from 'features/auth/dal/authAPI'
import { LoginType } from 'features/auth/ui/SignIn'
import { registerType } from 'features/auth/ui/SignUp'
import { setProfileAC } from 'features/profile/bll/profileActions'
import { ProfileStateType } from 'features/profile/bll/profileReducer'

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
    dispatch(setIsRegisteredAC(false))
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

      dispatch(setIsRegisteredAC(true))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const sendEmailTC =
  (email: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.sendEmail({ email, from, message })

      dispatch(setSendEmailAC(true))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const sendNewPasswordTC =
  (password: string, resetPasswordToken: string | undefined): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await authAPI.sendNewPassword(password, resetPasswordToken)

      dispatch(setSendNewPasswordAC(true))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
