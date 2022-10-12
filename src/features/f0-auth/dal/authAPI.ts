import { ProfileStateType } from '../../f1-profile/bll/profileReducer'
import { LoginType } from '../ui/SignIn'
import { registerType } from '../ui/SignUp'

import { instance } from 'app/dal/instance'

type RegisterReturnType = {
  addedUser: {}
  error?: string
}

type LogoutResponseType = {
  info: string
  error: string
}

export type RecoveryPasswordRequestType = {
  email: string
  from: string
  message: string
}

export type CreateNewPasswordRequestType = {
  password: string
  resetPasswordToken: string | undefined
}

export const authAPI = {
  me() {
    return instance.post<ProfileStateType>('auth/me')
  },
  register(data: registerType) {
    return instance.post<RegisterReturnType>('auth/register', data)
  },
  login(data: LoginType) {
    return instance.post<ProfileStateType>('auth/login', data)
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/me')
  },
  sendEmail(data: RecoveryPasswordRequestType) {
    return instance.post('auth/forgot', data)
  },
  createNewPassword(data: CreateNewPasswordRequestType) {
    return instance.post('auth/set-new-password', data)
  },
}
