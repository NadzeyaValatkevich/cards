import React, { ChangeEvent, FC, useState } from 'react'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Input, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import s from './profile.module.css'

import { setAppErrorAC } from 'app/bll/appActions'
import userPhoto from 'common/assets/image/user.png'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { ContentWrapper } from 'common/HOCs/ContentWrapper/ContentWrapper'
import { LoaderWrapper } from 'common/HOCs/LoaderWrapper/LoaderWrapper'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'
import { logoutTC } from 'features/f0-auth/bll/authThunks'
import { updateProfileTC } from 'features/f1-profile/bll/profileThunks'

type PropsType = {}

export const Profile: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const [isAvatarBroken, setIsAvatarBroken] = useState(false)

  const { name, avatar, email } = useAppSelector(state => state.profile)

  const onClickHandler = () => {
    dispatch(logoutTC())
  }

  const onTitleChangeHandler = (value: string) => {
    dispatch(updateProfileTC({ name: value }))
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        setIsAvatarBroken(false)
        convertFileToBase64(file, (avatar: string) => {
          dispatch(updateProfileTC({ avatar }))
        })
      } else {
        dispatch(setAppErrorAC('Error: File size more then 4 mb'))
      }
    }
  }

  const errorHandler = () => {
    setIsAvatarBroken(true)
    dispatch(setAppErrorAC('Picture upload failed'))
  }

  return (
    <LoaderWrapper>
      <ContentWrapper>
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600',
            mb: '2rem',
          }}
        >
          Profile
        </Typography>
        <Box position={'relative'}>
          <img
            src={isAvatarBroken ? userPhoto : avatar || userPhoto}
            alt={'user'}
            className={s.photo}
            onError={errorHandler}
            style={{
              borderRadius: '50%',
            }}
          />
          <div className={s.iconPhoto}>
            <IconButton component={'label'}>
              <AddAPhotoIcon />
              <Input type={'file'} onChange={uploadHandler} sx={{ display: 'none' }} />
            </IconButton>
          </div>
        </Box>
        <Box p={'2rem 0'}>
          <Typography variant={'h5'}>
            <EditableSpan value={name || 'Some Name'} onChange={onTitleChangeHandler} />
          </Typography>
        </Box>
        <Typography variant={'h6'} mb={'2rem'}>
          {email}
        </Typography>
        <Button variant="contained" fullWidth onClick={onClickHandler}>
          Log out
        </Button>
      </ContentWrapper>
    </LoaderWrapper>
  )
}
