/*============TYPES===================================================================================================*/

export type ResetPasswordStateType = {}

export type ResetPasswordActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: ResetPasswordStateType = {}

export const resetPasswordReducer = (state: ResetPasswordStateType = initialState, action: ResetPasswordActionsType): ResetPasswordStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)