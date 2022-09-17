import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { AuthActionsType } from '../../features/auth/bll/authActions'
import { authReducer } from '../../features/auth/bll/authReducer'
import { ProfileActionsType } from '../../features/profile/bll/profileActions'
import { profileReducer } from '../../features/profile/bll/profileReducer'

import { AppActionsType, appReducer } from './appReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = AppActionsType | ProfileActionsType | AuthActionsType

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
