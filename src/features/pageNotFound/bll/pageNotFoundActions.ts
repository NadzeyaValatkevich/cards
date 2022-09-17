export type PageNotFoundActionsType = ReturnType<typeof fakeAC>

export const fakeAC = () => ({ type: 'FAKE-ACTION' } as const)
