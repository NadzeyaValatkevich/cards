import React from 'react'

import { Button, Link, Typography } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  SubmitHandler,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { emailValidation, passwordValidation } from '../../../common/validation/validation'
import { loginTC } from '../bll/authThunks'

import { AppRootStateType } from 'app/bll/store'
import { PROFILE, REC_PASSWORD, SIGN_UP } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'

type FormInputType = {
  email: string
  password: string
  rememberMe: boolean
}

const defaultValues = {
  email: '',
  password: '',
  rememberMe: false,
}

export const SignIn: React.FC = () => {
  const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const methods = useForm<FormInputType>({ defaultValues: defaultValues, mode: 'onBlur' })
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormInputType> = data => {
    dispatch(loginTC(data.email, data.password, data.rememberMe))
  }

  if (isLoggedIn) {
    navigate(PROFILE)
  }

  return (
    <ContentWrapper sx={{ width: '450px' }}>
      <Typography variant="h4">Sign In</Typography>

      <FormContainer
      // defaultValues={{ email: '', password: '', rememberMe: true }}
      // onSuccess={({ email, password, rememberMe }) =>
      //   dispatch(loginTC(email, password, rememberMe))
      // }
      >
        <FormProvider {...methods}>
          <form>
            <TextFieldElement
              required
              type="email"
              label="Email"
              variant="standard"
              margin="dense"
              name="email"
              validation={emailValidation}
              sx={{ width: '100%' }}
            />
            <PasswordElement
              required
              margin="dense"
              label="Password"
              name="password"
              variant="standard"
              validation={passwordValidation}
              sx={{ width: '100%', marginBottom: '30px' }}
            />
            <CheckboxElement
              name={'rememberMe'}
              label={'Remember me'}
              sx={{ marginBottom: '30px' }}
            />
            <Link
              sx={{ display: 'block', textAlign: 'end', marginBottom: '50px', cursor: 'pointer' }}
              variant="body2"
              onClick={() => navigate(REC_PASSWORD)}
            >
              Forgot Password?
            </Link>
            <Button
              sx={{ width: '100%', marginBottom: '31px', borderRadius: '20px' }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>
          </form>
        </FormProvider>
      </FormContainer>
      <Typography sx={{ marginBottom: '11px' }} variant="subtitle2">
        Already have an account?
      </Typography>
      <Link variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate(SIGN_UP)}>
        Sign Up
      </Link>
    </ContentWrapper>
  )
}
