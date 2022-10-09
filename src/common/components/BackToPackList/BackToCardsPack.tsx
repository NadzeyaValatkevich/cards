import { CSSProperties, FC } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { NavLink } from 'react-router-dom'

import back from 'common/assets/image/back.svg'
import { AppRoutes } from 'common/enums/enums'

type BackToCardPacksPropType = {
  Style?: CSSProperties
}

export const BackToCardPacks: FC<BackToCardPacksPropType> = ({ Style }) => {
  return (
    <NavLink
      to={AppRoutes.PACKS}
      style={{
        textDecoration: 'none',
        alignSelf: 'start',
        margin: '1.5rem 0',
        color: 'inherit',
        ...Style,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '.5rem',
        }}
      >
        <img src={back} alt="back" />
        <Typography>Back to Packs List</Typography>
      </Box>
    </NavLink>
  )
}
