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
        color: 'inherit',
        // position: 'absolute',
        // top: '5rem',
        // alignSelf: 'start',
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
