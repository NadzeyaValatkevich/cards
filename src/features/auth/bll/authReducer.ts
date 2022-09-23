import { AuthActionsType } from './authActions'

export type AuthStateType = {
  isLoggedIn: boolean
}

const initialState: AuthStateType = {
  isLoggedIn: false,
}

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case 'AUTH/SET-LOGGED-IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}
