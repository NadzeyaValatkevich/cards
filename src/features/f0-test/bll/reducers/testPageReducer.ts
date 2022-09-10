/*============TYPES===================================================================================================*/

export type TestPageStateType = {}

export type TestPageActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: TestPageStateType = {}

export const testPageReducer = (state: TestPageStateType = initialState, action: TestPageActionsType): TestPageStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)