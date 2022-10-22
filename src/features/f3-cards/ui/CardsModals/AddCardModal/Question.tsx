import React, { ChangeEvent, FC, useState } from 'react'

import { Input, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { AgeType } from './AddCardModal'

import { setAppErrorAC } from 'app/bll/appActions'
import userPhoto from 'common/assets/image/user.png'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { setCardParamsAC } from 'features/f3-cards/bll/cardsActions'

type QuestionPropsType = {
  age: AgeType
  setQuestion: (value: string) => void
  setQuestionImg: (value: string) => void
  questionImg: string
}

export const Question: FC<QuestionPropsType> = ({
  age,
  setQuestion,
  setQuestionImg,
  questionImg,
}) => {
  const dispatch = useAppDispatch()
  const [isQuestionImgBroken, setIsQuestionImgBroken] = useState(false)

  const onChangeTextFieldQuestionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const cardQuestion = e.currentTarget.value

    setQuestion(cardQuestion)
    setCardParamsAC({ cardQuestion })
  }

  const errorQuestionHandler = () => {
    setIsQuestionImgBroken(true)
    dispatch(setAppErrorAC('Picture upload failed'))
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

  return (
    <Box>
      {age === 'Text' ? (
        <Box>
          <TextField
            onChange={onChangeTextFieldQuestionHandler}
            id="standard-basic"
            label="Question"
            variant="standard"
            fullWidth
          />
        </Box>
      ) : (
        <Box>
          {questionImg ? (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              sx={{ marginBottom: '1rem', marginTop: '1rem' }}
            >
              <img
                src={isQuestionImgBroken ? userPhoto : questionImg || userPhoto}
                style={{ width: '150px', height: '150px' }}
                alt={'question'}
                onError={errorQuestionHandler}
              />
            </Box>
          ) : (
            <Box>
              <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
                <Input type={'file'} onChange={uploadQuestionHandler} sx={{ display: 'none' }} />
                {'upload the question as an image'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
