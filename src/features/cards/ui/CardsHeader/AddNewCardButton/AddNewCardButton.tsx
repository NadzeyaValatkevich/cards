import React, { useState } from 'react'

import Button from '@mui/material/Button'

import { cardsParamsSelector } from '../../../bll/cardsSelectors'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { addCardTC } from 'features/cards/bll/cardsThunk'
import { AddCardModal } from 'features/cards/ui/CardsModals/AddCardModal'

export const AddNewCardButton = () => {
  const dispatch = useAppDispatch()
  const { cardsPack_id } = useAppSelector(cardsParamsSelector)
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const addCard = (id: string, question: string, answer: string) => {
    dispatch(addCardTC({ cardsPack_id: id, question, answer }))
  }
  const addNewCardModal = () => {
    setOpenModalAdd(true)
  }

  return (
    <div>
      <Button variant="contained" onClick={addNewCardModal}>
        Add new card
      </Button>
      <AddCardModal
        setOpen={setOpenModalAdd}
        open={openModalAdd}
        addCard={addCard}
        id={cardsPack_id}
      />
    </div>
  )
}
