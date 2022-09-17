import { AuthActionsType } from './authActions'

export type AuthStateType = {}

const initialState: AuthStateType = {}

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    default:
      return state
  }
}
