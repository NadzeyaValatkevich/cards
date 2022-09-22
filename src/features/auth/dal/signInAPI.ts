import { AxiosError, AxiosResponse } from 'axios'

import { instance } from 'app/dal/instance'

const getDataFromAxiosResponse = <T>(res: AxiosResponse<T>): T => res.data
const axiosErrorToString = (res: AxiosError) => Promise.reject(res.response?.data)

export const signInAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance
      .post('/auth/login', {
        email,
        password,
        rememberMe,
      })
      .then(getDataFromAxiosResponse)
      .catch(axiosErrorToString)
  },
}
