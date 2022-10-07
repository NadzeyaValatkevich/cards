import { AppRootStateType } from 'app/bll/store'

export const appStatusSelector = (state: AppRootStateType) => state.app.status
export const appInfoSelector = (state: AppRootStateType) => state.app.info
export const appErrorSelector = (state: AppRootStateType) => state.app.error
