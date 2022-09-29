import { packsAPI } from '../dal/packsAPI'

import { setPacksAC } from './packsActions'

import { setAppInfoAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

export const getPacksTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC(RequestStatusType.loading))
  try {
    const res = await packsAPI.getPacks()

    dispatch(setPacksAC(res.data))
    dispatch(setAppInfoAC('Packs received successfully'))
    dispatch(setAppStatusAC(RequestStatusType.succeeded))
  } catch (error: any) {
    errorUtils(error, dispatch)
  }
}
