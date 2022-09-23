import { instance } from 'app/dal/instance'
import { ProfileStateType } from 'features/profile/bll/profileReducer'

export const signUpApi = {
  registration(email: string, password: string) {
    return instance.post<ProfileStateType>('auth/register', { email, password })
  },
}
