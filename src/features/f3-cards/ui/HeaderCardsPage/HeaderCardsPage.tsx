import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setCardsSearchQuestionAC } from 'features/f3-cards/bll/cardsActions'
import { addCardTC } from 'features/f3-cards/bll/cardsThunk'
import { CardType } from 'features/f3-cards/dal/cardsAPI'
import { AddNewCardModal } from 'features/f3-cards/ui/CardsModals/AddNewCardModal'
import { MenuEditMyCards } from 'features/f3-cards/ui/HeaderCardsPage/MenuEditMyCards/MenuEditMyCards'

type ToolbarCardsTablePropsType = {
  packName: string
  cardsPack_id: string
  isMyPack: boolean
  disabled: boolean
  cardsPack: CardType[]
}
export const HeaderCardsPage: FC<ToolbarCardsTablePropsType> = ({
  packName,
  cardsPack_id,
  isMyPack,
  disabled,
  cardsPack,
}) => {
  const dispatch = useAppDispatch()
  const [activeModalAdd, setActiveModalAdd] = useState(false)

  const addCard = (id: string, question: string, answer: string) => {
    dispatch(addCardTC({ cardsPack_id: id, question, answer }))
  }

  const addNewCardModal = () => {
    setActiveModalAdd(true)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignSelf={'space-between'} width={'100%'}>
      {isMyPack ? (
        <Box display={'flex'} flexDirection={'column'} alignSelf={'space-between'} width={'100%'}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'}>
              <Typography
                variant={'h5'}
                fontWeight={'600'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {packName}
              </Typography>
              {cardsPack.length ? <MenuEditMyCards /> : null}
            </Box>
            <Box>
              <Button variant="contained" onClick={addNewCardModal} disabled={disabled}>
                Add new card
              </Button>
              <AddNewCardModal
                setOpen={setActiveModalAdd}
                open={activeModalAdd}
                addCard={addCard}
                id={cardsPack_id!}
              />
            </Box>
          </Box>
          {cardsPack.length ? (
            <Box>
              <SearchPanel
                setParams={setCardsSearchQuestionAC}
                sx={{ m: '1.5rem 0', width: '100%' }}
              />
            </Box>
          ) : null}
        </Box>
      ) : (
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Typography
            variant={'h5'}
            fontWeight={'600'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {packName}
          </Typography>
          {cardsPack.length ? (
            <Box>
              <Button variant="contained" onClick={() => {}} disabled={disabled}>
                Learn to pack
              </Button>
              <SearchPanel
                setParams={setCardsSearchQuestionAC}
                sx={{ m: '1.5rem 0', width: '100%' }}
              />
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}
