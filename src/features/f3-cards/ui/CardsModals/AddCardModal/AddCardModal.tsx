import React, { FC, useState } from 'react'

import { SelectFormat } from './Select'

import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { modalObjectType } from 'features/f3-cards/ui/CardsHeader/CardButton/CardButton'
import { Answer } from 'features/f3-cards/ui/CardsModals/AddCardModal/Answer'
import { Question } from 'features/f3-cards/ui/CardsModals/AddCardModal/Question'

type NewCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  cardsPack_id: string
  addCard: (modalObject: modalObjectType) => void
}

export type AgeType = 'Text' | 'Picture'

export const AddCardModal: FC<NewCardModalType> = ({ setOpen, open, addCard, cardsPack_id }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [questionImg, setQuestionImg] = useState('')
  const [answerImg, setAnswerImg] = useState('')
  const [age, setAge] = useState<AgeType>('Text')
  const [isDisabled, setIsDisabled] = useState(true)

  const clearField = () => {
    setQuestion('')
    setAnswer('')
    setQuestionImg('')
    setAnswerImg('')
  }

  const addCardHandler = () => {
    addCard(
      questionImg && answerImg
        ? { cardsPack_id, questionImg, answerImg }
        : {
            cardsPack_id,
            question,
            answer,
          }
    )
    setOpen(false)
    clearField()
    setAge('Text')
    setIsDisabled(true)
  }

  return (
    <BasicModal
      name={'Add new card'}
      open={open}
      setOpen={setOpen}
      clearField={clearField}
      onSave={addCardHandler}
      nameButton={'Save'}
      disabled={isDisabled}
      setIsDisabled={setIsDisabled}
    >
      <SelectFormat age={age} setAge={setAge} />
      <Question
        setQuestion={setQuestion}
        setQuestionImg={setQuestionImg}
        questionImg={questionImg}
        age={age}
      />
      <Answer
        setAnswer={setAnswer}
        setAnswerImg={setAnswerImg}
        answerImg={answerImg}
        setIsDisabled={setIsDisabled}
        age={age}
      />
    </BasicModal>
  )
}
