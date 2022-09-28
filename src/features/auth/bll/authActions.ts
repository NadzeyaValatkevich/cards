export type AuthActionsType =
  | setIsLoggedInActionType
  | setIsRegisteredActionType
  | setIsSendEmailActionType
  | setIsSendNewPasswordActionType

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', payload: { value } } as const)

export const setIsRegisteredAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-REGISTERED', payload: { value } } as const)

export const setSendEmailAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-SEND-EMAIL', payload: { value } } as const)

export const setSendNewPasswordAC = (value: boolean) =>
  ({ type: 'auth/SET-NEW-PASSWORD', payload: { value } } as const)

export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export type setIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>
export type setIsSendEmailActionType = ReturnType<typeof setSendEmailAC>
export type setIsSendNewPasswordActionType = ReturnType<typeof setSendNewPasswordAC>
