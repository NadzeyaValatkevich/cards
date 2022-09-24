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
  isInitialized: false,
}

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error }
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.payload.value }
    default:
      return state
  }
}
