import { PackStateType } from './packsReducer'

export type PacksActionsType = setPacksActionType

export const setPacksAC = (packs: PackStateType) =>
  ({ type: 'packs/SET-PACKS', payload: { packs } } as const)

export type setPacksActionType = ReturnType<typeof setPacksAC>
