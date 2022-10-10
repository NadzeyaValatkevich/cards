import React from 'react'

import Typography from '@mui/material/Typography'

import { cardsPackSelector } from '../../bll/packsSelectors'

import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppSelector } from 'common/hooks/useAppSelector'

type DeletePackModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  removePackCards: (id: string) => void
  id: string
}

export const DeletePackModal = (props: DeletePackModalType) => {
  const packs = useAppSelector(cardsPackSelector)
  const pack = packs.find(pack => pack._id === props.id)
  const initTitle = pack && pack.name

  const deletePackHandler = () => {
    props.removePackCards(props.id)
    props.setOpen(false)
  }

  return (
    <BasicModal
      name={'Delete Pack'}
      open={props.open}
      setOpen={props.setOpen}
      onSave={deletePackHandler}
      nameButton={'Delete'}
      buttonProps={{
        autoFocus: true,
      }}
    >
      <Typography id="modal-delete-content" variant="subtitle1" component="h2">
        Do you really want to remove&nbsp;
        <Typography variant={'subtitle1'} fontWeight={600} display={'inline-block'}>
          {initTitle}
        </Typography>
        ? All cards will be deleted.
      </Typography>
    </BasicModal>
  )
}
