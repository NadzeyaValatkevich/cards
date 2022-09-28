import { AxiosResponse } from 'axios'

import { ProfileStateType } from '../bll/profileReducer'
import { updateProfileType } from '../bll/profileThunks'

import { instance } from 'app/dal/instance'

export type updateProfileResponseType = {
  updatedUser: ProfileStateType
  error?: string
}

export const profileAPI = {
  updateProfile(data: updateProfileType) {
    return instance.put<null, AxiosResponse<updateProfileResponseType>, updateProfileType>(
      'auth/me',
      data
    )
  },
}
