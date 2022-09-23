export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (value: boolean) => ({ type: 'SET-IS-LOGGED-IN', value } as const)
