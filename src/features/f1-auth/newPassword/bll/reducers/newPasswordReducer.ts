/*============TYPES===================================================================================================*/

export type NewPasswordStateType = {}

export type NewPasswordActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: NewPasswordStateType = {}

export const newPasswordReducer = (state: NewPasswordStateType = initialState, action: NewPasswordActionsType): NewPasswordStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)