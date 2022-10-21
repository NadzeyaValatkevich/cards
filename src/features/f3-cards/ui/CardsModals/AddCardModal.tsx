import React, { ChangeEvent, FC, useState } from 'react'

import { Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'
import { isDisabled } from '@testing-library/user-event/dist/utils'

import { setAppErrorAC } from 'app/bll/appActions'
import userPhoto from 'common/assets/image/user.png'
import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { setCardParamsAC } from 'features/f3-cards/bll/cardsActions'
import { modalObjectType } from 'features/f3-cards/ui/CardsHeader/CardButton/CardButton'

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
  const [isDisabled, setIsDisabled] = useState(true)

  const onChangeTextFieldQuestionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const question = e.currentTarget.value

    setQuestion(question)
    setCardParamsAC({ question })
  }
  const onChangeTextFieldAnswerHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const answer = e.currentTarget.value

    setAnswer(answer)
    setCardParamsAC({ answer })
    setIsDisabled(false)
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
    setAnswerImg('')
    setAge('Text')
    setIsDisabled(true)
  }

  const onChangeFormatHandler = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  const uploadQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        setIsQuestionImgBroken(false)
        convertFileToBase64(file, (questionImg: any) => {
          setQuestionImg(questionImg)
          setCardParamsAC({ questionImg })
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
        setIsAnswerImgBroken(false)
        convertFileToBase64(file, (answerImg: any) => {
          setAnswerImg(answerImg)
          setCardParamsAC({ answerImg })
          setIsDisabled(false)
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
      disabled={isDisabled}
      setIsDisabled={setIsDisabled}
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
                style={{ width: '150px', height: '150px' }}
                alt={'question'}
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
                style={{ width: '150px', height: '150px' }}
                alt={'answer'}
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
