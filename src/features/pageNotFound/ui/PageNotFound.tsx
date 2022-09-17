import React from 'react'

import s from './pageNotFound.module.scss'

type PropsType = {}

export const PageNotFound: React.FC<PropsType> = ({}) => (
  <div className={s.pageNotFound}>
    <div>404</div>
    <div>Page not found!</div>
    <div>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
  </div>
)
