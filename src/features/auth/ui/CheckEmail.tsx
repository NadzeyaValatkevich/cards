import React, { FC } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { SIGN_IN } from 'app/ui/RoutesComponent'
import emailImg from 'common/assets/image/email.svg'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'

export type recoverySendType = {
  email?: string
}

export const CheckEmail: FC<recoverySendType> = ({ email }) => {
  const navigate = useNavigate()

  const signInOnClickHandler = () => {
    navigate(SIGN_IN)
  }

  return (
    <ContentWrapper>
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
          Check Email
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <Box
            component={'img'}
            src={emailImg}
            alt={'email logo'}
            sx={{
              width: '6.75rem',
            }}
          />
          <Typography
            variant={'subtitle1'}
            textAlign={'center'}
            sx={{
              marginTop: '2em',
              marginBottom: '2em',
              opacity: '.5',
            }}
          >{`
              We’ve sent an Email with instructions to
              ${email}
            `}</Typography>
          <Button color={'primary'} variant={'contained'} fullWidth onClick={signInOnClickHandler}>
            Back to login
          </Button>
        </Box>
      </Box>
    </ContentWrapper>
  )
}
