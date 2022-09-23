import { Dispatch } from 'redux'

import { signInAPI } from '../dal/signInAPI'

import { setLoggedInAC } from './authActions'

import { setAppErrorAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AllActionsType } from 'app/bll/store'

export const loginTC =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch<AllActionsType>) => {
    try {
      dispatch(setAppStatusAC(RequestStatusType.loading))
      const response = await signInAPI.login(email, password, rememberMe)

      if (response.error) {
        dispatch(setAppStatusAC(RequestStatusType.failed))
        dispatch(setAppErrorAC(response.error))
      } else {
        dispatch(setLoggedInAC(true))
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      dispatch(setAppStatusAC(RequestStatusType.failed))
      dispatch(setAppErrorAC(JSON.stringify(error)))
    }
  }
