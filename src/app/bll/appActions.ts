import { RequestStatusType } from './appReducer'

export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppInitializedActionType
  | setAppInfoActionType

export const setAppErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', payload: { error } } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', payload: { status } } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'APP/SET-IS-INITIALIZED', payload: { value } } as const)
export const setAppInfoAC = (info: string | null) =>
  ({ type: 'APP/SET-INFO', payload: { info } } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
export type setAppInfoActionType = ReturnType<typeof setAppInfoAC>
