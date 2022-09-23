import { AuthActionsType } from './authActions'

const initialAuthState = {
  isLoggedIn: false,
}

type InitialAuthStateType = typeof initialAuthState

export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthActionsType
): InitialAuthStateType => {
  switch (action.type) {
    case 'SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}
