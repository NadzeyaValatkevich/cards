import { setAppInitializedAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { setIsLoggedInAC } from 'features/auth/bll/authActions'
import { authApi } from 'features/auth/dal/authAPI'
import { setProfileAC } from 'features/profile/bll/profileActions'

export const initTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC(RequestStatusType.loading))
  try {
    const res = await authApi.me()

    dispatch(setProfileAC(res.data))
    dispatch(setIsLoggedInAC(true))
    dispatch(setAppStatusAC(RequestStatusType.succeeded))
  } catch (error: any) {
    dispatch(setAppStatusAC(RequestStatusType.failed))
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}
