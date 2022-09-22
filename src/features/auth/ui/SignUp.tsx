import React, { MouseEvent } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import * as yup from 'yup'

import { ContentWrapper } from '../../../common/components/contentWrapper/ContentWrapper'

type PropsType = {}

export type LoginType = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

export const SignUp: React.FC<PropsType> = ({}) => {
  const onSuccessHandler: SubmitHandler<LoginType> = data => {
    console.log(data)
  }

  const signInOnClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  return (
    <ContentWrapper>
      <FormContainer<LoginType> onSuccess={onSuccessHandler}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '21.875rem',
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
              margin={'none'}
              label={'Email'}
              name={'email'}
              variant={'standard'}
              fullWidth
            />
            <PasswordElement
              type={'password'}
              margin={'none'}
              label={'Password'}
              name={'password'}
              variant={'standard'}
              fullWidth
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
            <a href={'#'} onClick={signInOnClickHandler}>
              <Typography
                variant={'subtitle1'}
                align={'center'}
                sx={{
                  margin: '0.625rem',
                  fontWeight: '600',
                }}
              >
                Sign In
              </Typography>
            </a>
          </Box>
        </Box>
      </FormContainer>
    </ContentWrapper>
  )
}
