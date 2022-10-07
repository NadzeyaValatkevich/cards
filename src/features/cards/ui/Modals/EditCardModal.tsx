import { ChangeEvent, useState } from 'react'

import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'

import { BasicModal } from 'common/components/Modal/Modal'
import { useAppSelector } from 'common/hooks/useAppSelector'

type EditCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  updateCard: (_id: string, question: string, answer: string) => void
  _id: string
}

export const EditCardModal = (props: EditCardModalType) => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const card = cards.find(card => card._id === props._id)
  const initQuestion = card && card.question
  const initAnswer = card && card.answer

  const [questionTitle, setQuestionTitle] = useState<string>('')
  const [answerTitle, setAnswerTitle] = useState<string>('')

  const onChangeTextFieldQuestionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestionTitle(e.currentTarget.value)
  }
  const onChangeTextFieldAnswerHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswerTitle(e.currentTarget.value)
  }

  const updateCardHandler = () => {
    props.updateCard(props._id, questionTitle, answerTitle)
    props.setOpen(false)
    setQuestionTitle('')
    setAnswerTitle('')
  }

  return (
    <BasicModal
      name={'Edit card'}
      open={props.open}
      setOpen={props.setOpen}
      onSave={updateCardHandler}
      nameButton={'Save'}
    >
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-standard-label">Choose a question format</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Age"
        >
          <MenuItem>Text</MenuItem>
          <MenuItem>Picture</MenuItem>
        </Select>
      </FormControl>
      <TextField
        onChange={onChangeTextFieldQuestionHandler}
        defaultValue={initQuestion}
        id="standard-basic"
        label="Question"
        variant="standard"
        sx={{ width: '100%' }}
      />
      <TextField
        onChange={onChangeTextFieldAnswerHandler}
        defaultValue={initAnswer}
        id="standard-basic"
        label="Answer"
        variant="standard"
        sx={{ width: '100%' }}
      />
    </BasicModal>
  )
}
