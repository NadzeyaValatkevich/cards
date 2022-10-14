import React, { useEffect, useState } from 'react'

import { Theme, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { SxProps } from '@mui/system'
import { FormContainer, RadioButtonGroup } from 'react-hook-form-mui'

import { setCardsIdAC, setCardsPaginationAC } from '../../bll/cardsActions'
import { getCardsTC, updateCardGradeTC } from '../../bll/cardsThunk'

import { RequestStatusType } from 'app/bll/appReducer'
import { SkeletonComponent } from 'common/components/SkeletonComponent/SkeletonComponent'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import {
  cardsEntityStatusSelector,
  cardsPackDataSelector,
  cardsPackNameSelector,
  cardsPackSelector,
} from 'features/f3-cards/bll/cardsSelectors'
import { CardType } from 'features/f3-cards/dal/cardsAPI'

const flexSXProps: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}
const radioButtonOptions = [
  {
    id: '1',
    label: 'Did not know',
  },
  {
    id: '2',
    label: 'Forgot',
  },
  {
    id: '3',
    label: 'A lot of thought',
  },
  {
    id: '4',
    label: 'Confused',
  },
  {
    id: '5',
    label: 'Knew the answer',
  },
]

const getCard = (cards: CardType[]): CardType => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) ** 3, 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) ** 3

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return res.id === cards.length - 1 ? cards[res.id] : cards[res.id + 1]
}

export const LearnPage = () => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [first, setFirst] = useState(true)
  const [card, setCard] = useState<CardType>({} as CardType)

  const cards = useAppSelector(cardsPackSelector)
  const { cardsTotalCount } = useAppSelector(cardsPackDataSelector)
  const packName = useAppSelector(cardsPackNameSelector)
  const cardsEntityStatus = useAppSelector(cardsEntityStatusSelector)

  const isLoading = cardsEntityStatus === RequestStatusType.loading

  const onSuccessFormHandler = async (e: { ratingQuestion: string }) => {
    await dispatch(updateCardGradeTC({ card_id: card._id, grade: +e.ratingQuestion }))
    setCard(getCard(cards))
    setShow(false)
  }
  const showAnswerOnClickHandler = () => {
    setShow(true)
  }

  useEffect(() => {
    console.log(cardsTotalCount)
    dispatch(setCardsPaginationAC({ pageCount: cardsTotalCount }))
    dispatch(getCardsTC())

    return () => {
      dispatch(setCardsIdAC(''))
    }
  }, [])
  useEffect(() => {
    if (first) {
      setFirst(false)
    } else {
      setCard(getCard(cards))
    }
  }, [cards])

  return (
    <ContentWrapper withoutPaper>
      <SkeletonComponent status={isLoading}>
        <Typography
          variant={'h5'}
          fontWeight={'600'}
          sx={{
            flexSXProps,
            m: '1rem',
          }}
        >
          Learn {packName}
        </Typography>
      </SkeletonComponent>
      <Paper
        elevation={4}
        sx={{
          flexSXProps,
          alignItems: 'center',
          padding: '2rem',
          lineHeight: '2rem',
          maxWidth: '400px',
        }}
      >
        <Box>
          <Box mb={'2rem'}>
            <SkeletonComponent status={isLoading}>
              <Typography lineHeight={'2rem'}>
                <b>Question:</b> {card.question ?? ''}
              </Typography>
            </SkeletonComponent>
            <SkeletonComponent
              status={isLoading}
              sxProps={{
                minWidth: 310,
              }}
            >
              <Typography
                lineHeight={'2rem'}
                variant={'subtitle2'}
                sx={{
                  opacity: '.5',
                }}
              >
                Количество попыток ответов на вопрос: <b>{card.shots ?? 0}</b>
              </Typography>
            </SkeletonComponent>
          </Box>
          {!show ? (
            <Button
              variant={'contained'}
              fullWidth
              onClick={showAnswerOnClickHandler}
              disabled={isLoading}
            >
              Show answer
            </Button>
          ) : (
            <Box>
              <SkeletonComponent status={isLoading}>
                <Typography lineHeight={'2rem'}>
                  <b>Answer:</b> {card.answer ?? ''}
                </Typography>
              </SkeletonComponent>
              <Box mt={'1.5rem'}>
                <Typography lineHeight={'2rem'}>Rate yourself:</Typography>
                <FormContainer onSuccess={onSuccessFormHandler}>
                  <RadioButtonGroup options={radioButtonOptions} name={'ratingQuestion'} required />
                  <Box mt={'2rem'} display={'flex'} justifyContent={'center'}>
                    <Button type={'submit'} variant={'contained'} fullWidth disabled={isLoading}>
                      Next
                    </Button>
                  </Box>
                </FormContainer>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </ContentWrapper>
  )
}
