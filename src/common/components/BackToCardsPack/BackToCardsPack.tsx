import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { NavLink } from 'react-router-dom'

import back from 'common/assets/image/back.svg'
import { AppRoutes } from 'common/enums/enums'

export const BackToCardsPacks = () => {
  return (
    <NavLink to={AppRoutes.PACKS} style={{ textDecoration: 'none', marginBottom: '0,25' }}>
      <Box display={'flex'} width={'180px'} justifyContent={'space-between'}>
        <img src={back} alt="back" />
        <Typography>Back to Packs List</Typography>
      </Box>
    </NavLink>
  )
}
