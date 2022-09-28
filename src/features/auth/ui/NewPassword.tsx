import React, { MouseEvent } from 'react'

import { Link, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SubmitHandler } from 'react-hook-form'
import { PasswordElement, FormContainer } from 'react-hook-form-mui'
import { useNavigate, useParams } from 'react-router-dom'

import { SIGN_IN } from 'app/ui/RoutesComponent'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/hooks'
import { passwordValidation } from 'common/validation/validation'
import { setSendNewPasswordAC } from 'features/auth/bll/authActions'
import { sendNewPasswordTC } from 'features/auth/bll/authThunks'
import { registerType } from 'features/auth/ui/SignUp'

export type FormNewPasswordType = {
  password: string
}

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()
  const onSuccessHandler: SubmitHandler<FormNewPasswordType> = data => {
    dispatch(setSendNewPasswordAC(false))
    dispatch(sendNewPasswordTC(data.password, token))
    navigate(SIGN_IN)
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
          <Typography variant={'h4'} align={'center'} sx={{ fontWeight: '600' }}>
            Create new password
          </Typography>
          <Box
            marginTop={'2.5rem'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <PasswordElement
              type={'password'}
              margin={'dense'}
              label={'Password'}
              name={'password'}
              variant={'standard'}
              fullWidth
              validation={passwordValidation}
            />
            <Typography variant={'subtitle1'} style={{ marginBottom: '20px' }}>
              Create new password and we will send you further instructions to email
            </Typography>
            <Button
              type={'submit'}
              color={'primary'}
              variant={'contained'}
              fullWidth
              // onClick={onClickNewPasswordHandler}
              sx={{
                marginTop: '80px',
                fontWeight: '600',
              }}
            >
              Create new password
            </Button>
          </Box>
        </Box>
      </FormContainer>
    </ContentWrapper>
  )
}
