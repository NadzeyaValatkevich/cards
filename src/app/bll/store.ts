import { composeWithDevTools } from '@redux-devtools/extension'
import { throttle } from 'lodash'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { loadState, saveState } from '../../common/utils/localStorage'
import { ActionCardsType } from '../../features/cards/bll/cardsActions'

import { AppActionsType } from 'app/bll/appActions'
import { appReducer } from 'app/bll/appReducer'
import { AuthActionsType } from 'features/auth/bll/authActions'
import { authReducer } from 'features/auth/bll/authReducer'
import { cardsReducer } from 'features/cards/bll/cardsReducer'
import { ActionPacksType } from 'features/packs/bll/packsActions'
import { packsReducer } from 'features/packs/bll/packsReducer'
import { ProfileActionsType } from 'features/profile/bll/profileActions'
import { profileReducer } from 'features/profile/bll/profileReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType =
  | AppActionsType
  | ProfileActionsType
  | AuthActionsType
  | ActionPacksType
  | ActionCardsType

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const persistedState = loadState<AppRootStateType>()

export const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

store.subscribe(
  throttle(() => {
    saveState<AppRootStateType>({
      ...store.getState(),
    })
  }, 1000)
)

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>
