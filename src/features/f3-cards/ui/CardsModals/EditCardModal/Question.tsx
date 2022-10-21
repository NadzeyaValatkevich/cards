import React, { ChangeEvent, FC, useState } from 'react'

import { Input, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { setAppErrorAC } from 'app/bll/appActions'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { setCardParamsAC } from 'features/f3-cards/bll/cardsActions'

type QuestionPropsType = {
  questionCard?: string
  questionImgCard?: string
  setQuestion: (value: string) => void
  setQuestionImg: (value: string) => void
}
export const Question: FC<QuestionPropsType> = ({
  questionCard,
  questionImgCard,
  setQuestion,
  setQuestionImg,
}) => {
  const dispatch = useAppDispatch()

  const uploadQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (questionImg: any) => {
          setQuestionImg(questionImg)
          setCardParamsAC({ questionImg })
        })
      } else {
        dispatch(setAppErrorAC('Error: File size more then 4 mb'))
      }
    }
  }

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const question = e.currentTarget.value

    setQuestion(question)
    setCardParamsAC({ question })
  }

  return (
    <Box>
      {questionImgCard ? (
        <Box>
          <img src={questionImgCard} style={{ width: '150px', height: '150px' }} alt={'question'} />
          <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
            <Input type={'file'} onChange={uploadQuestionHandler} sx={{ display: 'none' }} />
            {'upload a new question'}
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            onChange={onChangeQuestionHandler}
            defaultValue={questionCard}
            id="standard-basic"
            label="Question"
            variant="standard"
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}
