import { ChangeEvent, FC, useState } from 'react'

import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'

import { BasicModal } from 'common/components/BasicModal/BasicModal'

type NewCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  addCard: (id: string, question: string, answer: string) => void
  id: string
}

export const AddNewCardModal: FC<NewCardModalType> = ({ setOpen, open, addCard, id }) => {
  const [questionTitle, setQuestionTitle] = useState('')
  const [answerTitle, setAnswerTitle] = useState('')
  const [age, setAge] = useState('Text')

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

  const onChangeFormatHandler = (event: SelectChangeEvent) => {
    setAge(event.target.value)
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
          // labelId="demo-simple-select-standard-label"
          // id="demo-simple-select-standard"
          value={age}
          onChange={onChangeFormatHandler}
          defaultValue={age}
          label="Age"
          fullWidth
        >
          <MenuItem value={'Text'}>Text</MenuItem>
          <MenuItem value={'Picture'}>Picture</MenuItem>
        </Select>
      </FormControl>
      <TextField
        onChange={onChangeTextFieldQuestionHandler}
        id="standard-basic"
        label="Question"
        variant="standard"
        fullWidth
      />
      <TextField
        onChange={onChangeTextFieldAnswerHandler}
        id="standard-basic"
        label="Answer"
        variant="standard"
        fullWidth
      />
    </BasicModal>
  )
}
