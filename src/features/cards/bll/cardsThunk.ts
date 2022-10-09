import { deletePackTC, updatePackTC } from '../../packs/bll/packsThunks'
import { UpdatePackDataType } from '../../packs/dal/packsAPI'
import { AddCardDataType, cardsAPI, CardsParamsType, UpdateCardsType } from '../dal/cardsAPI'

import { setCardsAC, setCardsPackIsDeletedAC, setCardsStatusAC } from './cardsActions'

import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'

export const getCardsTC = (): AppThunk => async (dispatch, getState) => {
  const params: CardsParamsType = getState().cards.params

  dispatch(setCardsStatusAC(RequestStatusType.loading))
  try {
    const response = await cardsAPI.getCards(params)

    dispatch(setCardsAC(response.data))
  } catch (error: any) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setCardsStatusAC(RequestStatusType.succeeded))
  }
}

export const addCardTC =
  (newCard: AddCardDataType): AppThunk =>
  async dispatch => {
    dispatch(setCardsStatusAC(RequestStatusType.loading))
    try {
      const res = await cardsAPI.addCard(newCard)

      dispatch(getCardsTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setCardsStatusAC(RequestStatusType.succeeded))
    }
  }

export const deleteCardTC =
  (_id: string): AppThunk =>
  async dispatch => {
    dispatch(setCardsStatusAC(RequestStatusType.loading))
    try {
      const res = await cardsAPI.deleteCards(_id)

      dispatch(getCardsTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setCardsStatusAC(RequestStatusType.succeeded))
    }
  }
export const updateCardTC =
  (updatedCard: UpdateCardsType): AppThunk =>
  async dispatch => {
    dispatch(setCardsStatusAC(RequestStatusType.loading))
    try {
      const res = await cardsAPI.updateCards(updatedCard)

      dispatch(getCardsTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setCardsStatusAC(RequestStatusType.succeeded))
    }
  }

export const deletePackFromCardsTC = (idPack: string): AppThunk => {
  return async dispatch => {
    dispatch(setCardsStatusAC(RequestStatusType.loading))
    try {
      await dispatch(deletePackTC(idPack))
      dispatch(setCardsPackIsDeletedAC(true))
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setCardsStatusAC(RequestStatusType.succeeded))
    }
  }
}

export const updatePackFromCardsTC = (data: UpdatePackDataType): AppThunk => {
  return async dispatch => {
    dispatch(setCardsStatusAC(RequestStatusType.loading))

    try {
      await dispatch(updatePackTC(data))
      dispatch(getCardsTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setCardsStatusAC(RequestStatusType.succeeded))
    }
  }
}
