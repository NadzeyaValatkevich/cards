export type AuthActionsType = ReturnType<typeof setLoggedInAC>

export const setLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: 'AUTH/SET-LOGGED-IN', isLoggedIn } as const)
