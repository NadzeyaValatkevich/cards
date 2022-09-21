import React from 'react'

import { Button, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
} from 'react-hook-form-mui'

type PropsType = {}

export const SignUp: React.FC<PropsType> = ({}) => {
  return (
    // <ThemeProvider theme={signUpTheme}>
    <FormContainer defaultValues={{}} FormProps={{}}>
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 3rem',
        }}
      >
        <Typography variant={'h4'}>Sign Up</Typography>
        <TextFieldElement
          type={'email'}
          margin={'dense'}
          label={'Email'}
          name={'email'}
          variant={'standard'}
          sx={{ width: '100%', backgroundColor: 'white' }}
        />
        <br />
        <PasswordElement
          margin={'dense'}
          label={'Password'}
          required
          name={'password'}
          variant={'standard'}
        />
        <br />
        <PasswordRepeatElement
          passwordFieldName={'password'}
          name={'password-repeat'}
          margin={'dense'}
          label={'Confirm password'}
          variant={'standard'}
        />
        <br />
        <Button type={'submit'} color={'primary'} variant={'contained'}>
          Submit
        </Button>
      </Paper>
    </FormContainer>
    // </ThemeProvider>
  )
}
