import React, { useState } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'

export const EditableSpan = () => {
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      {editMode ? <TextField /> : <span>name</span>}
      <IconButton aria-label="create" color={'primary'} onClick={() => {}}>
        <CreateIcon />
      </IconButton>
    </div>
  )
}
