import { setAppStatusAC } from '../../../app/bll/appActions'
import { RequestStatusType } from '../../../app/bll/appReducer'
import { AppThunk } from '../../../app/bll/store'
import { errorUtils } from '../../../common/utils/error-utils'
import { AddCardDataType, cardsAPI, CardsParamsType, UpdateCardsType } from '../dal/cardsAPI'

import { getCardsAC, setParamsCardsAC } from './cardsActions'

export const getCardsTC =
  (cardsPack_id: string, params?: CardsParamsType): AppThunk =>
  async (dispatch, getState) => {
    if (params) {
      dispatch(setParamsCardsAC(params))
    }
    const { sortCards, page, pageCount, cardQuestion } = getState().cards.params

    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const response = await cardsAPI.getCards({
        cardsPack_id,
        sortCards,
        page,
        pageCount,
      })

      dispatch(getCardsAC(response.data))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
      dispatch(setAppStatusAC(RequestStatusType.failed))
    }
  }

export const addCardTC =
  (newCard: AddCardDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await cardsAPI.addCard(newCard)

      dispatch(getCardsTC(res.newCard.cardsPack_id))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
      dispatch(setAppStatusAC(RequestStatusType.failed))
    }
  }

export const deleteCardTC =
  (_id: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await cardsAPI.deleteCards(_id)

      dispatch(getCardsTC(res.data.deletedCard.cardsPack_id))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
      dispatch(setAppStatusAC(RequestStatusType.failed))
    }
  }
export const updateCardTC =
  (updatedCard: UpdateCardsType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await cardsAPI.updateCards(updatedCard)

      dispatch(getCardsTC(res.updatedCard.cardsPack_id))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
      dispatch(setAppStatusAC(RequestStatusType.failed))
    }
  }
