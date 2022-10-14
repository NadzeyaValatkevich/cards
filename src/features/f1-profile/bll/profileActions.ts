export type ProfileActionsType = ReturnType<typeof setProfileAC>

export type ResponseProfileType = {
  _id: string | null
  email: string | null
  name: string | null
  avatar?: string | null
  publicCardPacksCount: number | null
  created: Date | null
  updated: Date | null
  isAdmin: boolean | null
  verified: boolean | null
  rememberMe: boolean | null
  error?: string | null
  __v: number | null
  token?: string | null
  tokenDeathTime?: number | null
}

export const setProfileAC = (profile: ResponseProfileType) =>
  ({ type: 'PROFILE/SET-PROFILE', payload: { profile } } as const)
