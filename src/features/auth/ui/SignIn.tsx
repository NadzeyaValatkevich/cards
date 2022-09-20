import React from 'react'

import { Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@mui/material'

import { ContentWrapper } from '../../../common/components/contentWrapper/ContentWrapper'

export const SignIn: React.FC = () => {
  return (
    <ContentWrapper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px 33px',
      }}
    >
      <Typography variant="h4">Sign In</Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '30px',
          width: '347px',
        }}
        onSubmit={() => alert('saved')}
      >
        <TextField
          style={{ width: '100%', marginBottom: '15px', height: '1' }}
          type="email"
          label="Email"
          variant="standard"
        />
        <TextField
          style={{ width: '100%', marginBottom: '15px', height: '1' }}
          type="password"
          label="Password"
          variant="standard"
        />
        <FormControlLabel
          style={{ alignSelf: 'flex-start', marginBottom: '29px' }}
          label="Remember me"
          control={<Checkbox defaultChecked />}
        />
        <Link style={{ alignSelf: 'flex-end', marginBottom: '99px' }} href="#" variant="body2">
          Forgot Password?
        </Link>
        <Button
          style={{ width: '100%', marginBottom: '31px', borderRadius: '20px' }}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        <Typography style={{ marginBottom: '11px' }} variant="subtitle2">
          Already have an account?
        </Typography>
        <Link href="#" variant="body2">
          Sign Up
        </Link>
      </form>
    </ContentWrapper>
  )
}
