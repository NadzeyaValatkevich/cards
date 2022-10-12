import { composeWithDevTools } from '@redux-devtools/extension'
import { throttle } from 'lodash'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType } from 'app/bll/appActions'
import { appReducer } from 'app/bll/appReducer'
import { loadState, saveState } from 'common/utils/localStorage'
import { AuthActionsType } from 'features/f0-auth/bll/authActions'
import { authReducer } from 'features/f0-auth/bll/authReducer'
import { ProfileActionsType } from 'features/f1-profile/bll/profileActions'
import { profileReducer } from 'features/f1-profile/bll/profileReducer'
import { ActionPacksType } from 'features/f2-packs/bll/packsActions'
import { packsReducer } from 'features/f2-packs/bll/packsReducer'
import { ActionCardsType } from 'features/f3-cards/bll/cardsActions'
import { cardsReducer } from 'features/f3-cards/bll/cardsReducer'

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
