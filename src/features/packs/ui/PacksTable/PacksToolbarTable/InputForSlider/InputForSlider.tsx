import { ChangeEvent, FC, useEffect, useState } from 'react'

import { getPacksTC } from '../../../../bll/packsThunks'

import styles from './input.module.css'

import { useDebounce } from 'common/hooks/useDebounce'

type InputForSliderType = {
  value?: number
  setValue: (newValue: number) => void
}

export const InputForSlider: FC<InputForSliderType> = ({ value, setValue }) => {
  const [inputValue, setInputValue] = useState<number>(0)

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(+event.currentTarget.value)
    let currentValue = Number(event.currentTarget)

    setValue(Number(currentValue))
  }

  useEffect(() => {
    value && setInputValue(value)
  }, [value])

  return (
    <input
      type={'number'}
      value={inputValue}
      onChange={changeInputValue}
      className={styles.input}
    />
  )
}
