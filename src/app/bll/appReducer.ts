import { AppActionsType } from './appActions'

export enum RequestStatusType {
  idle,
  loading,
  succeeded,
  failed,
}

export type AppStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

const initialState: AppStateType = {
  status: RequestStatusType.idle,
  error: null,
  isInitialized: false,
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
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}
