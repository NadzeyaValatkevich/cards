import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { CARDS } from 'app/ui/RoutesComponent'
import back from 'common/assets/image/back.svg'
export const BackToCardPacks = () => {
  return (
    <NavLink to={CARDS}>
      <img src={back} alt="back" />
      <Typography>Back to Packs List</Typography>
    </NavLink>
  )
}
