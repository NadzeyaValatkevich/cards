import React, { useState } from 'react'

import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'

import { addCardTC } from 'features/cards/bll/cardsThunk'
import { NewCardModal } from 'features/cards/ui/Modals/NewCardModal'

export const AddNewCard = () => {
  const dispatch = useAppDispatch()
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const addCard = (id: string, question: string, answer: string) => {
    dispatch(addCardTC({ cardsPack_id: id, question, answer }))
  }

  const addNewCardModal = () => {
    setOpenModalAdd(true)
  }

  const { id } = useParams()

  return (
    <div>
      <Button variant="contained" onClick={addNewCardModal}>
        Add new card
      </Button>
      <NewCardModal setOpen={setOpenModalAdd} open={openModalAdd} addCard={addCard} id={id!} />
    </div>
  )
}
