import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import back from 'common/assets/image/back.svg'
import { AppRoutes } from 'common/enums/enums'

export const BackToCardPacks = () => {
  return (
    <NavLink to={AppRoutes.PACKS}>
      <img src={back} alt="back" />
      <Typography>Back to Packs List</Typography>
    </NavLink>
  )
}
