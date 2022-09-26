import axios, { AxiosResponse } from 'axios'

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

type forgotRequestType = typeof forgotRequestData

export type createNewPasswordRequestType = {
  password: string
  resetPasswordToken: string | undefined
}

const forgotRequestData = {
  email: '',
  from: 'test-front-admin <ai73a@yandex.by>',
  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href="http://localhost:3000/#/set-new-password/$token$">
link</a>
</div>`,
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
  forgot({ email }: { email: string }) {
    return axios.post<null, AxiosResponse<commonResponseType>, forgotRequestType>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      {
        ...forgotRequestData,
        email,
      },
      { withCredentials: true }
    )
  },
  createNewPassword(data: createNewPasswordRequestType) {
    return axios.post<null, AxiosResponse<commonResponseType>, createNewPasswordRequestType>(
      'https://neko-back.herokuapp.com/2.0/auth/set-new-password',
      data,
      { withCredentials: true }
    )
  },
}
