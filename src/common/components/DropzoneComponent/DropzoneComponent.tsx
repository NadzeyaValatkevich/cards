import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type MyDropzonePropsType = {
  image: string
  onSave: (image: string) => void
  onError: (error: string) => void
  error?: string
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  textAlign: 'center',
  margin: '1rem 0',
}
const focusedStyle = {
  borderColor: '#2196f3',
}
const acceptStyle = {
  borderColor: '#00e676',
}
const rejectStyle = {
  borderColor: '#ff1744',
}

const imageIsSet = {
  borderWidth: 0,
  borderRadius: 0,
  borderColor: 'none',
  borderStyle: 'none',
}

type TimeoutType = ReturnType<typeof setTimeout>

export const DropzoneComponent: FC<MyDropzonePropsType> = ({ onSave, image, onError, error }) => {
  const [isShown, setIsShown] = useState(false)
  const timeout = useRef<TimeoutType | null>(null)
  const onDrop = <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (acceptedFiles && acceptedFiles.length) {
      const file = acceptedFiles[0]

      if (file.size < 1000000) {
        convertFileToBase64(file, (file64: string) => {
          // setImg(file64)
          onSave(file64)
          setIsShown(false)
        })
      } else {
        onError('Error: File size more then 1 mb')
      }
    }
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  const style: Record<string, any> = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject || error ? rejectStyle : {}),
      ...(image ? imageIsSet : {}),
    }),
    [isFocused, isDragAccept, isDragReject, error]
  )

  if (isDragReject) {
    onError('Invalid file')
  }

  useEffect(() => {
    if (error === 'Invalid file') {
      timeout.current = setTimeout(() => {
        onError('')
      }, 1000)
    }

    return () => {
      clearTimeout(timeout.current as TimeoutType)
    }
  }, [error])

  return (
    <Box {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {!image ? (
        <p>Drag n drop some files here, or click to select files</p>
      ) : (
        <Box
          position={'relative'}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          sx={{
            ':hover': { opacity: '.6' },
            cursor: 'pointer',
          }}
        >
          {isShown && (
            <p
              style={{
                position: 'absolute',
                color: '#000',
                textAlign: 'center',
                opacity: '1',
                width: '100%',
                fontSize: '3rem',
                textShadow: '2px 0 white, -2px 0 white',
              }}
            >
              <b>Change image</b>
            </p>
          )}
          <Box
            component={'img'}
            src={image}
            alt={'image'}
            sx={{
              width: '100%',
            }}
          />
        </Box>
      )}
    </Box>
  )
}
