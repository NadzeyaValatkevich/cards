import { ProfileActionsType } from './profileActions'

export type ProfileStateType = typeof initialState

const initialState = {
  _id: null as string | null,
  email: null as string | null,
  name: null as string | null,
  avatar: null as string | null,
  publicCardPacksCount: null as number | null,
  created: null as Date | null,
  updated: null as Date | null,
  isAdmin: null as boolean | null,
  verified: null as boolean | null,
  rememberMe: null as boolean | null,
  error: null as string | null,
  __v: null as number | null,
  token: null as string | null,
  tokenDeathTime: null as number | null,
}

export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionsType
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE':
      return { ...state, ...action.payload.profile }
    case 'PROFILE/UPDATE-NAME-PROFILE':
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}
