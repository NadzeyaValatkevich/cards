import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { setAppErrorAC } from 'app/bll/appActions'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { setCardParamsAC } from 'features/f3-cards/bll/cardsActions'

type AnswerPropsType = {
  answerImg?: string
  answerCard?: string
  answerImgCard?: string
  setAnswer: (value: string) => void
  setAnswerImg: (value: string) => void
  setIsDisabled: (value: boolean) => void
}
export const Answer: FC<AnswerPropsType> = ({
  answerImg,
  answerCard,
  answerImgCard,
  setAnswer,
  setAnswerImg,
  setIsDisabled,
}) => {
  const dispatch = useAppDispatch()

  const uploadAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (answerImg: any) => {
          setAnswerImg(answerImg)
          setCardParamsAC({ answerImg: answerImg })
          setIsDisabled(false)
        })
      } else {
        dispatch(setAppErrorAC('Error: File size more then 4 mb'))
      }
    }
  }

  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const cardAnswer = e.currentTarget.value

    setAnswer(cardAnswer)
    setCardParamsAC({ cardAnswer })
    setIsDisabled(false)
  }

  return (
    <Box>
      {answerImgCard ? (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <img
            src={answerImg}
            style={{ width: '150px', height: '150px', marginTop: '1rem', marginBottom: '1rem' }}
            alt={'question'}
          />
          <Button variant="contained" fullWidth component={'label'}>
            <Input type={'file'} onChange={uploadAnswerHandler} sx={{ display: 'none' }} />
            {'upload a new answer'}
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            onChange={onChangeAnswerHandler}
            defaultValue={answerCard}
            id="standard-basic"
            label="Answer"
            variant="standard"
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}
