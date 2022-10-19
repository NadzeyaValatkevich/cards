import React, { ChangeEvent, FC, useState } from 'react'

import { Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'

import { modalObjectType } from '../CardsHeader/CardButton/CardButton'

import { setAppErrorAC } from 'app/bll/appActions'
import userPhoto from 'common/assets/image/user.png'
import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type NewCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  cardsPack_id: string
  addCard: (modalObject: modalObjectType) => void
}

export const AddCardModal: FC<NewCardModalType> = ({ setOpen, open, addCard, cardsPack_id }) => {
  const dispatch = useAppDispatch()
  const [isQuestionImgBroken, setIsQuestionImgBroken] = useState(false)
  const [isAnswerImgBroken, setIsAnswerImgBroken] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [questionImg, setQuestionImg] = useState('')
  const [answerImg, setAnswerImg] = useState('')
  const [age, setAge] = useState('Text')

  const onChangeTextFieldQuestionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion(e.currentTarget.value)
  }
  const onChangeTextFieldAnswerHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswer(e.currentTarget.value)
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
    setQuestion('')
    setAnswer('')
    setQuestionImg('')
  }

  const onChangeFormatHandler = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  const uploadQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        setIsQuestionImgBroken(false)
        convertFileToBase64(file, (questionImg: string) => {
          setQuestionImg(questionImg)
        })
      } else {
        dispatch(setAppErrorAC('Error: File size more then 4 mb'))
      }
    }
  }

  const uploadAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        setIsQuestionImgBroken(false)
        convertFileToBase64(file, (answerImg: string) => {
          setAnswerImg(answerImg)
        })
      } else {
        dispatch(setAppErrorAC('Error: File size more then 4 mb'))
      }
    }
  }

  const errorQuestionHandler = () => {
    setIsQuestionImgBroken(true)
    dispatch(setAppErrorAC('Picture upload failed'))
  }
  const errorAnswerHandler = () => {
    setIsAnswerImgBroken(true)
    dispatch(setAppErrorAC('Picture upload failed'))
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
      {age === 'Text' ? (
        <>
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
        </>
      ) : (
        <>
          <Box>
            {questionImg ? (
              <img
                src={isQuestionImgBroken ? userPhoto : questionImg || userPhoto}
                style={{ width: '50px', height: '50px' }}
                onError={errorQuestionHandler}
              />
            ) : (
              <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
                <Input type={'file'} onChange={uploadQuestionHandler} sx={{ display: 'none' }} />
                {'upload the question as an image'}
              </Button>
            )}
          </Box>
          <Box>
            {answerImg ? (
              <img
                src={isAnswerImgBroken ? userPhoto : answerImg || userPhoto}
                style={{ width: '50px', height: '50px' }}
                onError={errorAnswerHandler}
              />
            ) : (
              <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
                <Input type={'file'} onChange={uploadAnswerHandler} sx={{ display: 'none' }} />
                {'upload the answer as an image'}
              </Button>
            )}
          </Box>
        </>
      )}
    </BasicModal>
  )
}
