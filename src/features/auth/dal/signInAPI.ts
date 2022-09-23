import { AxiosError, AxiosResponse } from 'axios'

import { instance } from 'app/dal/instance'

const getDataFromAxiosResponse = <T>(res: AxiosResponse<T>): T => res.data
const axiosErrorToString = (res: AxiosError) => Promise.reject(res.response?.data)

type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}

type AuthResponseType = LoginDataType & {
  _id: string
  avatar: string | null
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  error: string | null

  // in: string //???
  // isEmailValid: boolean
  // isPassValid: boolean
  // passwordRegExp: string
}

export const signInAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance
      .post<AuthResponseType>('/auth/login', {
        email,
        password,
        rememberMe,
      })
      .then(getDataFromAxiosResponse)
      .catch(axiosErrorToString)
  },
}
