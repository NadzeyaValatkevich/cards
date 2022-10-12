import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setCardsSearchQuestionAC } from 'features/cards/bll/cardsActions'
import { addCardTC } from 'features/cards/bll/cardsThunk'
import { AddNewCardModal } from 'features/cards/ui/CardsModals/AddNewCardModal'
import { MenuEditMyCards } from 'features/cards/ui/HeaderCardsPage/MenuEditMyCards/MenuEditMyCards'
import { packsDataSelector, profileSelector } from 'features/packs/bll/packsSelectors'

type ToolbarCardsTablePropsType = {
  packName: string
  cardsPack_id: string
  isMyPack: boolean
}
export const HeaderCardsPage: FC<ToolbarCardsTablePropsType> = ({
  packName,
  cardsPack_id,
  isMyPack,
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
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
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
            <MenuEditMyCards />
          </Box>
          <Box>
            <Button variant="contained" onClick={addNewCardModal}>
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
          <Button variant="contained" onClick={() => {}}>
            Learn to pack
          </Button>
        </Box>
      )}
      <SearchPanel
        search={'cardQuestion'}
        setParams={setCardsSearchQuestionAC}
        sx={{ m: '1.5rem 0', width: '100%' }}
      />
    </Box>
  )
}
