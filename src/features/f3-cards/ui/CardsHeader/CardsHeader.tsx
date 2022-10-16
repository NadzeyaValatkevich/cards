import React, { FC, useState } from 'react'

import Box from '@mui/material/Box'

import { MenuEditMyCards } from './MenuEditMyCards/MenuEditMyCards'

import deckCover from 'common/assets/image/deckCover.svg'
import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { PackType } from 'features/f2-packs/dal/packsAPI'
import { setCardsSearchQuestionAC } from 'features/f3-cards/bll/cardsActions'
import { CardType } from 'features/f3-cards/dal/cardsAPI'
import { CardButton } from 'features/f3-cards/ui/CardsHeader/CardButton/CardButton'
import { CardName } from 'features/f3-cards/ui/CardsHeader/CardName/CardName'

type CardsHeaderPropsType = {
  packName: string
  isMyPack: boolean
  disabled: boolean
  searchParam: string | undefined
  learnCallback: () => void
  cardsPack: CardType[]
  packDeckCover: string | undefined
}

export const CardsHeader: FC<CardsHeaderPropsType> = ({
  packName,
  isMyPack,
  disabled,
  searchParam,
  cardsPack,
  learnCallback,
  packDeckCover,
}) => {
  const [activeModalAdd, setActiveModalAdd] = useState(false)

  const addCardModal = () => {
    setActiveModalAdd(true)
  }
  let buttonName
  let onClickCardCallback

  {
    isMyPack ? (buttonName = 'Add new card') : (buttonName = 'Learn to pack')
  }
  {
    isMyPack ? (onClickCardCallback = addCardModal) : (onClickCardCallback = learnCallback)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignSelf={'space-between'} width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
        <Box display={'flex'}>
          <CardName packName={packName} />
          {isMyPack && cardsPack.length ? <MenuEditMyCards /> : null}
        </Box>
        <CardButton
          buttonName={buttonName}
          onClick={onClickCardCallback}
          isMyPack={isMyPack}
          activeModalAdd={activeModalAdd}
          setActiveModalAdd={setActiveModalAdd}
          disabled={disabled}
        />
      </Box>
      <Box
        component={'img'}
        src={packDeckCover}
        sx={{
          width: '3.3rem',
          height: '2rem',
          mr: '.5rem',
        }}
      />
      {cardsPack.length ? (
        <SearchPanel
          setParams={setCardsSearchQuestionAC}
          searchParam={searchParam}
          sx={{ m: '1.5rem 0', width: '100%' }}
        />
      ) : null}
    </Box>
  )
}
