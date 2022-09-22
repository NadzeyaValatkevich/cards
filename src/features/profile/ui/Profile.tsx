import React from 'react'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { AppRootStateType } from '../../../app/bll/store'
import userPhoto from '../../../common/assets/image/user.png'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { updateProfileType } from '../bll/profileActions'
import { logoutTC, updateProfileTitleTC } from '../bll/profileThunks'

import { EditableSpan } from './EditableSpan'
import s from './profile.module.css'

import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'

type PropsType = {}

export const Profile: React.FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state: AppRootStateType) => state.profile)

  const onClickHandler = () => {
    dispatch(logoutTC())
  }

  const user: updateProfileType = {
    name: null,
  }
  const onTitleChangeHandler = (value: string) => {
    user.name = value
    dispatch(updateProfileTitleTC(user))
  }

  // if (!isLoggedIn) {
  //   return <Navigate to="/singIn" />
  // }

  return (
    <ContentWrapper>
      <Typography variant="h4" style={{ marginBottom: '30px' }}>
        Profile
      </Typography>
      <div style={{ position: 'relative' }}>
        <img src={profile.avatar || userPhoto} alt={'user'} className={s.photo} />
        <div className={s.iconPhoto}>
          <IconButton>
            <AddAPhotoIcon />
          </IconButton>
        </div>
      </div>
      <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Typography variant={'h5'}>
          <EditableSpan value={profile.name || 'Some Name'} onChange={onTitleChangeHandler} />
        </Typography>
      </div>
      <Typography variant="h6" style={{ marginBottom: '30px' }}>
        profile.email
      </Typography>
      <Button
        style={{ width: '100%', marginBottom: '31px', borderRadius: '20px' }}
        variant="contained"
        onClick={onClickHandler}
      >
        Log out
      </Button>
    </ContentWrapper>
  )
}
