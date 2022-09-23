import { RequestStatusType } from './appReducer'

export type AppActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppInitializedAC>

export const setAppErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', payload: { error } } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', payload: { status } } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'APP/SET-IS-INITIALIZED', payload: { value } } as const)
