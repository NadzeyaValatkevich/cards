import { PacksParamsType, PacksResponseType } from 'features/packs/dal/packsAPI'

export type ActionPacksType = GetPacksActionType | SetParamsActionType

export const getPacksAC = (packsData: PacksResponseType) =>
  ({
    type: 'PACKS/GET-PACKS',
    payload: { packsData },
  } as const)

export const setParamsPacksAC = (params: PacksParamsType) =>
  ({
    type: 'PACKS/SET-PARAMS',
    payload: { params },
  } as const)

export type GetPacksActionType = ReturnType<typeof getPacksAC>
export type SetParamsActionType = ReturnType<typeof setParamsPacksAC>
