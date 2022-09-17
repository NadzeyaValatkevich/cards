import { PageNotFoundActionsType } from './pageNotFoundActions'

export type PageNotFoundStateType = {}

const initialState: PageNotFoundStateType = {}

export const pageNotFoundReducer = (
  state: PageNotFoundStateType = initialState,
  action: PageNotFoundActionsType
): PageNotFoundStateType => {
  switch (action.type) {
    default:
      return state
  }
}
