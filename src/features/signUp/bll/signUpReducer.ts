import { SetNewUserActionType } from 'features/signUp/bll/sighUpActions'

const initialState = {
  isRegistration: false,
}

type InitialStateType = typeof initialState
export const signUpReducer = (
  state: InitialStateType = initialState,
  action: SetNewUserActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET-NEW-USER':
      return {
        ...state,
        isRegistration: action.payload.success,
      }
    default:
      return state
  }
}
