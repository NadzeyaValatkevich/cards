import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { RequestStatusType } from 'app/bll/appReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setPacksUserIdAC } from 'features/f2-packs/bll/packsActions'
import { packsEntityStatusSelector } from 'features/f2-packs/bll/packsSelectors'

export const MyAllPacks = () => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(state => state.profile._id)
  const userIdParam = useAppSelector(state => state.packs.params.user_id)
  const packsEntityStatus = useAppSelector(packsEntityStatusSelector)

  const isDisabled = packsEntityStatus === RequestStatusType.loading

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
        <Button
          onClick={onClickMyButton}
          variant={userIdParam ? 'contained' : 'outlined'}
          disabled={isDisabled}
        >
          My Packs
        </Button>
        <Button
          onClick={onClickAllButton}
          variant={!userIdParam ? 'contained' : 'outlined'}
          disabled={isDisabled}
        >
          All Packs
        </Button>
      </div>
    </Box>
  )
}
