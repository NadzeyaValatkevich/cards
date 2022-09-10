/*============TYPES===================================================================================================*/

export enum RequestStatusType {
    idle,
    loading,
}

export type AppStateType = {
    status: RequestStatusType
    error: string | null
}

export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>

/*==========REDUCER===================================================================================================*/

const initialState: AppStateType = {
    status: RequestStatusType.idle,
    error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

/*============ThunkCreators===========================================================================================*/