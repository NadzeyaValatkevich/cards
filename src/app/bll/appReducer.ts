import { AppActionsType } from './appActions'

export enum RequestStatusType {
  idle,
  loading,
}

export type AppStateType = {
  status: RequestStatusType
  error: string | null
}

const initialState: AppStateType = {
  status: RequestStatusType.idle,
  error: null,
}

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}
