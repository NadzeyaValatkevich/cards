import React, { ChangeEvent, useState } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.value)

  const activeViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div>
      {editMode ? (
        <TextField value={title} onChange={changeTitle} autoFocus onBlur={activeViewMode} />
      ) : (
        <span onClick={activateEditMode}>{props.value}</span>
      )}
      <IconButton aria-label="create" color={'primary'} onClick={() => {}}>
        <CreateIcon />
      </IconButton>
    </div>
  )
}
