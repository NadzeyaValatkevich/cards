/*============TYPES===================================================================================================*/

export type PageNotFoundStateType = {}

export type PageNotFoundActionsType =
    | ReturnType<typeof fakeAC>

/*==========REDUCER===================================================================================================*/

const initialState: PageNotFoundStateType = {}

export const pageNotFoundReducer = (state: PageNotFoundStateType = initialState, action: PageNotFoundActionsType): PageNotFoundStateType => {
    switch (action.type) {
        default:
            return state
    }
}

/*============ActionCreators==========================================================================================*/

export const fakeAC = () => ({type: 'FAKE-ACTION'} as const)