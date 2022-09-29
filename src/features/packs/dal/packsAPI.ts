import { PackStateType } from '../bll/packsReducer'

import { instance } from 'app/dal/instance'

export const packsAPI = {
  getPacks() {
    return instance.get<PackStateType>('cards/pack')
  },
}
