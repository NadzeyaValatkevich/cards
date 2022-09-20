export type setProfileACType = ReturnType<typeof setProfileAC>
export type updateProfileNameACType = ReturnType<typeof updateProfileNameAC>

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
export type updateNameProfileType = {
  name: string | null
}

export const setProfileAC = (profile: ResponseProfileType) => ({ type: 'PROFILE' } as const)
export const updateProfileNameAC = ({ name }: updateNameProfileType) => {
  return {
    type: 'UPDATE-NAME-PROFILE',
    payload: {
      name,
    },
  }
}
export type ProfileActionsType = setProfileACType | updateProfileNameACType
