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

export type RecoveryPasswordRequestType = {
  email: string
  from: string
  message: string
}

const from = 'test-front-admin <ai73a@yandex.by>'
const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`

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
  sendEmail(data: RecoveryPasswordRequestType) {
    return instance.post('/auth/forgot', data)
  },
}
