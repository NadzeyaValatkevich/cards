import React from 'react'

import Typography from '@mui/material/Typography'

import { BasicModal } from 'common/components/Modal/Modal'
import { useAppSelector } from 'common/hooks/useAppSelector'

type DeletePackModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  removePackCards: (id: string) => void
  id: string
}

export const DeletePackModal = (props: DeletePackModalType) => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
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
    >
      <Typography id="modal-delete-content" variant="subtitle1" component="h2">
        {`Do you really want to remove ${initTitle}?
                All cards will be deleted.`}
      </Typography>
    </BasicModal>
  )
}
