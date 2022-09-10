/*============TYPES===================================================================================================*/

export type LoginStateType = {}

export type LoginActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: LoginStateType = {}

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)