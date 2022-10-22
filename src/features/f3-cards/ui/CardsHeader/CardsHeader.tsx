import React, { FC, useState } from 'react'

import Box from '@mui/material/Box'

import { RequestStatusType } from '../../../../app/bll/appReducer'
import { Loader } from '../../../../common/components/Loader/Loader'

import { MenuEditMyCards } from './MenuEditMyCards/MenuEditMyCards'

import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
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
  entityStatus: RequestStatusType
}

export const CardsHeader: FC<CardsHeaderPropsType> = ({
  packName,
  isMyPack,
  disabled,
  searchParam,
  cardsPack,
  learnCallback,
  packDeckCover,
  entityStatus,
}) => {
  const [activeModalAdd, setActiveModalAdd] = useState(false)

  const addCardModal = () => {
    setActiveModalAdd(true)
  }

  const buttonName = isMyPack ? 'Add new card' : 'Learn to pack'
  const onClickCardCallback = isMyPack ? addCardModal : learnCallback

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
    </Box>
  )
}
