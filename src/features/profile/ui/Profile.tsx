import React from 'react'

import Button from '@mui/material/Button'

import { AppRootStateType } from '../../../app/bll/store'
import userPhoto from '../../../common/assets/image/user.png'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { updateProfileType } from '../bll/profileActions'
import { logoutTC, updateProfileTitleTC } from '../bll/profileThunks'

import { EditableSpan } from './EditableSpan'
import s from './profile.module.css'

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
    <div className={s.profileBlock}>
      <h1>Profile</h1>
      <div>
        <img src={profile.avatar || userPhoto} alt={'user'} className={s.photo} />
      </div>
      <div>
        <EditableSpan value={profile.name || 'Some Name'} onChange={onTitleChangeHandler} />
      </div>
      <h6>profile.email</h6>
      <Button variant="contained" onClick={onClickHandler}>
        Log out
      </Button>
    </div>
  )
}
