import { initialPackParams } from './packsReducer'

import { setAppInfoAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'
import { compareObj } from 'common/utils/removeEmptyObj'
import { getPacksAC, setPacksParamsAC, setPacksStatusAC } from 'features/packs/bll/packsActions'
import {
  AddPackDataType,
  packsAPI,
  PacksParamsType,
  UpdatePackDataType,
} from 'features/packs/dal/packsAPI'

export const getPacksTC =
  (params?: PacksParamsType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    if (params) {
      dispatch(setPacksParamsAC(params))
    }
    let statePacksParams: PacksParamsType = compareObj(getState().packs.params, initialPackParams)

    if (!statePacksParams.pageCount) {
      statePacksParams.pageCount = 5
      dispatch(setPacksParamsAC({ pageCount: 5 }))
    }

    try {
      const res = await packsAPI.getPacks(statePacksParams)

      dispatch(getPacksAC(res.data))
      // dispatch(setAppInfoAC('Packs received successfully'))
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const addPackTC = (data: AddPackDataType): AppThunk => {
  return async dispatch => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.addPack(data)

      dispatch(getPacksTC())
      // dispatch(setAppInfoAC('Pack added successfully'))
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}

export const deletePackTC = (idPack: string): AppThunk => {
  return async dispatch => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.deletePack(idPack)

      await dispatch(getPacksTC())
      dispatch(setAppInfoAC('Pack deleted successfully'))
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}

export const updatePackTC = (data: { cardsPack: UpdatePackDataType }): AppThunk => {
  return async dispatch => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.updatePack(data)

      dispatch(getPacksTC())
      dispatch(setAppInfoAC('Pack updated successfully'))
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}
