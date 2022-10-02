import React, { FC, MouseEvent } from 'react'

import { Link, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SubmitHandler } from 'react-hook-form'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { forgotTC } from '../bll/authThunks'

import { AppRoutes } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'

export type recoverySendType = {
  email: string
}

export const Recovery: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onSuccessHandler: SubmitHandler<recoverySendType> = async data => {
    await dispatch(forgotTC(data))
    navigate(AppRoutes.CHECK_EMAIL)
  }

  const signInOnClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(AppRoutes.SIGN_IN)
  }

  return (
    <ContentWrapper>
      <FormContainer<recoverySendType> onSuccess={onSuccessHandler}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '22rem',
          }}
        >
          <Typography
            variant={'h5'}
            align={'center'}
            sx={{
              fontWeight: '600',
            }}
          >
            Forgot your password?
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
              // autoComplete={'username'}
              fullWidth
            />

            <Typography
              variant={'subtitle1'}
              sx={{
                marginTop: '1.5rem',
                opacity: '.5',
              }}
            >
              Enter your email address and we will send you further instructions{' '}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '4rem',
            }}
          >
            <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
              Send Instructions
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
              Did you remember your password?
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
              Try logging in
            </Link>
          </Box>
        </Box>
      </FormContainer>
    </ContentWrapper>
  )
}
