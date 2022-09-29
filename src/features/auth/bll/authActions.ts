export type AuthActionsType = SetIsLoggedInActionType

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', payload: { value } } as const)

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
