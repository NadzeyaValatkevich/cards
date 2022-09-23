import { AppActionsType } from './appActions'

export enum RequestStatusType {
  idle,
  loading,
  succeeded,
  failed,
}

export type AppStateType = typeof initialState

const initialState = {
  status: RequestStatusType.idle as RequestStatusType,
  error: null as string | null,
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
