import { instance } from 'app/dal/instance'

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: string
}
export type PacksResponseType = {
  cardPacks: Array<PackType>
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: ''
  tokenDeathTime: number
}
export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string | null
  block?: boolean
}
export type AddPackDataType = {
  name?: string
  deckCover?: string
  private?: boolean
}
export type TokenType = {
  token: string
  tokenDeathTime: Date
}
export type AddPackResponseType = {
  newCardsPack: PackType
} & TokenType
export type DeletedPackResponseType = {
  deletedCardsPack: PackType
} & TokenType
export type UpdatePackResponseType = {
  updatedCardsPack: PackType
} & TokenType
export type UpdatePackDataType = {
  _id: string
} & AddPackDataType

export const packsAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<PacksResponseType>('cards/pack', { params })
  },
  addPack(data: AddPackDataType) {
    return instance.post<AddPackResponseType>('cards/pack', { cardsPack: data })
  },
  deletePack(idPack: string) {
    return instance.delete<DeletedPackResponseType>(`cards/pack?id=${idPack}`)
  },
  updatePack(data: UpdatePackDataType) {
    return instance.put<UpdatePackResponseType>('cards/pack', data)
  },
}
