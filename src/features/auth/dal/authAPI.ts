import axios from 'axios'

import { ProfileStateType } from '../../profile/bll/profileReducer'
import { LoginType } from '../ui/SignIn'
import { registerType } from '../ui/SignUp'

import { instance } from 'app/dal/instance'

type registerReturnType = {
  addedUser: {}
  error?: string
}

type logoutReturnType = {
  info: string
  error: string
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

type forgotRequestType = typeof forgotRequestData

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
    return instance.delete<logoutReturnType>('auth/me')
  },
  forgot({ email }: { email: string }) {
    return axios.post<forgotRequestType>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      {
        ...forgotRequestData,
        email,
      },
      { withCredentials: true }
    )
  },
}
