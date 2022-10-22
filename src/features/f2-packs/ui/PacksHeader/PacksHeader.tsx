import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { addPackTC } from 'features/f2-packs/bll/packsThunks'
import { AddPackModal } from 'features/f2-packs/ui/PacksModals/AddPackModal'

type ToolbarTablePropsType = {
  disabled: boolean
}

export const PacksHeader: FC<ToolbarTablePropsType> = ({ disabled }) => {
  const dispatch = useAppDispatch()
  const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)

  const buttonOnClickHandler = () => {
    setActiveModalAdd(true)
  }
  const addPack = (name: string, deckCover: string, privatePack: boolean) => {
    dispatch(addPackTC({ name: name, deckCover: deckCover, private: privatePack }))
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
      <AddPackModal
        addPack={addPack}
        activeModalAdd={activeModalAdd}
        setActiveModalAdd={setActiveModalAdd}
      />
    </Box>
  )
}
