import React from 'react'

import { Button, Link, Typography } from '@mui/material'
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'

import { ContentWrapper } from '../../../common/components/contentWrapper/ContentWrapper'

export const SignIn: React.FC = () => {
  return (
    <ContentWrapper sx={{ width: '450px' }}>
      <Typography variant="h4">Sign In</Typography>
      <FormContainer defaultValues={{}} FormProps={{}}>
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
          margin={'dense'}
          label={'Password'}
          name={'password'}
          variant={'standard'}
          sx={{ width: '100%', marginBottom: '30px' }}
        />
        <CheckboxElement
          required
          name={'rememberMe'}
          label={'Remember me'}
          sx={{ marginBottom: '30px' }}
        />
        <Link
          sx={{ display: 'block', textAlign: 'end', marginBottom: '50px' }}
          href="#"
          variant="body2"
        >
          Forgot Password?
        </Link>
        <Button
          sx={{ width: '100%', marginBottom: '31px', borderRadius: '20px' }}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </FormContainer>
      <Typography sx={{ marginBottom: '11px' }} variant="subtitle2">
        Already have an account?
      </Typography>
      <Link href="#" variant="body2">
        Sign Up
      </Link>
    </ContentWrapper>
  )
}
