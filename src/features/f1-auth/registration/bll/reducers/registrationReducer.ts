/*============TYPES===================================================================================================*/

export type RegistrationStateType = {}

export type RegistrationActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: RegistrationStateType = {}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)