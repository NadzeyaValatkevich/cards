import { RequestStatusType } from '../../../app/bll/appReducer'

import { ActionCardsType } from 'features/cards/bll/cardsActions'
import { CardsParamsType, CardType } from 'features/cards/dal/cardsAPI'

export const initialCadsParams: CardsParamsType = {
  cardsPack_id: '',
  page: 1,
  pageCount: 5,
  min: 0,
  max: 100,
  cardQuestion: '',
  cardAnswer: '',
  sortCards: '',
}

const initialState = {
  cardsData: {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    packName: '',
  },
  params: initialCadsParams,
  entityStatus: RequestStatusType.idle as RequestStatusType,
  isDeleted: false,
}

type CardsInitialStateType = typeof initialState

export const cardsReducer = (
  state: CardsInitialStateType = initialState,
  action: ActionCardsType
): CardsInitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-STATUS':
      return { ...state, entityStatus: action.payload.entityStatus }
    case 'CARDS/GET-CARDS':
      return { ...state, cardsData: action.payload.cardsData }
    case 'CARDS/SET-ID':
      return { ...state, params: { ...state.params, cardsPack_id: action.payload.cardsPack_id } }
    case 'CARDS/SET-PAGINATION':
      return { ...state, params: { ...state.params, ...action.payload.params } }
    case 'CARDS/SET-SEARCH-QUESTION':
      return { ...state, params: { ...state.params, cardQuestion: action.payload.cardQuestion } }
    case 'CARDS/SET-SEARCH-ANSWER':
      return { ...state, params: { ...state.params, cardAnswer: action.payload.cardAnswer } }
    case 'CARDS/SET-SORT': {
      const sortRequest =
        action.payload.dir === 'asc' ? `0${action.payload.name}` : `1${action.payload.name}`

      return { ...state, params: { ...state.params, sortCards: sortRequest } }
    }
    case 'CARDS/SET-INIT-PARAMS':
      return {
        ...state,
        params: initialCadsParams,
      }
    case 'CARDS/SET-IS-DELETED':
      return {
        ...state,
        isDeleted: action.payload.status,
      }
    default:
      return state
  }
}
