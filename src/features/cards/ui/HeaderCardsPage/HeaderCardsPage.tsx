import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { BackToCardsPacks } from 'common/components/BackToCardsPack/BackToCardsPack'
import { MenuEditMyCards } from 'common/components/MenuEditMyCards/MenuEditMyCards'
import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { setCardsSearchQuestionAC } from 'features/cards/bll/cardsActions'
import { addCardTC } from 'features/cards/bll/cardsThunk'
import { AddNewCardModal } from 'features/cards/ui/CardsModals/AddNewCardModal'
import { packsDataSelector, profileSelector } from 'features/packs/bll/packsSelectors'

type ToolbarCardsTablePropsType = {
  id: string | null
  packUserId: string
}
export const HeaderCardsPage: FC<ToolbarCardsTablePropsType> = ({ id, packUserId }) => {
  const dispatch = useAppDispatch()
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const { _id: profileId } = useAppSelector(profileSelector)
  const { cardPacks } = useAppSelector(packsDataSelector)

  const pack = cardPacks.find(el => el._id === id)

  const addCard = (id: string, question: string, answer: string) => {
    dispatch(addCardTC({ cardsPack_id: id, question, answer }))
  }

  const addNewCardModal = () => {
    setOpenModalAdd(true)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignSelf={'space-between'} width={'100%'}>
      <Box marginBottom={'20px'}>
        <BackToCardsPacks />
      </Box>
      {profileId === packUserId ? (
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'}>
            <Typography
              variant={'h5'}
              fontWeight={'600'}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              {pack && pack.name}
            </Typography>
            <MenuEditMyCards />
          </Box>
          <Box>
            <Button variant="contained" onClick={addNewCardModal}>
              Add new card
            </Button>
            <AddNewCardModal
              setOpen={setOpenModalAdd}
              open={openModalAdd}
              addCard={addCard}
              id={id!}
            />
          </Box>
        </Box>
      ) : (
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography
            variant={'h5'}
            fontWeight={'600'}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {pack && pack.name}
          </Typography>
          <Button variant="contained" onClick={() => {}}>
            Learn to pack
          </Button>
        </Box>
      )}
      <Box marginBottom={'10px'} marginTop={'20px'}>
        <SearchPanel search={'cardQuestion'} setParams={setCardsSearchQuestionAC} />
      </Box>
    </Box>
  )
}
