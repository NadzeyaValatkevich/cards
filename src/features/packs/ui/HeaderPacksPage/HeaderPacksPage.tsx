import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { NewPackModal } from '../Modals/NewPackModal'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addPackTC } from 'features/packs/bll/packsThunks'

type ToolbarTablePropsType = {
  addNewPack: () => void
  disabled: boolean
}

export const HeaderPacksPage: FC<ToolbarTablePropsType> = ({ addNewPack, disabled }) => {
  const dispatch = useAppDispatch()
  const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)

  const buttonOnClickHandler = () => {
    setActiveModalAdd(true)
  }
  const addPack = (name: string, privatePack: boolean) => {
    dispatch(addPackTC({ name: name, private: privatePack }))
  }

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
        <Typography
          variant={'h5'}
          fontWeight={'600'}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          Packs list
        </Typography>
        <Button
          onClick={buttonOnClickHandler}
          sx={{ margin: '36px 0', alignSelf: 'end' }}
          variant={'contained'}
          color={'primary'}
          disabled={disabled}
        >
          Add new pack
        </Button>
      </Box>
      <NewPackModal
        addPack={addPack}
        activeModalAdd={activeModalAdd}
        setActiveModalAdd={setActiveModalAdd}
      />
    </Box>
  )
}
