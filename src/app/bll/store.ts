import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {AppActionsType, appReducer} from "./reducers/appReducer";
import {LoginActionsType, loginReducer} from "../../features/f1-auth/login/bll/reducers/loginReducer";
import {
    NewPasswordActionsType,
    newPasswordReducer
} from "../../features/f1-auth/newPassword/bll/reducers/newPasswordReducer";
import {ProfileActionsType, profileReducer} from "../../features/f1-auth/profile/bll/reducers/profileReducer";
import {
    RegistrationActionsType,
    registrationReducer
} from "../../features/f1-auth/registration/bll/reducers/registrationReducer";
import {
    ResetPasswordActionsType,
    resetPasswordReducer
} from "../../features/f1-auth/resetPassword/bll/reducers/resetPasswordReducer";
import {PageNotFoundActionsType} from "../../features/pageNotFound/bll/reducers/pageNotFoundReducer";
import {TestPageActionsType, testPageReducer} from "../../features/f0-test/bll/reducers/testPageReducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    resetPassword: resetPasswordReducer,
    testPage: testPageReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = AppActionsType
    | LoginActionsType
    | NewPasswordActionsType
    | ProfileActionsType
    | RegistrationActionsType
    | ResetPasswordActionsType
    | PageNotFoundActionsType
    | TestPageActionsType

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))