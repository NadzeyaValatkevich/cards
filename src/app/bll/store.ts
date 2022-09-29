import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { PacksActionsType } from '../../features/packs/bll/packsActions'

import { AppActionsType } from './appActions'
import { appReducer } from './appReducer'

import { AuthActionsType } from 'features/auth/bll/authActions'
import { authReducer } from 'features/auth/bll/authReducer'
import { packsReducer } from 'features/packs/bll/packsReducer'
import { ProfileActionsType } from 'features/profile/bll/profileActions'
import { profileReducer } from 'features/profile/bll/profileReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType =
  | AppActionsType
  | AuthActionsType
  | ProfileActionsType
  | PacksActionsType

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>
