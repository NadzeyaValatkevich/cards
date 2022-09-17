export type ProfileActionsType = ReturnType<typeof fakeAC>

export const fakeAC = () => ({ type: 'FAKE-ACTION' } as const)
