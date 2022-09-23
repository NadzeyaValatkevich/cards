import { AxiosError, AxiosResponse } from 'axios'

import { ResponseProfileType } from '../../profile/bll/profileActions'

import { instance } from 'app/dal/instance'

// const getDataFromAxiosResponse = <T>(res: AxiosResponse<T>): T => res.data
// const axiosErrorToString = (res: AxiosError) => Promise.reject(res.response?.data)

export const signInAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseProfileType>('/auth/login', data)
    // .then(getDataFromAxiosResponse)
    // .catch(axiosErrorToString)
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
