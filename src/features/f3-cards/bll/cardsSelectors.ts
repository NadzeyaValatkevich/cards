import { AppRootStateType } from 'app/bll/store'

export const cardsPackSelector = (state: AppRootStateType) => state.cards.cardsData.cards
export const cardsEntityStatusSelector = (state: AppRootStateType) => state.cards.entityStatus
export const cardsPackDataSelector = (state: AppRootStateType) => state.cards.cardsData
export const cardsPackNameSelector = (state: AppRootStateType) => state.cards.cardsData.packName
export const cardsParamsSelector = (state: AppRootStateType) => state.cards.params
export const cardsPackIsDeletedSelector = (state: AppRootStateType) => state.cards.isDeleted
