import { RequestStatusType } from 'app/bll/appReducer'
import { PaginationParamsType } from 'common/components/Pagination/Pagination'
import { CardsResponseType } from 'features/f3-cards/dal/cardsAPI'

export type ActionCardsType =
  | ReturnType<typeof setCardsStatusAC>
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCardsPaginationAC>
  | ReturnType<typeof setCardsIdAC>
  | ReturnType<typeof setCardsSearchQuestionAC>
  | ReturnType<typeof setCardsSearchAnswerAC>
  | ReturnType<typeof setCardsSortAC>
  | ReturnType<typeof setCardsMinMaxAC>
  | ReturnType<typeof setCardsInitialParamsAC>
  | ReturnType<typeof setCardsPackIsDeletedAC>
  | ReturnType<typeof setCardGradeAC>

export const setCardsStatusAC = (entityStatus: RequestStatusType) =>
  ({
    type: 'CARDS/SET-STATUS',
    payload: { entityStatus },
  } as const)
export const setCardsAC = (cardsData: CardsResponseType) =>
  ({
    type: 'CARDS/SET-CARDS',
    payload: { cardsData },
  } as const)
export const setCardsIdAC = (cardsPack_id: string) =>
  ({
    type: 'CARDS/SET-ID',
    payload: { cardsPack_id },
  } as const)
export const setCardsPaginationAC = (params: PaginationParamsType) =>
  ({
    type: 'CARDS/SET-PAGINATION',
    payload: { params },
  } as const)
export const setCardsSearchQuestionAC = (cardQuestion: string) =>
  ({
    type: 'CARDS/SET-SEARCH-QUESTION',
    payload: { cardQuestion },
  } as const)
export const setCardsSearchAnswerAC = (cardAnswer: string) =>
  ({
    type: 'CARDS/SET-SEARCH-ANSWER',
    payload: { cardAnswer },
  } as const)
export const setCardsSortAC = (name: string, dir: 'asc' | 'desc') =>
  ({
    type: 'CARDS/SET-SORT',
    payload: { name, dir },
  } as const)
export const setCardsMinMaxAC = (min?: number, max?: number) =>
  ({
    type: 'CARDS/SET-MIN-MAX',
    payload: { min, max },
  } as const)
export const setCardsInitialParamsAC = () =>
  ({
    type: 'CARDS/SET-INIT-PARAMS',
  } as const)
export const setCardsPackIsDeletedAC = (status: boolean) =>
  ({
    type: 'CARDS/SET-IS-DELETED',
    payload: { status },
  } as const)
export const setCardGradeAC = (data: { grade: number; card_id: string }, shots: number) =>
  ({
    type: 'CARDS/SET-CARDS-GRADE',
    data,
    shots,
  } as const)
