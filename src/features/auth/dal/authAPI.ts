import { ProfileStateType } from '../../profile/bll/profileReducer'
import { LoginType } from '../ui/SignIn'
import { registerType } from '../ui/SignUp'

import { instance } from 'app/dal/instance'

type registerReturnType = {
  addedUser: {}
  error?: string
}

type commonResponseType = {
  info: string
  error: string
}

export type RecoveryPasswordRequestType = {
  email: string
  from: string
  message: string
}

export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string | undefined
}

export const authAPI = {
  me() {
    return instance.post<ProfileStateType>('auth/me')
  },
  register(data: registerType) {
    return instance.post<registerReturnType>('auth/register', data)
  },
  login(data: LoginType) {
    return instance.post<ProfileStateType>('auth/login', data)
  },
  logout() {
    return instance.delete<commonResponseType>('auth/me')
  },
  sendEmail(data: RecoveryPasswordRequestType) {
    return instance.post('/auth/forgot', data)
  },
  sendNewPassword(data: NewPasswordRequestType) {
    return instance.post('/auth/set-new-password', { ...data })
  },
}
