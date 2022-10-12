import React, { useState } from 'react'

import Button from '@mui/material/Button'

import { cardsParamsSelector } from '../../../bll/cardsSelectors'
import { AddNewCardModal } from '../../CardsModals/AddNewCardModal'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { addCardTC } from 'features/f3-cards/bll/cardsThunk'

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
      <AddNewCardModal
        setOpen={setOpenModalAdd}
        open={openModalAdd}
        addCard={addCard}
        id={cardsPack_id}
      />
    </div>
  )
}
