import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Checkbox, FormControlLabel, Input, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { setAppErrorAC } from 'app/bll/appActions'
import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { packSelector } from 'features/f2-packs/bll/packsSelectors'

type EditPackModalType = {
  setOpen: (value: boolean) => void
  open: boolean
  editPack: (id: string, name: string, privatePack: boolean, deckCover: string) => void
  id: string
}

export const EditPackModal = (props: EditPackModalType) => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(packSelector)
  const pack = packs.find(pack => pack._id === props.id)
  const deckCoverPack = pack && pack.deckCover
  const initTitle = pack && pack.name
  const initCheck = pack && pack.private

  const [deckCover, setDeckCover] = useState(deckCoverPack)

  const [title, setTitle] = useState<string>('')
  const [checked, setChecked] = useState(false)

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }

  const onChangeTextFieldHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
  }

  const editPackHandler = () => {
    deckCover && props.editPack(props.id, title, checked, deckCover)
    setChecked(false)
    props.setOpen(false)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      editPackHandler()
    }
  }
  const errorDeckCoverHandler = () => {
    dispatch(setAppErrorAC('Picture upload failed'))
  }

  const uploadDeckCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (deckCover: string) => {
          setDeckCover(deckCover)
        })
      } else {
        dispatch(setAppErrorAC('Error: File size more then 4 mb'))
      }
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
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        sx={{ marginBottom: '1rem', marginTop: '1rem' }}
      >
        <img
          src={deckCoverPack}
          style={{ width: '150px', height: '150px' }}
          alt={'deckCover'}
          onError={errorDeckCoverHandler}
        />
      </Box>
      <Box>
        <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
          <Input type={'file'} onChange={uploadDeckCoverHandler} sx={{ display: 'none' }} />
          {'upload  a new deck cover'}
        </Button>
      </Box>
      <Box>
        <FormControlLabel
          control={<Checkbox onChange={onChangeCheckboxHandler} defaultChecked={initCheck} />}
          label="Private Pack"
        />
      </Box>
    </BasicModal>
  )
}
