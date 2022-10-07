import React, { FC, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SchoolIcon from '@mui/icons-material/School'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

type PacksActionsPropsType = {
  packId: string
  enableEdit: boolean
  disableStudyBtn: boolean
  startStudyingAction: (packId: string) => void
  editPackAction: (packId: string) => void
  deletePackAction: (packId: string) => void
}

export const PacksActionsComponent: FC<PacksActionsPropsType> = ({
  packId,
  enableEdit,
  disableStudyBtn,
  startStudyingAction,
  editPackAction,
  deletePackAction,
}) => {
  const startStudyingHandler = () => startStudyingAction(packId)
  const editPackHandler = () => editPackAction(packId)
  const deletePackHandler = () => deletePackAction(packId)

  return (
    <Box display={'flex'} justifyContent={'left'} alignItems={'center'}>
      <IconButton onClick={startStudyingHandler} disabled={disableStudyBtn}>
        <SchoolIcon fontSize={'small'} />
      </IconButton>
      {enableEdit && (
        <>
          <IconButton onClick={editPackHandler}>
            <BorderColorIcon fontSize={'small'} />
          </IconButton>
          <IconButton onClick={deletePackHandler}>
            <DeleteForeverIcon fontSize={'small'} />
          </IconButton>
        </>
      )}
    </Box>
  )
}
