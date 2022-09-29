import { PacksActionsType } from './packsActions'

export type PackStateType = {
  cardPacks: cardPacksType[]
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  cardPacksTotalCount: number // количество колод
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type cardPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

const initialState = {} as PackStateType

export const packsReducer = (
  state: PackStateType = initialState,
  action: PacksActionsType
): PackStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, ...action.payload.packs }
    default:
      return state
  }
}
