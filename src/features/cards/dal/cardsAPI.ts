import { instance } from 'app/dal/instance'
import { TokenType } from 'features/packs/dal/packsAPI'

export type CardsParamsType = {
  cardsPack_id: string
  cardQuestion?: string
  cardAnswer?: string
  sortCards?: string
  page?: number
  pageCount?: number
  min?: number
  max?: number
  minGrade?: number
  maxGrade?: number
}
export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}
export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
} & TokenType

export type CardDataType = {
  question?: string
  answer?: string
  answerImg?: string
  questionImg?: string
  grade?: number
  shots?: number
  questionVideo?: string
  answerVideo?: string
}
export type AddCardDataType = {
  cardsPack_id: string
} & CardDataType
export type CardResponseType = {
  newCard: CardType
} & TokenType
export type UpdateCardsType = {
  _id: string
  question?: string
  answer?: string
}
export type UpdateCardResponseType = {
  updatedCard: CardType
} & TokenType
export type DeleteCardResponseType = {
  deletedCard: CardType
} & TokenType

export const cardsAPI = {
  getCards(params: CardsParamsType) {
    return instance.get<CardsResponseType>('cards/card', { params })
  },
  addCard(data: AddCardDataType) {
    return instance.post<CardResponseType>('cards/card', { card: data })
  },
  deleteCards(_id: string) {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${_id}`)
  },
  updateCards(updateCard: UpdateCardsType) {
    return instance.put<UpdateCardResponseType>('cards/card', { card: updateCard })
  },
}
