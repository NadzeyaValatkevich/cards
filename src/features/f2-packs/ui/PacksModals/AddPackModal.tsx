import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { setAppErrorAC } from 'app/bll/appActions'
import { BasicModal } from 'common/components/BasicModal/BasicModal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { setCardParamsAC } from 'features/f3-cards/bll/cardsActions'

type NewPackModalType = {
  addPack: (name: string, deckCover: string, privatePack: boolean) => void
  activeModalAdd: boolean
  setActiveModalAdd: (value: boolean) => void
}

export const AddPackModal = (props: NewPackModalType) => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [checked, setChecked] = useState(false)
  const [deckCover, setDeckCover] = useState('')

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }

  const onChangeTextFieldHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
  }
  const addPackHandler = () => {
    props.addPack(title, deckCover, checked)
    setChecked(false)
    props.setActiveModalAdd(false)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      addPackHandler()
    }
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

  const errorDeckCoverHandler = () => {
    dispatch(setAppErrorAC('Picture upload failed'))
  }

  return (
    <BasicModal
      name={'Add new pack'}
      open={props.activeModalAdd}
      setOpen={props.setActiveModalAdd}
      onSave={addPackHandler}
      nameButton={'Save'}
    >
      <TextField
        onChange={onChangeTextFieldHandler}
        onKeyUp={onKeyUpHandler}
        id="standard-basic"
        label="Name Pack"
        variant="standard"
        fullWidth
        autoFocus
      />
      {deckCover && (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          sx={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          <img
            src={deckCover}
            style={{ width: '150px', height: '150px' }}
            alt={'deckCover'}
            onError={errorDeckCoverHandler}
          />
        </Box>
      )}
      <Box>
        <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} component={'label'}>
          <Input type={'file'} onChange={uploadDeckCoverHandler} sx={{ display: 'none' }} />
          {'upload deck cover'}
        </Button>
      </Box>
      <Box>
        <FormControlLabel
          control={<Checkbox onChange={onChangeCheckboxHandler} />}
          label="Private Pack"
        />
      </Box>
    </BasicModal>
  )
}
