/*============TYPES===================================================================================================*/

export type ProfileStateType = {}

export type ProfileActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: ProfileStateType = {}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)