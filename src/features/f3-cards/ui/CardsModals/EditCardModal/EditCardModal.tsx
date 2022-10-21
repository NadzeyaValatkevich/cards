import { ChangeEvent, FC, useState } from 'react'

import Box from '@mui/material/Box'

import { modalObjectType } from '../../CardsTable/CardsTable'

import { Answer } from './Answer'
import { Question } from './Question'

import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppSelector } from 'common/hooks/useAppSelector'

type EditCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  updateCard: (modalObject: modalObjectType) => void
  _id: string
}

export const EditCardModal: FC<EditCardModalType> = ({ setOpen, open, updateCard, _id }) => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const card = cards.find(card => card._id === _id)
  const questionCard = card && card.question
  const answerCard = card && card.answer
  const questionImgCard = card && card.questionImg
  const answerImgCard = card && card.answerImg
  const [question, setQuestion] = useState(questionCard)
  const [questionImg, setQuestionImg] = useState(questionImgCard)
  const [answer, setAnswer] = useState(answerCard)
  const [answerImg, setAnswerImg] = useState(answerImgCard)

  const updateCardHandler = () => {
    updateCard(
      questionImg && answerImg
        ? { _id, questionImg, answerImg }
        : {
            _id,
            question,
            answer,
          }
    )
    setOpen(false)
  }

  return (
    <BasicModal
      name={'Edit card'}
      open={open}
      setOpen={setOpen}
      onSave={updateCardHandler}
      nameButton={'Save'}
    >
      <Box>
        <Question
          questionCard={questionCard}
          questionImgCard={questionImgCard}
          setQuestion={setQuestion}
          setQuestionImg={setQuestionImg}
        />
        <Answer
          answerCard={answerCard}
          answerImgCard={answerImgCard}
          setAnswer={setAnswer}
          setAnswerImg={setAnswerImg}
        />
      </Box>
      {/*  <InputLabel id="demo-simple-select-standard-label">Choose a question format</InputLabel>*/}
      {/*  <Select*/}
      {/*    labelId="demo-simple-select-standard-label"*/}
      {/*    id="demo-simple-select-standard"*/}
      {/*    label="Age"*/}
      {/*    fullWidth*/}
      {/*  >*/}
      {/*    <MenuItem>Text</MenuItem>*/}
      {/*    <MenuItem>Picture</MenuItem>*/}
      {/*  </Select>*/}
      {/*</FormControl>*/}
      {/*<TextField*/}
      {/*  onChange={onChangeTextFieldQuestionHandler}*/}
      {/*  defaultValue={initQuestion}*/}
      {/*  id="standard-basic"*/}
      {/*  label="Question"*/}
      {/*  variant="standard"*/}
      {/*  fullWidth*/}
      {/*/>*/}
      {/*<TextField*/}
      {/*  onChange={onChangeTextFieldAnswerHandler}*/}
      {/*  defaultValue={initAnswer}*/}
      {/*  id="standard-basic"*/}
      {/*  label="Answer"*/}
      {/*  variant="standard"*/}
      {/*  fullWidth*/}
      {/*/>*/}
    </BasicModal>
  )
}
