import { ChangeEvent, FC, useEffect, useState } from 'react'

import styles from './input.module.css'

import { useDebounce } from 'common/hooks/useDebounce'

type InputForSliderType = {
  value?: number
  setValue: (newValue: number) => void
}

export const InputForSlider: FC<InputForSliderType> = ({
  value: newValue,
  setValue: newSetValue,
}) => {
  const [value, setValue] = useState(newValue)
  const debouncedValue = useDebounce(value, 500)
  const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(+event.currentTarget.value)
  }

  useEffect(() => {
    debouncedValue !== undefined && newSetValue(debouncedValue)
  }, [debouncedValue])
  useEffect(() => {
    newValue !== undefined && setValue(newValue)
  }, [newValue])

  return (
    <input type={'number'} value={value} onChange={changeInputValue} className={styles.input} />
  )
}
