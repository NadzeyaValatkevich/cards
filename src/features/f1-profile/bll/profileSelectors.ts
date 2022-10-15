import { AppRootStateType } from 'app/bll/store'

export const profileSelector = (state: AppRootStateType) => state.profile
export const profileIdSelector = (state: AppRootStateType) => state.profile._id
