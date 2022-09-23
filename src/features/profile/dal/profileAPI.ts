import { updateProfileType } from '../bll/profileActions'
import { ProfileStateType } from '../bll/profileReducer'

import { instance } from 'app/dal/instance'

export const profileAPI = {
  logout() {
    return instance.delete('auth/me')
  },
  updateTitle({ name }: updateProfileType) {
    return instance.put<ProfileStateType, updateProfileType>('/auth/me', { name })
  },
}
