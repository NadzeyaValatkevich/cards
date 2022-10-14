import { RequestStatusType } from 'app/bll/appReducer'
import { dateParser } from 'common/utils/dateParser'
import { ActionCardsType } from 'features/f3-cards/bll/cardsActions'
import { CardsParamsType, CardType } from 'features/f3-cards/dal/cardsAPI'

export const initialCardsParams: Partial<CardsParamsType> = {
  page: 1,
  pageCount: 5,
  min: 0,
  max: 100,
  cardQuestion: '',
  cardAnswer: '',
  sortCards: '',
  maxGrade: 0,
  minGrade: 0,
}

const initialState = {
  cardsData: {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    packName: '',
  },
  params: { cardsPack_id: '', ...initialCardsParams } as CardsParamsType,
  entityStatus: RequestStatusType.idle as RequestStatusType,
  isDeleted: false,
  initCards: false,
}

type CardsInitialStateType = typeof initialState

export const cardsReducer = (
  state: CardsInitialStateType = initialState,
  action: ActionCardsType
): CardsInitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-STATUS':
      return { ...state, entityStatus: action.payload.entityStatus }
    case 'CARDS/SET-CARDS': {
      const parsedDate = action.payload.cardsData.cards.map((c: CardType) => ({
        ...c,
        updated: dateParser(c.updated).toString(),
      }))

      return { ...state, cardsData: { ...action.payload.cardsData, cards: parsedDate } }
    }
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
        params: { ...state.params, ...initialCardsParams },
      }
    case 'CARDS/SET-IS-DELETED':
      return {
        ...state,
        isDeleted: action.payload.status,
      }
    case 'CARDS/SET-CARDS-GRADE':
      return {
        ...state,
        cardsData: {
          ...state.cardsData,
          cards: state.cardsData.cards.map(card =>
            card._id === action.data.card_id
              ? { ...card, grade: action.data.grade, shots: action.shots }
              : card
          ),
        },
      }
    case 'CARDS/SET-PAGE-INIT':
      return {
        ...state,
        initCards: action.payload.value,
      }
    default:
      return state
  }
}
