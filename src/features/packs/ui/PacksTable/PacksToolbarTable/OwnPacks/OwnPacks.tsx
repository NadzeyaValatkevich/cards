import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setPacksUserIdAC } from 'features/packs/bll/packsActions'

export const MyAllPacks = () => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(state => state.profile._id)
  const userIdParam = useAppSelector(state => state.packs.params.user_id)

  const onClickMyButton = () => {
    user_id && dispatch(setPacksUserIdAC(user_id))
  }
  const onClickAllButton = () => {
    dispatch(setPacksUserIdAC(''))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ alignSelf: 'center' }}>Show packs cards</Typography>
      <div>
        <Button onClick={onClickMyButton} variant={userIdParam ? 'contained' : 'outlined'}>
          My Packs
        </Button>
        <Button onClick={onClickAllButton} variant={!userIdParam ? 'contained' : 'outlined'}>
          All Packs
        </Button>
      </div>
    </Box>
  )
}
