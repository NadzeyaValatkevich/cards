import { useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { getPacksTC } from 'features/packs/bll/packsThunks'

export const MyAllPacks = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.profile._id)
  const [buttonPacks, setButtonPacks] = useState(true)

  const onClickMyButton = () => {
    setButtonPacks(buttonPacks => !buttonPacks)
    dispatch(getPacksTC({ user_id: userId }))
  }
  const onClickAllButton = () => {
    setButtonPacks(buttonPacks => !buttonPacks)
    dispatch(getPacksTC({ user_id: '' }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ alignSelf: 'center' }}>Show packs cards</Typography>
      <div>
        <Button onClick={onClickMyButton} variant={!buttonPacks ? 'contained' : 'outlined'}>
          My Packs
        </Button>
        <Button onClick={onClickAllButton} variant={buttonPacks ? 'contained' : 'outlined'}>
          All Packs
        </Button>
      </div>
    </Box>
  )
}
