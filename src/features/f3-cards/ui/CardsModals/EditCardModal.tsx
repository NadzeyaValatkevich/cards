import React, { ChangeEvent, useEffect, useState } from 'react'

import { InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'

import { CardType, UpdateCardsType } from '../../dal/cardsAPI'

import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { DropzoneComponent } from 'common/components/DropzoneComponent/DropzoneComponent'

type EditCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  updateCard: (updatedCard: UpdateCardsType) => void
  card: CardType
}

export const EditCardModal = (props: EditCardModalType) => {
  const initQuestion = props.card.question
  const initAnswer = props.card.answer
  const initQuestionImg = props.card.questionImg
  const initAnswerImg = props.card.answerImg

  const [type, setType] = useState<'text' | 'picture'>('text')
  const [selectIsDisabled, setSelectIsDisabled] = useState(false)

  const [questionTitle, setQuestionTitle] = useState(initQuestion)
  const [questionImg, setQuestionImg] = useState(initQuestionImg)
  const [questionError, setQuestionError] = useState('')

  const [answerTitle, setAnswerTitle] = useState(initAnswer)
  const [answerImg, setAnswerImg] = useState(initAnswerImg)
  const [answerError, setAnswerError] = useState('')

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
    if (type === 'text') {
      props.updateCard({ _id: props.card._id, answer: answerTitle, question: questionTitle })
      props.setOpen(false)
    }
    if (type === 'picture') {
      if (questionError || answerError || !questionImg || !answerImg) {
        !questionImg && setQuestionError('Need question image')
        !answerImg && setAnswerError('Need answer image')
      } else {
        props.updateCard({
          _id: props.card._id,
          answerImg,
          questionImg,
        })
        props.setOpen(false)
      }
    }
  }
  const onSelectHandler = (e: SelectChangeEvent<'text' | 'picture'>) => {
    setType(e.target.value as 'text' | 'picture')
  }
  const answerImgHandler = (image: string) => {
    setAnswerImg(image)
    answerError && setAnswerError('')
  }
  const questionImgHandler = (image: string) => {
    setQuestionImg(image)
    questionError && setQuestionError('')
  }

  useEffect(() => {
    if (initQuestionImg || initAnswerImg) {
      setType('picture')
      setSelectIsDisabled(true)
    }
  }, [])
  useEffect(() => {
    if (type === 'text') {
      !initQuestionImg && setQuestionImg('')
      !initAnswerImg && setAnswerImg('')
    }
  }, [type])

  return (
    <BasicModal
      name={'Edit card'}
      open={props.open}
      setOpen={props.setOpen}
      onSave={updateCardHandler}
      nameButton={'Save'}
    >
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <InputLabel id={'select-edit-type'}>Choose a question format</InputLabel>
        <Select
          id={'select-edit-type'}
          fullWidth
          onChange={onSelectHandler}
          value={type}
          disabled={selectIsDisabled}
        >
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'picture'}>Picture</MenuItem>
        </Select>
      </FormControl>
      {type === 'text' ? (
        <>
          <TextField
            onChange={onChangeTextFieldQuestionHandler}
            defaultValue={questionTitle}
            id="standard-basic"
            label="Question"
            variant="standard"
            fullWidth
          />
          <TextField
            onChange={onChangeTextFieldAnswerHandler}
            defaultValue={answerTitle}
            id="standard-basic"
            label="Answer"
            variant="standard"
            fullWidth
          />
        </>
      ) : (
        <Box>
          <Box position={'relative'}>
            <DropzoneComponent
              image={questionImg}
              onSave={questionImgHandler}
              onError={setQuestionError}
              error={questionError}
            />
            {questionError && (
              <Typography
                variant={'subtitle1'}
                color={'red'}
                sx={{
                  position: 'absolute',
                  lineHeight: 1,
                  bottom: '.5rem',
                }}
              >
                {questionError}
              </Typography>
            )}
          </Box>
          <Box position={'relative'}>
            <DropzoneComponent
              image={answerImg}
              onSave={answerImgHandler}
              onError={setAnswerError}
              error={answerError}
            />
            {answerError && (
              <Typography
                variant={'subtitle1'}
                color={'red'}
                sx={{
                  position: 'absolute',
                  lineHeight: 1,
                  bottom: '.5rem',
                }}
              >
                {answerError}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </BasicModal>
  )
}
