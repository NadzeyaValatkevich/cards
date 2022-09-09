import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {AppActionsType, appReducer} from "../reducers/appReducer";

const rootReducer = combineReducers({
    app: appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = AppActionsType

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))