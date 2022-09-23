import { ProfileActionsType } from './profileActions'

export type ProfileStateType = {
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

const initialState: ProfileStateType = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  publicCardPacksCount: null,
  created: null,
  updated: null,
  isAdmin: null,
  verified: null,
  rememberMe: null,
  error: null,
  __v: null,
  token: null,
  tokenDeathTime: null,
}

export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionsType
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE':
      return action.profile
    case 'UPDATE-NAME-PROFILE':
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}
