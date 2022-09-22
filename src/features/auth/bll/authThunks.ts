import { Dispatch } from 'redux'

import { AllActionsType } from '../../../app/bll/store'
import { signInAPI } from '../dal/signInAPI'

export const loginTC =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch<AllActionsType>) => {
    try {
      const response = await signInAPI.login(email, password, rememberMe)

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
