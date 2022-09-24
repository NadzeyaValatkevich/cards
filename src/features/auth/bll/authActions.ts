export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsRegisteredAC>

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', payload: { value } } as const)

export const setIsRegisteredAC = (value: boolean) =>
  ({ type: 'login/SET-IS-REGISTERED', payload: { value } } as const)
