import { Dispatch } from 'redux'

import { AllActionsType } from '../../../app/bll/store'
import { setProfileAC } from '../../profile/bll/profileActions'
import { signInAPI } from '../dal/signInAPI'

import { setIsLoggedInAC } from './authActions'

export const loginTC =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch<AllActionsType>) => {
    try {
      const response = await signInAPI.login(email, password, rememberMe)

      dispatch(setProfileAC(response.data))
      dispatch(setIsLoggedInAC(true))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
