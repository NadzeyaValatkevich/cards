import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { ButtonProps, Modal, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type ModalPropsType = {
  children: ReactNode
  name: string
  open: boolean
  setOpen: (value: boolean) => void
  onSave: () => void
  nameButton: string
  buttonProps?: ButtonProps
  disabled?: boolean
  setIsDisabled?: (value: boolean) => void
}

export const BasicModal = (props: ModalPropsType) => {
  const handleClose = () => {
    props.setOpen(false)
    props.setIsDisabled && props.setIsDisabled(true)
  }
  const onClickSaveHandler = () => {
    props.onSave()
  }
  const color = props.nameButton === 'Delete' ? 'error' : 'primary'

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.name}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {props.children}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onClickSaveHandler}
              color={color}
              {...props.buttonProps}
              disabled={props.disabled}
            >
              {props.nameButton}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
