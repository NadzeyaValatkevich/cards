import { Typography } from '@mui/material'

import { CardType } from '../../dal/cardsAPI'

import { BasicModal } from 'common/components/BasicModal/BasicModal'

type DeleteCardModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  deleteCard: (id: string) => void
  card: CardType
}
export const DeleteCardModal = (props: DeleteCardModalType) => {
  const deletePackHandler = () => {
    props.deleteCard(props.card._id)
    props.setOpen(false)
  }

  return (
    <BasicModal
      name={'Delete Card'}
      open={props.open}
      setOpen={props.setOpen}
      onSave={deletePackHandler}
      nameButton={'Delete'}
    >
      <Typography id="modal-delete-content" variant="subtitle1" component="h2">
        Do you really want to remove this card?
        <hr />
      </Typography>
    </BasicModal>
  )
}
