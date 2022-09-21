import { instance } from '../../../common/instance/instance'

import { updateProfileType } from './profileActions'
import { ProfileStateType } from './profileReducer'

export const profileAPI = {
  logout() {
    return instance.delete('auth/me')
  },
  updateTitle({ name }: updateProfileType) {
    return instance.put<ProfileStateType, updateProfileType>('/auth/me', { name })
  },
}
