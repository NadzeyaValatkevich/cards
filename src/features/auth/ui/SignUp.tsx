import React, { FC, MouseEvent } from 'react'

import { Link, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SubmitHandler } from 'react-hook-form'
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

import { PROFILE, SIGN_IN } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { passwordValidation } from 'common/validation/validation'
import { registerTC } from 'features/auth/bll/authThunks'

type PropsType = {}

export type registerType = {
  email: string
  password: string
}

export const SignUp: FC<PropsType> = ({}) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const isRegistered = useAppSelector(state => state.auth.isRegistered)

  const onSuccessHandler: SubmitHandler<registerType> = data => {
    const { email, password } = data

    dispatch(registerTC({ email, password }))
  }

  const signInOnClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(SIGN_IN)
  }

  isRegistered && navigate(PROFILE)

  return (
    <ContentWrapper>
      <FormContainer<registerType> onSuccess={onSuccessHandler}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '22rem',
          }}
        >
          <Typography
            variant={'h4'}
            align={'center'}
            sx={{
              fontWeight: '600',
            }}
          >
            Sign Up
          </Typography>
          <Box marginTop={'2.5rem'}>
            <TextFieldElement
              type={'email'}
              margin={'dense'}
              label={'Email'}
              name={'email'}
              variant={'standard'}
              fullWidth
            />
            <PasswordElement
              type={'password'}
              margin={'dense'}
              label={'Password'}
              name={'password'}
              variant={'standard'}
              fullWidth
              validation={passwordValidation}
            />
            <PasswordRepeatElement
              passwordFieldName={'password'}
              name={'password-repeat'}
              margin={'dense'}
              label={'Confirm password'}
              variant={'standard'}
              required
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '3.75rem',
            }}
          >
            <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
              Sign Up
            </Button>
            <Typography
              variant={'subtitle2'}
              align={'center'}
              sx={{
                opacity: '50%',
                marginTop: '2rem',
                fontWeight: '600',
              }}
            >
              Already have an account?
            </Typography>
            <Link
              variant="subtitle1"
              onClick={signInOnClickHandler}
              sx={{
                margin: '0.625rem',
                fontWeight: '600',
              }}
            >
              Sign In
            </Link>
          </Box>
        </Box>
      </FormContainer>
    </ContentWrapper>
  )
}
