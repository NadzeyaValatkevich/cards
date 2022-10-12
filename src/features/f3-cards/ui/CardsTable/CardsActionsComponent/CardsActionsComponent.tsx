import React, { FC } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

type CardsActionsPropsType = {
  cardId: string
  editCardAction: (cardId: string) => void
  deleteCardAction: (cardId: string) => void
}

export const CardsActionsComponent: FC<CardsActionsPropsType> = ({
  cardId,
  editCardAction,
  deleteCardAction,
}) => {
  const editCardHandler = () => editCardAction(cardId)
  const deleteCardHandler = () => deleteCardAction(cardId)

  return (
    <Box display={'flex'} justifyContent={'left'} alignItems={'center'}>
      <IconButton onClick={editCardHandler}>
        <BorderColorIcon fontSize={'small'} />
      </IconButton>
      <IconButton onClick={deleteCardHandler}>
        <DeleteForeverIcon fontSize={'small'} />
      </IconButton>
    </Box>
  )
}
