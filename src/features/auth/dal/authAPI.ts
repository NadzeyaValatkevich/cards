import { instance } from 'app/dal/instance'
import { ResponseProfileType } from 'features/profile/bll/profileActions'

export const authApi = {
  me() {
    return instance.post<ResponseProfileType>('auth/me')
  },
}
