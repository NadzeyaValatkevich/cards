export type AuthActionsType = setIsLoggedInActionType

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', payload: { value } } as const)

export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
