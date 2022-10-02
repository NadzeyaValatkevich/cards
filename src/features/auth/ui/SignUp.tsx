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

import { registerTC } from '../bll/authThunks'

import { AppRoutes } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/hooks'
import { passwordValidation } from 'common/validation/validation'

type PropsType = {}

export type registerType = {
  email: string
  password: string
}

export const SignUp: FC<PropsType> = ({}) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onSuccessHandler: SubmitHandler<registerType> = async data => {
    const { email, password } = data

    await dispatch(registerTC({ email, password }))
    navigate(AppRoutes.SIGN_IN)
  }

  const signInOnClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(AppRoutes.SIGN_IN)
  }

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
              // autoComplete={'username'}
              fullWidth
            />
            <PasswordElement
              type={'password'}
              name={'password'}
              margin={'dense'}
              label={'Password'}
              variant={'standard'}
              fullWidth
              // autoComplete={'new-password'}
              validation={passwordValidation}
            />
            <PasswordRepeatElement
              passwordFieldName={'password'}
              name={'password-repeat'}
              margin={'dense'}
              label={'Confirm password'}
              variant={'standard'}
              // autoComplete={'new-password'}
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
              href={AppRoutes.SIGN_IN}
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
