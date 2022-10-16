import { ChangeEvent, FC, useState } from 'react'

import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'

import { BasicModal } from 'common/components/BasicModal/BasicModal'

type NewCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  addCard: (id: string, question: string, answer: string) => void
  id: string
}

export const AddCardModal: FC<NewCardModalType> = ({ setOpen, open, addCard, id }) => {
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

  const addCardHandler = () => {
    addCard(id, questionTitle, answerTitle)
    setOpen(false)
    setQuestionTitle('')
    setAnswerTitle('')
  }

  return (
    <BasicModal
      name={'Add new card'}
      open={open}
      setOpen={setOpen}
      onSave={addCardHandler}
      nameButton={'Save'}
    >
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-standard-label">Choose a question format</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Age"
          fullWidth={true}
        >
          <MenuItem>Text</MenuItem>
          <MenuItem>Picture</MenuItem>
        </Select>
      </FormControl>
      <TextField
        onChange={onChangeTextFieldQuestionHandler}
        id="standard-basic"
        label="Question"
        variant="standard"
        fullWidth={true}
      />
      <TextField
        onChange={onChangeTextFieldAnswerHandler}
        id="standard-basic"
        label="Answer"
        variant="standard"
        fullWidth={true}
      />
    </BasicModal>
  )
}
