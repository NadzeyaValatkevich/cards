import React from 'react'

import { Button, FormControl, TextField, Typography } from '@mui/material'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { SIGN_IN } from '../../../app/ui/RoutesComponent'
import { ContentWrapper } from '../../../common/components/contentWrapper/ContentWrapper'

import { emailValidation } from './validation'

type FormValues = {
  email: string
}
const defaultValues = {
  email: '',
}

export const Recovery: React.FC = () => {
  const methods = useForm<FormValues>({ defaultValues: defaultValues, mode: 'onBlur' })
  const {
    handleSubmit,
    formState: { isValid },
  } = methods
  // const { control } = useFormContext()
  const navigate = useNavigate()

  return (
    <ContentWrapper>
      <Typography variant="h4">Forgot your password?</Typography>
      <FormProvider {...methods}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            width: '347px',
          }}
        >
          <FormControl style={{ width: '100%' }}>
            <Controller
              name={'email'}
              // control={control}
              rules={emailValidation}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <TextField
                  label={'Email'}
                  helperText={error ? error.message : null}
                  size="medium"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  variant="standard"
                  required={true}
                  onBlur={onBlur}
                />
              )}
            />
            <Typography variant={'subtitle1'} style={{ marginBottom: '60px' }}>
              Enter your email address and we will send you further instructions
            </Typography>
            <Button
              onClick={() => {}}
              variant={'contained'}
              disabled={!isValid}
              style={{
                width: '100%',
              }}
            >
              Send instructions
            </Button>
            <Typography variant={'subtitle2'} component={'div'}>
              Did you remember your password?
            </Typography>
            <Button
              variant={'text'}
              color={'primary'}
              onClick={() => {
                navigate(SIGN_IN, { replace: true })
              }}
              style={{ marginBottom: '60px' }}
            >
              Try logging in
            </Button>
          </FormControl>
        </form>
      </FormProvider>
    </ContentWrapper>
  )
}
