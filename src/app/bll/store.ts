import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType } from './appActions'
import { appReducer } from './appReducer'

import { AuthActionsType } from 'features/auth/bll/authActions'
import { authReducer } from 'features/auth/bll/authReducer'
import { ProfileActionsType } from 'features/profile/bll/profileActions'
import { profileReducer } from 'features/profile/bll/profileReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = AppActionsType | ProfileActionsType | AuthActionsType

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>
