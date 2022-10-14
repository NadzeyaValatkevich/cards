import { RequestStatusType } from 'app/bll/appReducer'
import { PaginationParamsType } from 'common/components/Pagination/Pagination'
import { PacksParamsType, PacksResponseType } from 'features/f2-packs/dal/packsAPI'

export type ActionPacksType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setPacksStatusAC>
  | ReturnType<typeof setPacksPaginationAC>
  | ReturnType<typeof setPacksSearchAC>
  | ReturnType<typeof setPacksSortAC>
  | ReturnType<typeof setPacksUserIdAC>
  | ReturnType<typeof setPacksMinMaxAC>
  | ReturnType<typeof setPacksInitialParamsAC>
  | ReturnType<typeof setPacksParamsAC>

export const setPacksStatusAC = (entityStatus: RequestStatusType) =>
  ({
    type: 'PACKS/SET-STATUS',
    payload: { entityStatus },
  } as const)
export const setPacksAC = (packsData: PacksResponseType) =>
  ({
    type: 'PACKS/SET-PACKS',
    payload: { packsData },
  } as const)
export const setPacksPaginationAC = (params: PaginationParamsType) =>
  ({
    type: 'PACKS/SET-PAGINATION',
    payload: { params },
  } as const)
export const setPacksSearchAC = (packName: string) =>
  ({
    type: 'PACKS/SET-SEARCH',
    payload: { packName },
  } as const)
export const setPacksSortAC = (name: string, dir: 'asc' | 'desc') =>
  ({
    type: 'PACKS/SET-SORT',
    payload: { name, dir },
  } as const)
export const setPacksUserIdAC = (user_id: string) =>
  ({
    type: 'PACKS/SET-USER-ID',
    payload: { user_id },
  } as const)
export const setPacksMinMaxAC = (min?: string, max?: string) =>
  ({
    type: 'PACKS/SET-MIN-MAX',
    payload: { min, max },
  } as const)
export const setPacksInitialParamsAC = () =>
  ({
    type: 'PACKS/SET-INIT-PARAMS',
  } as const)
export const setPacksParamsAC = (params: PacksParamsType) =>
  ({
    type: 'PACKS/SET-PARAMS',
    payload: { params },
  } as const)
