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

type AnswerPropsType = {
  age: AgeType
  setAnswer: (value: string) => void
  setAnswerImg: (value: string) => void
  answerImg: string
  setIsDisabled: (value: boolean) => void
}

export const Answer: FC<AnswerPropsType> = ({
  age,
  setAnswer,
  setAnswerImg,
  answerImg,
  setIsDisabled,
}) => {
  const dispatch = useAppDispatch()
  const [isAnswerImgBroken, setIsAnswerImgBroken] = useState(false)
  const onChangeTextFieldAnswerHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const answer = e.currentTarget.value

    setAnswer(answer)
    setCardParamsAC({ answer })
    setIsDisabled(false)
  }

  const errorAnswerHandler = () => {
    setIsAnswerImgBroken(true)
    dispatch(setAppErrorAC('Picture upload failed'))
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

  return (
    <Box>
      {age === 'Text' ? (
        <Box>
          <TextField
            onChange={onChangeTextFieldAnswerHandler}
            id="standard-basic"
            label="Answer"
            variant="standard"
            fullWidth
          />
        </Box>
      ) : (
        <Box>
          {answerImg ? (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              sx={{ marginBottom: '10px' }}
            >
              <img
                src={isAnswerImgBroken ? userPhoto : answerImg || userPhoto}
                style={{ width: '150px', height: '150px' }}
                alt={'answer'}
                onError={errorAnswerHandler}
              />
            </Box>
          ) : (
            <Box>
              <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
                <Input type={'file'} onChange={uploadAnswerHandler} sx={{ display: 'none' }} />
                {'upload the answer as an image'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
