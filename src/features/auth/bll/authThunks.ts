import { Dispatch } from 'redux'

import { AllActionsType } from '../../../app/bll/store'
import { setProfileAC } from '../../profile/bll/profileActions'
import { LoginParamsType, signInAPI } from '../dal/signInAPI'

import { setIsLoggedInAC } from './authActions'

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<AllActionsType>) => {
  try {
    const response = await signInAPI.login(data)

    dispatch(setProfileAC(response.data))
    dispatch(setIsLoggedInAC(true))
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
