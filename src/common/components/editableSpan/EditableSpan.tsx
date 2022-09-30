import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import s from '../../../features/profile/ui/profile.module.css'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.value)

  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div className={s.blockName}>
      {editMode ? (
        <TextField
          value={title}
          onChange={changeTitle}
          onKeyPress={handleKeyPress}
          autoFocus
          onBlur={activateViewMode}
        />
      ) : (
        <span onClick={activateEditMode}>{props.value}</span>
      )}
      <IconButton aria-label="create" color={'primary'} onClick={activateEditMode}>
        <CreateIcon />
      </IconButton>
    </div>
  )
}
