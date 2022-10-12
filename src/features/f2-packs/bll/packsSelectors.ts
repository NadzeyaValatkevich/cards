import { AppRootStateType } from 'app/bll/store'

export const packsParamsSelector = (state: AppRootStateType) => state.packs.params
export const packsEntityStatusSelector = (state: AppRootStateType) => state.packs.entityStatus
export const packsDataSelector = (state: AppRootStateType) => state.packs.packsData
export const cardsPackSelector = (state: AppRootStateType) => state.packs.packsData.cardPacks
export const profileSelector = (state: AppRootStateType) => state.profile
export const packsSearchParamSelector = (state: AppRootStateType) => state.packs.params.packName
