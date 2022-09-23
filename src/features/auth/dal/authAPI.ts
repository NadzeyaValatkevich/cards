import { LoginType } from '../ui/SignIn_ver2'
import { registerType } from '../ui/SignUp'

import { instance } from 'app/dal/instance'

type loginReturnType = {
  _id: string | null
  email: string | null
  name: string | null
  avatar?: string | null
  publicCardPacksCount: number | null
  created: Date | null
  updated: Date | null
  isAdmin: boolean | null
  verified: boolean | null
  rememberMe: boolean | null
  error?: string | null
}

type registerReturnType = {
  addedUser: {}
  error?: string
}

type logoutReturnType = {
  info: string
  error: string
}

export const authAPI = {
  getAuthStatus() {
    return instance.post<loginReturnType>('auth/me')
  },
  register(data: registerType) {
    return instance.post<registerReturnType>('auth/register', data)
  },
  login(data: LoginType) {
    return instance.post<loginReturnType>('auth/login', data)
  },
  logout() {
    return instance.delete<logoutReturnType>('auth/me')
  },
}
