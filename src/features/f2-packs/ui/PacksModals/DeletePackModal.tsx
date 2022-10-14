import React from 'react'

import Typography from '@mui/material/Typography'

import { BasicModal } from 'common/components/BasicModal/BasicModal'

type DeletePackModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  removePackCards: (id: string) => void
  id: string
  packName: string
}

export const DeletePackModal = (props: DeletePackModalType) => {
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
      <Typography id="modal-delete-content" variant="subtitle1">
        Do you really want to remove&nbsp;
        <b>{props.packName}</b>? All cards will be deleted.
      </Typography>
    </BasicModal>
  )
}
