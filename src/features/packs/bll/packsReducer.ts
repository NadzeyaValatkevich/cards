import { ActionPacksType } from 'features/packs/bll/packsActions'
import { PacksParamsType, PackType } from 'features/packs/dal/packsAPI'

const initialState = {
  packsData: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 100,
    token: '',
    tokenDeathTime: 0,
  },
  params: initialPackParams,
  entityStatus: RequestStatusType.idle as RequestStatusType,
}

export type PacksInitialStateType = typeof initialState

export const packsReducer = (
  state: PacksInitialStateType = initialState,
  action: ActionPacksType
): PacksInitialStateType => {
  switch (action.type) {
    case 'PACKS/GET-PACKS':
      return { ...state, packsData: action.payload.packsData }
    case 'PACKS/SET-PARAMS':
      return { ...state, params: { ...state.params, ...action.payload.params } }
    case 'PACKS/SET-STATUS':
      return { ...state, entityStatus: action.payload.entityStatus }
    default:
      return state
  }
}
