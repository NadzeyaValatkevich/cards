import React, { FC } from 'react'

import s from './PageNotFound.module.scss'

type PropsType = {}

export const PageNotFound: FC<PropsType> = ({}) => (
  <div className={s.pageNotFound}>
    <div>404</div>
    <div>Page not found!</div>
    <div>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
  </div>
)
