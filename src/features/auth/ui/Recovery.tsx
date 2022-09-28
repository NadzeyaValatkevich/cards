import React, { FC } from 'react'

import { Button, Link, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { SubmitHandler } from 'react-hook-form'
import { TextFieldElement, FormContainer } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

import { setSendEmailAC } from '../bll/authActions'
import { sendEmailTC } from '../bll/authThunks'

import { CHECK_EMAIL, SIGN_IN } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'

export type FormValues = {
  email: string
}

export const Recovery: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSendEmail = useAppSelector(state => state.auth.isSendEmail)
  const onSuccessHandler: SubmitHandler<FormValues> = data => {
    dispatch(setSendEmailAC(false))
    dispatch(sendEmailTC(data.email))
  }

  if (isSendEmail) {
    navigate(CHECK_EMAIL)
  }

  return (
    <ContentWrapper>
      <FormContainer<FormValues> onSuccess={onSuccessHandler}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '22rem',
          }}
        >
          <Typography
            variant="h4"
            align={'center'}
            sx={{
              fontWeight: '600',
            }}
          >
            Forgot your password?
          </Typography>
          <Box
            marginTop={'2.5rem'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '22rem',
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
            <Typography variant={'subtitle1'} style={{ marginBottom: '60px' }}>
              Enter your email address and we will send you further instructions
            </Typography>
            <Button onClick={() => {}} type={'submit'} variant={'contained'} fullWidth>
              Send instructions
            </Button>
            <Typography variant={'subtitle2'} component={'div'}>
              Did you remember your password?
            </Typography>
            <Link
              variant="subtitle1"
              onClick={() => {
                navigate(SIGN_IN, { replace: true })
              }}
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
