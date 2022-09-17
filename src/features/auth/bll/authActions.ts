export type AuthActionsType = ReturnType<typeof fakeAC>

export const fakeAC = () => ({ type: 'FAKE-ACTION' } as const)
