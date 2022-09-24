import React, { FC, MouseEvent } from 'react'

import { Button, Link, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { SubmitHandler } from 'react-hook-form'
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

import { loginTC } from '../bll/authThunks'

import { PROFILE, SIGN_UP } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'

type PropsType = {}

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export const SignIn: FC<PropsType> = ({}) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onSuccessHandler: SubmitHandler<LoginType> = data => {
    dispatch(loginTC(data))
  }

  const signUpOnClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(SIGN_UP)
  }

  isLoggedIn && navigate(PROFILE)

  return (
    <ContentWrapper>
      <FormContainer<LoginType> onSuccess={onSuccessHandler}>
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
            Sign In
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '2.5rem',
            }}
          >
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
            />
            <CheckboxElement name={'rememberMe'} label={'Remember me'} />
            <Link style={{ alignSelf: 'flex-end', marginTop: '2rem' }} href="#" variant="body2">
              Forgot Password?
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '4.75rem',
            }}
          >
            <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
              Sign In
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
              onClick={signUpOnClickHandler}
              sx={{
                margin: '0.625rem',
                fontWeight: '600',
              }}
            >
              Sign Up
            </Link>
          </Box>
        </Box>
      </FormContainer>
    </ContentWrapper>
  )
}
