import { CardsParamsType, CardsResponseType } from 'features/cards/dal/cardsAPI'

export type ActionCardsType = GetCardsActionType | SetParamsCardsActionType

export const getCardsAC = (cardsData: CardsResponseType) =>
  ({
    type: 'CARDS/GET-CARDS',
    payload: { cardsData },
  } as const)

export const setParamsCardsAC = (params: CardsParamsType) =>
  ({
    type: 'CARDS/SET-PARAMS',
    payload: { params },
  } as const)

export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type SetParamsCardsActionType = ReturnType<typeof setParamsCardsAC>
