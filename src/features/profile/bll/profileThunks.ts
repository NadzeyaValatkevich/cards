import { profileAPI } from '../dal/profileAPI'

import { setProfileAC, updateProfileTitleAC, updateProfileType } from './profileActions'

import { setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

export const updateProfileTitleTC = ({ name }: updateProfileType): AppThunk => {
  return async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      let res = await profileAPI.updateProfile({ name })

      dispatch(setProfileAC(res.data))
      dispatch(updateProfileTitleAC({ name }))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}
