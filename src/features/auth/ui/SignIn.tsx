import React from 'react'

import { Button, Link, Typography } from '@mui/material'
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

import { REC_PASSWORD, SIGN_UP } from '../../../app/ui/RoutesComponent'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { loginTC } from '../bll/authThunks'

import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <ContentWrapper sx={{ width: '450px' }}>
      <Typography variant="h4">Sign In</Typography>
      <FormContainer
        defaultValues={{ email: '', password: '', rememberMe: true }}
        onSuccess={({ email, password, rememberMe }) =>
          dispatch(loginTC(email, password, rememberMe))
        }
      >
        <TextFieldElement
          required
          type="email"
          label="Email"
          variant="standard"
          margin="dense"
          name="email"
          sx={{ width: '100%' }}
        />
        <PasswordElement
          required
          margin="dense"
          label="Password"
          name="password"
          variant="standard"
          sx={{ width: '100%', marginBottom: '30px' }}
        />
        <CheckboxElement name={'rememberMe'} label={'Remember me'} sx={{ marginBottom: '30px' }} />
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
        >
          Sign In
        </Button>
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
