export const setNewUserAC = (success: boolean) =>
  ({ type: 'SET-NEW-USER', payload: { success } } as const)

export type SetNewUserActionType = ReturnType<typeof setNewUserAC>
