import { RequestStatusType } from './appReducer'

export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppInitializedActionType

export const setAppErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', payload: { error } } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', payload: { status } } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'APP/SET-IS-INITIALIZED', payload: { value } } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
