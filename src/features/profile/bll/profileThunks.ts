import { profileAPI } from '../dal/profileAPI'

import { setProfileAC } from './profileActions'

import { setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

export type updateProfileType = {
  name?: string | null
  avatar?: string | null
}

export const updateProfileTC = (data: updateProfileType): AppThunk => {
  return async (dispatch, getState) => {
    const { name, avatar } = getState().profile
    const model = { name, avatar, ...data }

    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      let res = await profileAPI.updateProfile(model)

      dispatch(setProfileAC(res.data.updatedUser))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}
