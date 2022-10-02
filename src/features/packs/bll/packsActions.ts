import { RequestStatusType } from 'app/bll/appReducer'
import { PacksParamsType, PacksResponseType } from 'features/packs/dal/packsAPI'

export type ActionPacksType = GetPacksActionType | SetParamsActionType | setPacksStatusActionType

export const getPacksAC = (packsData: PacksResponseType) =>
  ({
    type: 'PACKS/GET-PACKS',
    payload: { packsData },
  } as const)

export const setPacksParamsAC = (params: PacksParamsType) =>
  ({
    type: 'PACKS/SET-PARAMS',
    payload: { params },
  } as const)

export const setPacksStatusAC = (entityStatus: RequestStatusType) =>
  ({
    type: 'PACKS/SET-STATUS',
    payload: { entityStatus },
  } as const)

export type GetPacksActionType = ReturnType<typeof getPacksAC>
export type SetParamsActionType = ReturnType<typeof setPacksParamsAC>
export type setPacksStatusActionType = ReturnType<typeof setPacksStatusAC>
