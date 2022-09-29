import { ActionCardsType } from 'features/cards/bll/cardsActions'
import { CardsParamsType, CardType } from 'features/cards/dal/cardsAPI'

const initialState = {
  cardsData: {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
  },
  params: { pageCount: 5, page: 1, cardQuestion: '' } as CardsParamsType,
}

type CardsInitialStateType = typeof initialState

export const cardsReducer = (
  state: CardsInitialStateType = initialState,
  action: ActionCardsType
): CardsInitialStateType => {
  switch (action.type) {
    case 'CARDS/GET-CARDS':
      return { ...state, cardsData: action.payload.cardsData }
    case 'CARDS/SET-PARAMS':
      return { ...state, params: { ...state.params, ...action.payload.params } }
    default:
      return state
  }
}
