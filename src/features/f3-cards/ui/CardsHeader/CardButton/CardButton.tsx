import React, { FC, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsParamsSelector } from 'features/f3-cards/bll/cardsSelectors'
import { addCardTC } from 'features/f3-cards/bll/cardsThunk'
import { AddCardModal } from 'features/f3-cards/ui/CardsModals/AddCardModal'

type CardButtonPropsType = {
  buttonName: string
  onClick: () => void
  isMyPack: boolean
  activeModalAdd: boolean
  setActiveModalAdd: (value: boolean) => void
  disabled: boolean
}

export type modalObjectType = {
  cardsPack_id: string
  question?: string
  questionImg?: string
  answer?: string
  answerImg?: string
}

export const CardButton: FC<CardButtonPropsType> = ({
  buttonName,
  onClick,
  isMyPack,
  activeModalAdd,
  setActiveModalAdd,
  disabled,
}) => {
  const dispatch = useAppDispatch()
  const { cardsPack_id } = useAppSelector(cardsParamsSelector)

  const addCard = (modalObject: modalObjectType) => {
    dispatch(addCardTC(modalObject))
  }

  return (
    <Box>
      <Button variant="contained" onClick={onClick} disabled={disabled}>
        {buttonName}
      </Button>
      {isMyPack ? (
        <AddCardModal
          setOpen={setActiveModalAdd}
          open={activeModalAdd}
          addCard={addCard}
          cardsPack_id={cardsPack_id}
        />
      ) : null}
    </Box>
  )
}
