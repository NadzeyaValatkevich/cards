import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { packSelector } from 'features/f2-packs/bll/packsSelectors'

type EditPackModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  editPack: (id: string, name: string, privatePack: boolean) => void
  id: string
}

export const EditPackModal = (props: EditPackModalType) => {
  const packs = useAppSelector(packSelector)
  const pack = packs.find(pack => pack._id === props.id)
  const initTitle = pack && pack.name
  const initCheck = pack && pack.private

  const [title, setTitle] = useState<string>('')
  const [checked, setChecked] = useState(false)

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }

  const onChangeTextFieldHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
  }

  const editPackHandler = () => {
    props.editPack(props.id, title, checked)
    setChecked(false)
    props.setOpen(false)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      editPackHandler()
    }
  }

  return (
    <BasicModal
      name={'Edit name pack'}
      open={props.open}
      setOpen={props.setOpen}
      onSave={editPackHandler}
      nameButton={'Save'}
    >
      <TextField
        onChange={onChangeTextFieldHandler}
        onKeyUp={onKeyUpHandler}
        defaultValue={initTitle}
        id="standard-basic"
        label="Name Pack"
        variant="standard"
        fullWidth
        autoFocus
      />
      <div>
        <FormControlLabel
          control={<Checkbox onChange={onChangeCheckboxHandler} defaultChecked={initCheck} />}
          label="Private Pack"
        />
      </div>
    </BasicModal>
  )
}
