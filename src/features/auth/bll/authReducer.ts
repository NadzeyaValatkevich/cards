import { AuthActionsType } from './authActions'

export type AuthStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  isSendEmail: false,
}

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case 'auth/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value }
    case 'auth/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.payload.value }
    case 'auth/SET-IS-SEND-EMAIL':
      return { ...state, isSendEmail: action.payload.value }
    default:
      return state
  }
}
