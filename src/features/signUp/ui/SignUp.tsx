import React, { useState } from 'react'

import { Button, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useForm, FormProvider } from 'react-hook-form'
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { Navigate } from 'react-router-dom'

import { AppRootStateType } from 'app/bll/store'
import { SIGN_IN } from 'app/ui/RoutesComponent'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { emailValidation, passwordValidation } from 'common/validation/validation'
import { setNewUserTC } from 'features/signUp/bll/signUpThunks'

type FormInputType = {
  email: string
  password: string
  confirmPassword: string
}

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
}

export const SignUp: React.FC = ({}) => {
  const isRegistration = useAppSelector(
    (state: AppRootStateType) => state.registration.isRegistration
  )
  const dispatch = useAppDispatch()
  const methods = useForm<FormInputType>({ defaultValues: defaultValues, mode: 'onBlur' })
  const {
    handleSubmit,
    formState: { isValid },
  } = methods

  if (isRegistration) {
    return <Navigate to={SIGN_IN} />
  }

  const onSubmit = (data: FormInputType) => {
    console.log(data.email, data.password)
    dispatch(setNewUserTC(data.email, data.password))
  }

  return (
    // <ThemeProvider theme={signUpTheme}>

    <FormContainer defaultValues={{}} FormProps={{}}>
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 3rem',
        }}
      >
        <Typography variant={'h4'}>Sign Up</Typography>
        <FormProvider {...methods}>
          <form>
            <TextFieldElement
              type={'email'}
              margin={'dense'}
              label={'Email'}
              name={'email'}
              variant={'standard'}
              validation={emailValidation}
              sx={{ width: '100%', backgroundColor: 'white' }}
            />
            <br />
            <PasswordElement
              margin={'dense'}
              label={'Password'}
              required
              name={'password'}
              variant={'standard'}
              validation={passwordValidation}
            />
            <br />
            <PasswordRepeatElement
              passwordFieldName={'password'}
              name={'password-repeat'}
              margin={'dense'}
              label={'Confirm password'}
              variant={'standard'}
              validation={passwordValidation}
            />
            <br />
            <Button
              type={'submit'}
              color={'primary'}
              variant={'contained'}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </FormContainer>

    // </ThemeProvider>
  )
}
