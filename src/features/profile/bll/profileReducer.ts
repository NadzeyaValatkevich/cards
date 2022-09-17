import { ProfileActionsType } from './profileActions'

export type ProfileStateType = {}

const initialState: ProfileStateType = {}

export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionsType
): ProfileStateType => {
  switch (action.type) {
    default:
      return state
  }
}
