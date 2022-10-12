import { AuthActionsType } from './authActions'

export type AuthStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case 'f0-auth/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value }
    default:
      return state
  }
}
