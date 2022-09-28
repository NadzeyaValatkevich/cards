import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { SIGN_IN } from 'app/ui/RoutesComponent'
import { SVGMail } from 'common/assets/image/SVGMail'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'

export const CheckEmail = () => {
  const navigate = useNavigate()

  return (
    <ContentWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '22rem',
          alignItems: 'center',
        }}
      >
        <Typography
          variant={'h4'}
          align={'center'}
          style={{ marginBottom: '20px', fontWeight: '600' }}
        >
          Check Email
        </Typography>
        <SVGMail />
        <Typography
          variant={'subtitle2'}
          component={'div'}
          style={{ marginTop: '20px' }}
          align={'center'}
        >
          We have sent an Email with instructions to example@mail.com
        </Typography>
        <Button
          variant={'contained'}
          color={'primary'}
          style={{ marginTop: '80px', width: '100%' }}
          onClick={() => {
            navigate(SIGN_IN, { replace: true })
          }}
        >
          Back to login
        </Button>
      </Box>
    </ContentWrapper>
  )
}
