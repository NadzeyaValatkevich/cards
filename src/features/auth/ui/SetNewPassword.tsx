import React, { FC } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SubmitHandler } from 'react-hook-form'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { useNavigate, useParams } from 'react-router-dom'

import { createNewPasswordTC } from '../bll/authThunks'

import { SIGN_IN } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/hooks'
import { errorUtils } from 'common/utils/error-utils'
import { passwordValidation } from 'common/validation/validation'

export type createNewPasswordSendType = {
  password: string
}

export const SetNewPassword: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { resetPasswordToken } = useParams<string>()
  const onSuccessHandler: SubmitHandler<createNewPasswordSendType> = async password => {
    const data = {
      ...password,
      resetPasswordToken,
    }

    try {
      await dispatch(createNewPasswordTC(data))
      navigate(SIGN_IN)
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

  return (
    <ContentWrapper>
      <FormContainer<{ password: string }> onSuccess={onSuccessHandler}>
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
            Create new password
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '2.5rem',
            }}
          >
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
            <Typography
              variant={'subtitle1'}
              sx={{
                marginTop: '1.5rem',
                opacity: '.5',
              }}
            >
              Create new password and we will send you further instructions to email
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
              Create new password
            </Button>
          </Box>
        </Box>
      </FormContainer>
    </ContentWrapper>
  )
}
